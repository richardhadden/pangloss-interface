import typing

from pangloss.model_config.model_setup_utils import get_all_subclasses, model_is_trait
from pangloss.models import BaseNode, HeritableTrait, NonHeritableTrait


def reduce_to_supertypes(
    types_list: list[type[BaseNode]],
) -> list[type[BaseNode | HeritableTrait | NonHeritableTrait]]:
    if len(types_list) < 2:
        return typing.cast(
            list[type[BaseNode | HeritableTrait | NonHeritableTrait]], types_list
        )

    types_map = {}
    for model in types_list:
        types_map[model] = get_all_subclasses(model)

    unnecessary_subclasses = set()

    for other_model in types_map:
        for model, subclasses in types_map.items():
            if model is other_model:
                continue
            if other_model in subclasses:
                unnecessary_subclasses.add(other_model)

    updated_types = set(types_list) - unnecessary_subclasses

    if len(updated_types) == 1:
        return list(updated_types)

    possible_trait_superclasses: set[type[HeritableTrait] | type[NonHeritableTrait]] = (
        set()
    )
    for model in types_list:
        possible_trait_superclasses.update(m for m in model.mro() if model_is_trait(m))

    for possible_trait in possible_trait_superclasses:
        if all(True for m in types_list if issubclass(m, possible_trait)):
            return [possible_trait]

    return list(updated_types)


class AutocompleteEndpoints:
    endpoints_to_build = {}

    @classmethod
    def generate_endpoints(cls, types_list: list[type[BaseNode]]):
        types = reduce_to_supertypes(types_list=types_list)
        if len(types) == 1:
            url = f"/{types[0].__name__}/autocomplete/"
            cls.endpoints_to_build[url] = types
            return url
        else:
            url = f"/{"|".join(t.__name__ for t in types)}/autocomplete/"
            cls.endpoints_to_build[url] = types
            return url
