import datetime
import types
import typing
from pathlib import Path
from types import SimpleNamespace

import pydantic
from humps import camelize
from jinja2 import Environment, PackageLoader
from pangloss.model_config.field_definitions import (
    MultiKeyFieldDefinition,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.models_base import (
    CreateBase,
    EditHeadSetBase,
    EditSetBase,
    EmbeddedCreateBase,
    HeadViewBase,
    ReferenceCreateBase,
    ReferenceSetBase,
    ReferenceViewBase,
    ReifiedCreateBase,
    ReifiedRelationEditSetBase,
    ReifiedRelationViewBase,
    SemanticSpaceCreateBase,
    SemanticSpaceViewBase,
    ViewBase,
)
from ulid import ULID

env = Environment(
    loader=PackageLoader(
        "pangloss_interface", package_path=str(Path("generate_config", "templates"))
    )
)


prop_types = SimpleNamespace()

prop_types.type_alias = typing.TypeAliasType
prop_types.str = str
prop_types.ulid = ULID
prop_types.generic_alias = types.GenericAlias
prop_types.union = types.UnionType
prop_types.list = list
prop_types.literal = typing.Literal
prop_types.int = int
prop_types.float = float
prop_types.bool = bool
prop_types.none = types.NoneType
prop_types.datetime = datetime.datetime
prop_types.date = datetime.date
prop_types.uri = pydantic.AnyHttpUrl


reified_relation_instantiations = set()
semantic_space_instantiations = set()
embedded_instantiations = set()
reference_set_via_instantiations = set()
view_instantiations = set()


def remove_brackets(string: str) -> str:
    return string.replace("[", "__").replace("]", "__")


def map_types(t, field_name: str) -> str:
    if field_name == "type":
        """ print(
            t,
            type(t),
        ) """

    match t:
        case _ if typing.get_origin(t) == typing.Literal:
            return f'"{typing.get_args(t)[0]}"'
        case prop_types.uri:
            return "string"
        case prop_types.generic_alias():
            return f"({map_types(t.__args__[0], field_name)})[]"
        case _ if type(t) is types.UnionType:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.union():
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.type_alias() if t.__name__ == "ULID":
            return "string"
        case prop_types.str:
            return "string"
        case prop_types.int:
            return "number"
        case prop_types.float:
            return "number"
        case prop_types.bool:
            return "boolean"
        case prop_types.none:
            return "null"
        case prop_types.date:
            return "Date"
        case prop_types.datetime:
            return "Date"
        case _ if typing.get_origin(t) is typing.Union:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case _:
            print(typing.get_origin(t), typing.get_args(t), type(t))
            return f"<!!!ERROR - NO TYPE MATCH {t} {type(t)}!!!>"


def build_multikeyvalue_field(fd: MultiKeyFieldDefinition) -> str:
    base_fields = [
        f"{k}: {map_types(v.annotation, fd.field_name)}"
        for k, v in fd.multi_key_field_type.model_fields.items()
        if k != "value"
    ]
    return f"{{value: {map_types(fd.multi_key_field_value_type, fd.field_name)}, {', '.join(base_fields)}}}"


def generate_base_typescript(base_type):
    fields: dict[str, str] = {}
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_semantic_space_create_base_typescript(base_type):
    fields: dict[str, str] = {}

    fields["contents"] = "(CreateBase)[]"
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_semantic_space_view_base_typescript(base_type):
    fields: dict[str, str] = {}
    fields["id"] = "string"
    fields["contents"] = "(ViewBase)[]"
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def get_semantic_space_base_types() -> list[str]:
    types = set()
    for ss_name, ss in ModelManager.semantic_space_models.items():
        if not ss.__pydantic_generic_metadata__["args"]:
            types.add(ss_name)
    return list(types)


def generate_typescript(model_config_dir_path: Path):
    template = env.get_template("typescript_template.template.ts")
    model_config_file_path = model_config_dir_path.joinpath("model-typescript.ts")

    model_config_file_path.write_text(
        template.render(
            create_base=generate_base_typescript(CreateBase),
            edit_head_set_base=generate_base_typescript(EditHeadSetBase),
            edit_set_base=generate_base_typescript(EditSetBase),
            reference_set_base=generate_base_typescript(ReferenceSetBase),
            reference_view_base=generate_base_typescript(ReferenceViewBase),
            reference_create_base=generate_base_typescript(ReferenceCreateBase),
            embedded_create_base=generate_base_typescript(EmbeddedCreateBase),
            reified_create_base=generate_base_typescript(ReifiedCreateBase),
            reified_view_base=generate_base_typescript(ReifiedRelationViewBase),
            reified_edit_base=generate_base_typescript(ReifiedRelationEditSetBase),
            head_view_base=generate_base_typescript(HeadViewBase),
            view_base=generate_base_typescript(ViewBase),
            semantic_space_create_base=generate_semantic_space_create_base_typescript(
                SemanticSpaceCreateBase
            ),
            semantic_space_view_base=generate_semantic_space_view_base_typescript(
                SemanticSpaceViewBase
            ),
            semantic_space_edit_set_base=generate_semantic_space_view_base_typescript(
                SemanticSpaceViewBase
            ),
            base_node_types=" | ".join(
                f'"{k}"' for k in ModelManager.base_models.keys()
            ),
            reified_relation_types=" | ".join(
                f'"{k}"' for k in ModelManager.reified_relation_models.keys()
            ),
            trait_types=" | ".join(f'"{k}"' for k in ModelManager.trait_models.keys()),
            semantic_space_types=" | ".join(
                f'"{k}"' for k in get_semantic_space_base_types()
            ),
            edge_model_types=" | ".join(
                f'"{k}"' for k in ModelManager.edge_models.keys()
            ),
            multikey_field_types=" | ".join(
                f'"{k}"' for k in ModelManager.multikeyfields_models.keys()
            ),
        ),
    )
