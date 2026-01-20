import datetime
import types
import typing
from inspect import isclass
from pathlib import Path

import pydantic
from humps import camelize
from pangloss.model_config.field_definitions import (
    ListFieldDefinition,
    MultiKeyFieldDefinition,
    PropertyFieldDefinition,
    RelationFieldDefinition,
)
from pangloss.model_config.model_setup_functions.utils import get_concrete_model_types
from pangloss.models import BaseNode, EdgeModel, ReifiedRelation, SemanticSpace
from ulid import ULID

from pangloss_interface.generate_configs.utils import (
    AllModelTypeTypes,
    ModelManager,
    get_models,
)

prop_types = types.SimpleNamespace()

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


def unpack_type_to_string(t):
    ann_types = []
    if isclass(t) and issubclass(t, ReifiedRelation):
        assert t.__base__
        # print(f"{t.__base__.__name__}Create<{unpack_nested_reified_to_string(t)}>")
        ann_types.append(
            f"{t.__base__.__name__}Create<{unpack_nested_reified_to_string(t)}>"
        )
    elif isclass(t) and issubclass(t, BaseNode):
        ann_types.append(f"{t.__name__}ReferenceSet")
        if t._meta.create_by_reference:
            ann_types.append(f"{t.__name__}ReferenceCreate")
    elif (
        typing.get_origin(t) is types.UnionType or typing.get_origin(t) == typing.Union
    ):
        for t1 in typing.get_args(t):
            ann_types.append(unpack_type_to_string(t1))

    return " | ".join(ann_types)


def unpack_nested_reified_to_string(model: type[ReifiedRelation]):
    ann_types = []
    assert model.__base__

    for arg in model.__pydantic_generic_metadata__["args"]:
        ann_types.append(unpack_type_to_string(arg))

    return " , ".join(ann_types)


def build_relation_field_for_create(field: RelationFieldDefinition):
    types = []
    for relation_definition in field.relations_to_node:
        if field.create_inline:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                types.append(f"{ct.__name__}Create")

        else:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                if field.edge_model:
                    types.append(
                        f"{ct.__name__}ReferenceSet & {{edgeProperties: {field.edge_model.__name__}}}"
                    )

                else:
                    types.append(f"{ct.__name__}ReferenceSet")
                    if (
                        ct._meta.create_by_reference
                        and ct._meta.create
                        and not ct._meta.abstract
                    ):
                        types.append(f"{ct.__name__}ReferenceCreate")

    for relation_definition in field.relations_to_reified:
        assert relation_definition.annotated_type.__base__

        types.append(
            f"{relation_definition.annotated_type.__base__.__name__}Create<{unpack_nested_reified_to_string(relation_definition.annotated_type)}>"
        )

    for relation_definition in field.relations_to_typevar:
        types.append(f"{relation_definition.typevar_name}")

    for relation_definition in field.relations_to_semantic_space:
        pass

    return f"""{camelize(field.field_name)}: ({" | ".join(types)})[]"""


def build_property_field(
    field: PropertyFieldDefinition | ListFieldDefinition | MultiKeyFieldDefinition,
) -> str | None:
    if field.field_name == "type":
        return None
    elif isinstance(field, PropertyFieldDefinition):
        return f"""{camelize(field.field_name)}: {map_types(field.field_annotation, field.field_name)}"""

    elif isinstance(field, ListFieldDefinition):
        return f"""{camelize(field.field_name)}: {map_types(field.field_annotation, field.field_name)}"""

    elif isinstance(field, MultiKeyFieldDefinition):
        return f"""{camelize(field.field_name)}: null"""

    raise Exception("type", field)


def build_basenode_create_model_typestring(model: type[BaseNode]) -> str:
    field_def_strings = []
    for field in model._meta.fields.property_fields:
        field_def_strings.append(build_property_field(field))
    for field in model._meta.fields.relation_fields:
        field_def_strings.append(build_relation_field_for_create(field))

    return f"""export type {model.__name__}Create = TCreateBase<"{model.__name__}"> & {{{",\n".join(fds for fds in field_def_strings if fds)}}};"""


def build_basenode_reference_set_model_typestring(model: type[BaseNode]) -> str:
    field_def_strings = []
    for field in model._meta.fields.property_fields:
        if field.field_name in model.ReferenceSet.model_fields:
            field_def_strings.append(build_property_field(field))
    for field in model._meta.fields.relation_fields:
        if field.field_name in model.ReferenceSet.model_fields:
            field_def_strings.append(build_relation_field_for_create(field))

    return f"""export type {model.__name__}ReferenceSet = TReferenceSetBase<"{model.__name__}"> & {{{",\n".join(fds for fds in field_def_strings if fds)}}};"""


def build_basenode_reference_create_model_typestring(model: type[BaseNode]) -> str:
    assert model.ReferenceCreate

    field_def_strings = []
    for field in model._meta.fields.property_fields:
        if field.field_name in model.ReferenceCreate.model_fields:
            field_def_strings.append(build_property_field(field))
    for field in model._meta.fields.relation_fields:
        if field.field_name in model.ReferenceCreate.model_fields:
            field_def_strings.append(build_relation_field_for_create(field))

    return f"""export type {model.__name__}ReferenceCreate = TReferenceCreateBase<"{model.__name__}"> & {{{",\n".join(fds for fds in field_def_strings if fds)}}};"""


def build_edge_model_typestring(model: type[EdgeModel]):
    field_strings = []
    for field_name, pydantic_field_definition in model.model_fields.items():
        field_string = f"{camelize(field_name)}: {map_types(field_name=field_name, t=pydantic_field_definition.annotation)}"
        field_strings.append(field_string)
    return f"""export type {model.__name__} = {{{",\n".join(fds for fds in field_strings if fds)}}}"""


def build_reified_relation_create_typestring(model: type[ReifiedRelation]):
    field_strings = []

    for field in model._meta.fields.property_fields:
        field_strings.append(build_property_field(field))

    for field in model._meta.fields.relation_fields:
        field_strings.append(build_relation_field_for_create(field))

    params_string = ", ".join(
        f"{str(k)} extends TReferenceSetBase<BaseNodeTypeNames> | TReferenceCreateBase<BaseNodeTypeNames> | TReifiedRelationCreateBase<ReifiedRelationTypeNames>"
        for k in model.__pydantic_generic_metadata__["parameters"]
    )

    return f"""export type {model.__name__}Create<{params_string}> = TReifiedRelationCreateBase<"{model.__name__}"> & {{{",\n".join(fds for fds in field_strings if fds)}}}"""


def build_semantic_space_create_typestring(model: type[SemanticSpace]) -> str:
    pass


def build_interface_file_string(models: list[AllModelTypeTypes]) -> str:
    strings = []
    for model in models:
        if issubclass(model, BaseNode):
            strings.append(build_basenode_create_model_typestring(model))
            strings.append(build_basenode_reference_set_model_typestring(model))
            if model.ReferenceCreate:
                strings.append(build_basenode_reference_create_model_typestring(model))
        elif issubclass(model, EdgeModel):
            strings.append(build_edge_model_typestring(model))
        elif issubclass(model, ReifiedRelation):
            strings.append(build_reified_relation_create_typestring(model))

    return f"""// AUTOGENERATED FILE: DO NOT EDIT (Generated {datetime.datetime.now()})
import {{type TCreateBase, type TReferenceSetBase, type TReferenceCreateBase, type TReifiedRelationCreateBase}} from "../apiBaseTypes";
import {{
  BaseNodeTypeNames,
  ReifiedRelationTypeNames,
}} from "../modelDefinitionTypes";

{"\n".join(strings)}
"""


def build_typescript_types() -> None:
    interface_core_typescript_file_path = Path(__file__).parent.parent.joinpath(
        "interface_core", "src", "types", ".generated", "types.ts"
    )

    interface_core_typescript_model_names_path = Path(__file__).parent.parent.joinpath(
        "interface_core", "src", "types", ".generated", "nodeTypeNames.ts"
    )

    interface_core_typescript_file_path.write_text(
        build_interface_file_string(get_models("__ALL__"))
    )

    base_node_names = list(f'"{n}"' for n in ModelManager.base_models.keys())
    reified_relation_names = list(
        f'"{n}"' for n in ModelManager.reified_relation_models.keys()
    )

    model_names = f"""// AUTOGENERATED FILE: DO NOT EDIT (Generated {datetime.datetime.now()})
export const BaseNodeTypeNameList = [    
    {",\n\t".join(base_node_names)}
] as const;

export const ReifiedRelationNameList = [    
    {",\n\t".join(reified_relation_names)}
] as const;
"""
    interface_core_typescript_model_names_path.write_text(model_names)
