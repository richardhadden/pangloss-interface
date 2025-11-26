import dataclasses
from typing import Callable, ClassVar, Literal, NotRequired, TypedDict

from pangloss.model_config.models_base import AbstractBaseMeta
from pangloss.models import BaseNode, SemanticSpace

type FieldsToPathMapping = dict[str, str]


class ComponentMapping(TypedDict):
    node_view: NotRequired[str]
    node_inline_view: NotRequired[str]
    node_edit: NotRequired[str]
    node_inline_edit: NotRequired[str]
    node_inline_edit_expanded: NotRequired[str]
    fields_view: NotRequired[FieldsToPathMapping]
    fields_inline_view: NotRequired[FieldsToPathMapping]
    fields_edit: NotRequired[FieldsToPathMapping]
    fields_inline_edit: NotRequired[FieldsToPathMapping]


@dataclasses.dataclass
class InterfaceBaseMeta(AbstractBaseMeta):
    components: None | ComponentMapping = None
    order_fields: list | None = dataclasses.field(default_factory=list)
    colour: (
        Literal["red"]
        | Literal["orange"]
        | Literal["amber"]
        | Literal["yellow"]
        | Literal["lime"]
        | Literal["green"]
        | Literal["emerald"]
        | Literal["teal"]
        | Literal["cyan"]
        | Literal["sky"]
        | Literal["blue"]
        | Literal["indigo"]
        | Literal["violet"]
        | Literal["purple"]
        | Literal["fuchsia"]
        | Literal["pink"]
        | Literal["rose"]
        | Literal["slate"]
        | Literal["gray"]
        | Literal["zinc"]
        | Literal["neutral"]
        | Literal["stone"]
        | None
    ) = dataclasses.field(default="amber")
    should_collapse: Callable[[type[BaseNode]], bool] | None = None
    suggest_duplicates: bool | None = None


BaseNode.__annotations__["InterfaceMeta"] = ClassVar[type[InterfaceBaseMeta]]
SemanticSpace.__annotations__["InterfaceMeta"] = ClassVar[type[InterfaceBaseMeta]]
