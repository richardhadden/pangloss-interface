import re
from typing import Annotated, Literal, TypedDict, Union, cast

from fastapi import Query, Request
from pangloss.api import PanglossAPIRouter
from pangloss.exceptions import PanglossNotFoundError
from pangloss.model_config.model_manager import ModelManager
from pangloss.neo4j.database import DatabaseUtils
from pydantic import AnyHttpUrl

autocomplete_api = PanglossAPIRouter(
    prefix="/interface/autocomplete", tags=["Interface.Autocompletes"]
)


@autocomplete_api.get("/test")
async def test() -> str:
    return "Testing, ok"


# Get allowed types, i.e. all the BaseNode types in ModelManager
BaseNodeTypes = Union[*[Literal[t] for t in ModelManager.base_models.keys()]]  # type: ignore
BaseNodeReferenceViewTypes = Union[
    *[t.ReferenceView for t in ModelManager.base_models.values()]  # type: ignore
]

SPLIT_TERMS_REGEX = re.compile(r"[ \-\_]")


def get_index_offsets(page: int, page_size: int) -> tuple[int, int]:
    """
    Returns the start and end index for pagination.

    Args:
        page (int): The page number (1-based).
        page_size (int): The number of items per page.

    Returns:
        tuple[int, int]: A tuple (start_index, end_index), both 0-based.
    """
    if page < 1 or page_size < 1:
        raise ValueError("Page and page_size must both be >= 1")

    page = page - 1

    start_index = (page) * page_size
    end_index = start_index + (page_size)
    return start_index, end_index


class ListResponse[T](TypedDict):
    results: list[T]
    page: int
    count: int
    totalPages: int
    nextPage: int | None
    previousPage: int | None
    nextUrl: AnyHttpUrl | None
    previousUrl: AnyHttpUrl | None


@autocomplete_api.get("/")
async def search(
    request: Request,
    types: Annotated[list[BaseNodeTypes], Query()],
    q: str = "",
    page: int = 1,
    pageSize: int = 25,
) -> ListResponse[BaseNodeReferenceViewTypes]:
    terms = SPLIT_TERMS_REGEX.split(q)
    search_string = " AND ".join(f"/.*{re.escape(term)}.*/" for term in terms)

    for model_type in types:
        if model_type not in ModelManager.base_models:
            raise PanglossNotFoundError(f"Model {model_type} not found")

    full_text_queries = " \nUNION\n ".join(
        f"""CALL db.index.fulltext.queryNodes("{model_type}FullTextIndex", $q) YIELD node, score
            RETURN node"""
        for model_type in types
    )

    query = f"""
    CALL () {{ {full_text_queries} }}
    RETURN {{results: apoc.agg.slice(node, $skip, $skipEnd), count:count(node), page: $page, page_size: $pageSize, totalPages: toInteger(round((count(node)*1.0)/$pageSize, 0, "UP"))}}
    """

    skip, skipEnd = get_index_offsets(page, pageSize)

    results = await DatabaseUtils._cypher_read(
        query,
        {
            "q": search_string,
            "page": page,
            "pageSize": pageSize,
            "skip": skip,
            "skipEnd": skipEnd,
        },
    )

    if results:
        result = results[0][0]
        next_page = page + 1 if page + 1 <= result["totalPages"] else None

        next_url = (
            cast(
                AnyHttpUrl,
                str(
                    request.url.replace_query_params(
                        q=q, page=page + 1, pageSize=pageSize
                    )
                ),
            )
            if page + 1 <= result["totalPages"]
            else None
        )

        previous_page = page - 1 if page - 1 >= 1 else None
        previous_url = (
            cast(
                AnyHttpUrl,
                str(
                    request.url.replace_query_params(
                        q=q, page=page - 1, pageSize=pageSize
                    )
                ),
            )
            if page - 1 >= 1
            else None
        )

        return ListResponse(
            **results[0][0],
            previousPage=previous_page,
            previousUrl=previous_url,
            nextPage=next_page,
            nextUrl=next_url,
        )
