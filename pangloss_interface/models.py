import dataclasses
from typing import ClassVar, Literal

from pangloss.model_config.models_base import AbstractBaseMeta
from pangloss.models import BaseNode, SemanticSpace


@dataclasses.dataclass
class InterfaceBaseMeta(AbstractBaseMeta):
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


BaseNode.__annotations__["InterfaceMeta"] = ClassVar[type[InterfaceBaseMeta]]
SemanticSpace.__annotations__["InterfaceMeta"] = ClassVar[type[InterfaceBaseMeta]]
