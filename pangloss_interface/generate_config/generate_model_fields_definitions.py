import datetime
import inspect
import json
import types
import typing
from collections.abc import Iterable
from copy import copy
from functools import singledispatch
from pathlib import Path
from types import SimpleNamespace

import annotated_types
import pydantic
from annotated_types import BaseMetadata
from humps import camelize
from jinja2 import Environment, PackageLoader
from pangloss.model_config.field_definitions import (
    EnumFieldDefinition,
    FieldDefinition,
    ListFieldDefinition,
    ModelFieldDefinitions,
    MultiKeyFieldDefinition,
    PropertyFieldDefinition,
    RelationFieldDefinition,
    RelationToNodeDefinition,
    RelationToReifiedDefinition,
    RelationToTypeVarDefinition,
    TypeParamsToTypeMap,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.model_setup_functions.build_pg_model_definition import (
    is_union,
)
from pangloss.models import BaseMeta, BaseNode, ReifiedRelation, RootNode
from rich import print
from ulid import ULID

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


def map_types(t, field_name: str) -> dict[typing.Literal["type"], str]:
    if field_name == "type":
        """ print(
            t,
            type(t),
        ) """

    match t:
        case _ if typing.get_origin(t) == typing.Literal:
            return f'"{typing.get_args(t)[0]}"'
        case prop_types.uri:
            return {"type": "string"}
        case prop_types.generic_alias():
            return f"({map_types(t.__args__[0], field_name)})[]"
        case _ if type(t) is types.UnionType:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.union():
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.type_alias() if t.__name__ == "ULID":
            return {"type": "string"}
        case prop_types.str:
            return {"type": "string"}
        case prop_types.int:
            return {"type": "int"}
        case prop_types.float:
            return {"type": "float"}
        case prop_types.bool:
            return {"type": "boolean"}
        case prop_types.none:
            return {"type": "null"}
        case prop_types.date:
            return {"type": "date"}
        case prop_types.datetime:
            return {"type": "datetime"}
        case _ if typing.get_origin(t) is typing.Union:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case _:
            # print(typing.get_origin(t), typing.get_args(t), type(t))
            return f"<!!!ERROR - NO TYPE MATCH {t} {type(t)}!!!>"


def validators_to_dict(validators: Iterable[BaseMetadata]):
    v = {}
    for validator in validators:
        match validator:
            case annotated_types.Ge(n):
                v["Ge"] = n
            case annotated_types.Le(n):
                v["Le"] = n
            case annotated_types.Gt(n):
                v["Gt"] = n
            case annotated_types.Lt(n):
                v["Lt"] = n
            case annotated_types.MaxLen(n):
                v["MaxLen"] = n
            case annotated_types.MinLen(n):
                v["MinLen"] = n
            case annotated_types.Len(min_length=a, max_length=b):
                v["MinLen"] = a
                v["MaxLen"] = b

            case _:
                pass

    return v


def unpack_types(t: type[RootNode] | type[ReifiedRelation]):
    if is_union(t):
        return [u.__name__ for u in typing.get_args(t)]
    else:
        if inspect.isclass(t) and issubclass(t, ReifiedRelation):
            typeparams = {
                str(tp): type_params_to_type_map_to_dict(
                    TypeParamsToTypeMap(type_param=tp, type=tt)
                )
                for tp, tt in zip(
                    typing.cast(
                        ReifiedRelation, t.__base__
                    ).__pydantic_generic_metadata__["parameters"],
                    t.__pydantic_generic_metadata__["args"],
                )
            }

            return [
                {
                    "type": t.__name__,
                    "originType": typing.cast(ReifiedRelation, t.__base__).__name__,
                    "typeParamsToTypeMap": typeparams,
                }
            ]
        return [{"type": t.__name__}]


def type_params_to_type_map_to_dict(
    type_param_to_type_map: TypeParamsToTypeMap,
) -> dict[str, str]:
    return {
        "metatype": "RelationToReified"
        if inspect.isclass(type_param_to_type_map.type)
        and issubclass(type_param_to_type_map.type, ReifiedRelation)
        else "RelationToNode",
        "typeParam": type_param_to_type_map.type_param.__name__,
        "types": unpack_types(type_param_to_type_map.type),
    }


@singledispatch
def field_target_to_dict(field_target) -> dict[str, typing.Any]:
    pass


@field_target_to_dict.register(RelationToNodeDefinition)
def relation_to_node_def_to_dict(
    field_target_def: RelationToNodeDefinition,
) -> dict[str, typing.Any]:
    return {
        "metatype": "RelationToNode",
        "type": field_target_def.annotated_type.__name__,
    }


@field_target_to_dict.register(RelationToTypeVarDefinition)
def relation_to_type_var_definition_to_dict(
    field_target_def: RelationToTypeVarDefinition,
) -> dict[str, typing.Any]:
    return {
        "metatype": "RelationToTypeVar",
        "type": field_target_def.annotated_type.__name__,
        "type_var_name": field_target_def.typevar_name,
    }


@field_target_to_dict.register(RelationToReifiedDefinition)
def relation_to_reified_definition_to_dict(
    field_target_def: RelationToReifiedDefinition,
) -> dict[str, typing.Any]:
    return {
        "metatype": "RelationToReified",
        "type": field_target_def.annotated_type.__name__,
        "origin_type": field_target_def.origin_type.__name__,
        "type_params_to_type_map": {
            k: type_params_to_type_map_to_dict(v)
            for k, v in field_target_def.type_params_to_type_map.items()
        },
    }


@singledispatch
def field_to_dict(field_definition: FieldDefinition) -> dict[str, typing.Any]:
    print("!!!ERROR - NO FIELD DEFINITION MATCH!!!", field_definition)
    return {"ERROR": "NO FIELD DEFINITION MATCH"}


def build_default_search_types(field_definition: RelationFieldDefinition):
    if drf := field_definition.default_reified_type:
        if isinstance(drf, str):
            drf = ModelManager.reified_relation_models[drf]

        target_type_param = str(
            typing.cast(
                RelationFieldDefinition, drf._meta.fields["target"]
            ).field_annotation
        )

        default_search_types = set()
        for t in field_definition.relations_to_reified:
            if t.origin_type is drf:
                types = t.type_params_to_type_map[target_type_param].type
                if is_union(types):
                    default_search_types.update(
                        [u.__name__ for u in typing.get_args(types)]
                    )
                else:
                    default_search_types.add(types.__name__)
        return list(
            default_search_types,
            *(t.annotated_type.__name__ for t in field_definition.relations_to_node),
        )

    return [t.annotated_type.__name__ for t in field_definition.relations_to_node]


@field_to_dict.register(RelationFieldDefinition)
def relation_field_to_dict(
    field_definition: RelationFieldDefinition,
) -> dict[str, typing.Any]:
    relation_field: dict[str, typing.Any] = {"metatype": "RelationField"}
    relation_field["types"] = [
        field_target_to_dict(ftd) for ftd in field_definition.field_type_definitions
    ]
    relation_field["validators"] = validators_to_dict(field_definition.validators)
    relation_field["name"] = camelize(field_definition.field_name)
    relation_field["relation_labels"] = camelize(list(field_definition.relation_labels))
    relation_field["reverse_name"] = camelize(field_definition.reverse_name)
    relation_field["reverse_relation_labels"] = list(
        camelize(i) for i in field_definition.reverse_relation_labels
    )
    relation_field["default_reified_type"] = field_definition.default_reified_type

    relation_field["default_search_types"] = build_default_search_types(
        field_definition
    )

    relation_field["bind_fields_to_related"] = field_definition.bind_fields_to_related
    return relation_field


@field_to_dict.register(EnumFieldDefinition)
def enum_field_to_dict(field_definition: EnumFieldDefinition) -> dict[str, typing.Any]:
    enum_field: dict[str, typing.Any] = {"metatype": "EnumField"}

    enum_field["enum_values"] = [
        k.value for k in field_definition.field_annotation.__members__.values()
    ]
    return enum_field


@field_to_dict.register(MultiKeyFieldDefinition)
def multikey_field_to_dict(field_definition: MultiKeyFieldDefinition):
    multikey_field: dict[str, typing.Any] = {"metatype": "MultiKeyField"}
    multikey_field["value"] = map_types(
        field_definition.multi_key_field_value_type, field_definition.field_name
    )

    for field_def in field_definition.multi_key_field_type._meta.fields:
        assert isinstance(field_def, PropertyFieldDefinition)

        multikey_field[field_def.field_name] = {
            **map_types(field_def.field_annotation, field_def.field_name),
            "validators": validators_to_dict(field_def.validators),
        }

    return multikey_field


@field_to_dict.register(ListFieldDefinition)
def list_field_to_dict(field_definition: ListFieldDefinition):
    list_field: dict[typing.Any, typing.Any] = {"metatype": "ListField"}
    list_field["validators"] = validators_to_dict(field_definition.validators)
    list_field["internal_type_validators"] = validators_to_dict(
        field_definition.internal_type_validators
    )
    list_field.update(
        map_types(field_definition.field_annotation, field_definition.field_name)
    )
    return list_field


@field_to_dict.register(PropertyFieldDefinition)
def property_field_to_dict(field: PropertyFieldDefinition):
    return {
        "metatype": "LiteralField",
        **map_types(field.field_annotation, field.field_name),
        "validators": validators_to_dict(field.validators),
    }


def field_def_to_dict(
    model: type[BaseNode], model_field_definitions: ModelFieldDefinitions
) -> dict:
    fields = {}

    for field_definition in model_field_definitions.values():
        if field_definition.field_name == "type":
            continue
        fields[field_definition.field_name] = field_to_dict(field_definition)

    return fields


def meta_to_dict(meta: BaseMeta) -> dict:
    meta_as_dict = copy(meta.__dict__)
    meta_as_dict["base_model"] = meta.base_model.__name__
    meta_as_dict["supertypes"] = [m.__name__ for m in meta.supertypes]
    meta_as_dict["traits"] = [m.__name__ for m in meta.traits]
    return meta_as_dict


env = Environment(
    loader=PackageLoader(
        "pangloss_interface", package_path=str(Path("generate_config", "templates"))
    )
)

template = env.get_template("model_config_template.template.ts")


def generate_model_fields_definitions(model_config_dir_path: Path):
    model_definitions_file_path = model_config_dir_path.joinpath("model-definitions.ts")

    model_definitions = {}
    for model_name, model in ModelManager.base_models.items():
        print("========= ", model_name)

        model_defintion_as_dict = {
            "meta": meta_to_dict(model._meta),
            "fields": field_def_to_dict(model, model._meta.fields),
        }
        model_definitions[model.__name__] = camelize(model_defintion_as_dict)

    model_definitions_json = json.dumps(model_definitions, indent=2, ensure_ascii=False)

    model_definitions_file_path.write_text(
        template.render(model_definitions=model_definitions_json), encoding="utf-8"
    )
