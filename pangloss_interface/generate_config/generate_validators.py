import datetime
import types
import typing
from pathlib import Path
from types import SimpleNamespace

import pydantic
from humps import camelize
from jinja2 import Environment, PackageLoader
from pangloss.model_config.field_definitions import (
    FieldDefinition,
    MultiKeyFieldDefinition,
    PropertyFieldDefinition,
    RelationFieldDefinition,
    RelationToNodeDefinition,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.model_setup_functions.utils import get_concrete_model_types
from pangloss.model_config.models_base import CreateBase, EditHeadSetBase, RootNode
from ulid import ULID

env = Environment(
    loader=PackageLoader(
        "pangloss_interface", package_path=str(Path("generate_config", "templates"))
    )
)

template = env.get_template("validators_template.template.ts")


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
prop_types.uri = pydantic.AnyHttpUrl


def map_types(t, field_name: str) -> str:
    if field_name == "type":
        """ print(
            t,
            type(t),
        ) """
    match t:
        case _ if typing.get_origin(t) == typing.Literal:
            return f"v.literal('{typing.get_args(t)[0]}')"
        case prop_types.uri:
            return "v.pipe(v.string(), v.url('Invalid URI'))"
        case prop_types.generic_alias():
            return f"v.array({map_types(t.__args__[0], field_name)})"
        case _ if type(t) is types.UnionType:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"v.union([{', '.join(options)}])"
        case prop_types.union():
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"v.union([{', '.join(options)}])"
        case prop_types.type_alias() if t.__name__ == "ULID":
            return "v.pipe(v.string(), v.ulid())"
        case prop_types.str:
            return "v.string()"
        case prop_types.int:
            return "v.pipe(v.number(), v.integer('The number must be an integer.'))"
        case prop_types.float:
            return "v.number()"
        case prop_types.bool:
            return "v.boolean()"
        case prop_types.none:
            return "v.null()"
        case prop_types.datetime:
            return "v.pipe(v.string(), v.isoDateTime())"
        case _:
            return f"<!!!ERROR - NO TYPE MATCH {t} {type(t)}!!!>"


def build_multikeyvalue_field(fd: MultiKeyFieldDefinition) -> str:
    base_fields = [
        f"{k}: {map_types(v.annotation, fd.field_name)}"
        for k, v in fd.multi_key_field_type.model_fields.items()
        if k != "value"
    ]
    return f"v.object({{value: {map_types(fd.multi_key_field_value_type, fd.field_name)}, {', '.join(base_fields)}}})"


def build_relation_field(fd: RelationFieldDefinition, model_name: str) -> str:
    """v.array(
      v.union([OrderCreateSchema, CreationOfObjectCreateSchema])
    )"""
    types = []
    for relation_definition in fd.field_type_definitions:
        if isinstance(relation_definition, RelationToNodeDefinition):
            if fd.create_inline:
                for ct in get_concrete_model_types(
                    relation_definition.annotated_type, include_subclasses=True
                ):
                    if model_name == ct.__name__:
                        types.append(f"v.lazy(() => {ct.__name__}CreateSchema)")
                    else:
                        types.append(f"{ct.__name__}CreateSchema")

            else:
                pass
    return f"""v.array(
      v.union([{", ".join(types)}])
    )"""


def generate_valibot_definition(model: type[RootNode], fd: FieldDefinition) -> str:
    match fd:
        case RelationFieldDefinition():
            # print("relationfielddefintion", fd.field_name)
            return build_relation_field(fd, model.__name__)
        case PropertyFieldDefinition(field_annotation=t):
            return map_types(t, field_name=fd.field_name)
        case MultiKeyFieldDefinition():
            return build_multikeyvalue_field(fd)
        case _:
            pass


def generate_edit_head_set_base_valibot():
    fields: dict[str, str] = {}
    for field_name, field_definition in EditHeadSetBase.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )
    return fields


def generate_create_base_valibot():
    fields: dict[str, str] = {}
    for field_name, field_definition in CreateBase.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_model_create(model: type[RootNode]):
    fields: dict[str, str] = {}
    for field_definition in model._meta.fields:
        fields[camelize(field_definition.field_name)] = generate_valibot_definition(
            model, field_definition
        )

    return fields


def generate_validators(model_config_dir_path: Path):
    model_config_file_path = model_config_dir_path.joinpath("model-validators.ts")

    create_models = {}
    for model_name, model in ModelManager.base_models.items():
        create_models[f"{model_name}CreateSchema"] = generate_model_create(model)

    model_config_file_path.write_text(
        template.render(
            create_base=generate_create_base_valibot(),
            edit_head_set_base=generate_edit_head_set_base_valibot(),
            create_models=create_models,
        ),
    )
