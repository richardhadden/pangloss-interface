import dataclasses

from pangloss.models import BaseNode


@dataclasses.dataclass
class InterfaceBaseMeta:
    order_fields: list | None = dataclasses.field(default_factory=list)


BaseNode.__annotations__["InterfaceMeta"] = type[InterfaceBaseMeta]
