import datetime
import inspect
import json
import os
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
from frozendict import deepfreeze
from humps import camelize
from jinja2 import Environment, PackageLoader
from metapensiero.pj.__main__ import transform_string
from pangloss.model_config.field_definitions import (
    EmbeddedFieldDefinition,
    EnumFieldDefinition,
    FieldDefinition,
    ListFieldDefinition,
    ModelFieldDefinitions,
    MultiKeyFieldDefinition,
    PropertyFieldDefinition,
    RelationFieldDefinition,
    RelationToNodeDefinition,
    RelationToReifiedDefinition,
    RelationToSemanticSpaceDefinition,
    RelationToTypeVarDefinition,
    TypeParamsToTypeMap,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.model_setup_functions.build_pg_model_definition import (
    is_union,
)
from pangloss.model_config.model_setup_functions.utils import (
    generic_get_subclasses,
    get_all_subclasses,
    get_concrete_model_types,
    get_root_semantic_space_subclasses,
)
from pangloss.models import (
    BaseMeta,
    BaseNode,
    EdgeModel,
    ReifiedMeta,
    ReifiedRelation,
    ReifiedRelationNode,
    RootNode,
    SemanticSpace,
    SemanticSpaceMeta,
)
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
        case prop_types.uri:
            return {"type": "uri"}
        case _ if typing.get_origin(t) is typing.Union:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case _:
            raise Exception(f"<!!!ERROR - NO TYPE MATCH {t} {type(t)}!!!>")
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
        types = []
        for u in typing.get_args(t):
            types.extend(unpack_types(u))
        return types
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
                    "metatype": "RelationToReified"
                    if issubclass(typing.cast(type, t.__base__), ReifiedRelation)
                    else "RelationToNode",
                    "type": typing.cast(ReifiedRelation, t.__base__).__name__,
                    "typeParamsToTypeMap": typeparams,
                }
            ]
        return [{"metatype": "RelationToNode", "type": t.__name__}]


def type_params_to_type_map_to_dict(
    type_param_to_type_map: TypeParamsToTypeMap,
) -> dict[str, typing.Any]:
    return {
        "typeParam": type_param_to_type_map.type_param.__name__,
        "types": unpack_types(type_param_to_type_map.type),
    }


@singledispatch
def field_target_to_dict(field_target) -> dict[str, typing.Any] | None:
    print("!!!ERROR - NO FIELD TARGET DEFINITION MATCH!!!", field_target)
    return None


@field_target_to_dict.register(RelationToSemanticSpaceDefinition)
def relation_to_semantic_space_to_dict(
    field_target_def: RelationToSemanticSpaceDefinition,
):
    types = []

    content_types = set()
    for t in get_concrete_model_types(
        field_target_def.annotated_type._meta.fields["contents"].field_annotation,
        include_subclasses=True,
    ):
        content_types.add(t.__name__)

    content_type_var = str(
        field_target_def.annotated_type.__base__._meta.fields[
            "contents"
        ].field_annotation
    )
    for root_type in get_root_semantic_space_subclasses(
        typing.cast(type[SemanticSpace], field_target_def.annotated_type.__base__)
    ):
        t = {
            "baseType": root_type.__name__,
            "typeParamsToTypeMap": {
                content_type_var: {
                    "typeParam": content_type_var,
                    "types": [
                        {"metatype": "RelationToNode", "type": c} for c in content_types
                    ],
                }
            },
        }
        types.append(t)

    return {
        "metatype": "RelationToSemanticSpace",
        "baseType": typing.cast(
            type[SemanticSpace], field_target_def.annotated_type.__base__
        ).__name__,
        "types": types,
    }


@field_target_to_dict.register(RelationToNodeDefinition)
def relation_to_node_def_to_dict(
    field_target_def: RelationToNodeDefinition,
) -> dict[str, typing.Any]:
    types = []
    for t in get_concrete_model_types(
        field_target_def.annotated_type, include_subclasses=True
    ):
        types.append(
            {
                "metatype": "RelationToNode",
                "type": t.__name__,
            }
        )
    return types


@field_target_to_dict.register(RelationToTypeVarDefinition)
def relation_to_type_var_definition_to_dict(
    field_target_def: RelationToTypeVarDefinition,
) -> dict[str, typing.Any]:
    return {
        "metatype": "RelationToTypeVar",
        "type": field_target_def.annotated_type.__name__,
        "typeVarName": field_target_def.typevar_name,
    }


@field_target_to_dict.register(RelationToReifiedDefinition)
def relation_to_reified_definition_to_dict(
    field_target_def: RelationToReifiedDefinition,
) -> dict[str, typing.Any]:
    return {
        "metatype": "RelationToReified",
        "type": field_target_def.origin_type.__name__,
        "typeParamsToTypeMap": {
            k: type_params_to_type_map_to_dict(v)
            for k, v in field_target_def.type_params_to_type_map.items()
        },
    }


@singledispatch
def field_to_dict(field_definition: FieldDefinition) -> dict[str, typing.Any]:
    print("!!!ERROR - NO FIELD DEFINITION MATCH!!!", field_definition)
    return {"ERROR": "NO FIELD DEFINITION MATCH"}


def build_default_search_types(field_definition: RelationFieldDefinition):
    """Builds a list of types that should be searchable through autocomplete field"""

    drf = field_definition.default_reified_type

    if (
        not drf
        and len(field_definition.field_type_definitions) == 1
        and isinstance(
            field_definition.field_type_definitions[0], RelationToReifiedDefinition
        )
    ):
        drf = field_definition.field_type_definitions[0].origin_type.__name__

    if drf:
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
                default_search_types.update(
                    u.__name__
                    for u in get_concrete_model_types(
                        types, include_subclasses=True, follow_trait_subclasses=True
                    )
                )
        relation_to_node_types: set[str] = set()
        for t in field_definition.relations_to_node:
            relation_to_node_types.update(
                u.__name__
                for u in get_concrete_model_types(
                    t.annotated_type,
                    include_subclasses=True,
                    follow_trait_subclasses=True,
                )
            )

        return list(
            set(
                [
                    *default_search_types,
                    *relation_to_node_types,
                ]
            )
        )

    relation_to_node_types = set()
    for t in field_definition.relations_to_node:
        relation_to_node_types.update(
            u.__name__
            for u in get_concrete_model_types(
                t.annotated_type, include_subclasses=True, follow_trait_subclasses=True
            )
        )

    return list(relation_to_node_types)


def build_default_type_on_selection(field_definition: RelationFieldDefinition):
    """Builds a mapping of the object type that should be created
    (value) when a type (key) is selected in the autocomplete field"""

    # If a default reified type is set...
    if drf := field_definition.default_reified_type:
        # Make sure it is a model, not a string
        if isinstance(drf, str):
            drf = ModelManager.reified_relation_models[drf]

        # Find the type param name (T) for the target field
        target_type_param = str(
            typing.cast(
                RelationFieldDefinition, drf._meta.fields["target"]
            ).field_annotation
        )

        default_type_on_selection_map = {}

        # Find the allowed types whose base type is the default reified type
        for t in field_definition.relations_to_reified:
            if t.origin_type is drf:
                types = t.type_params_to_type_map[target_type_param].type

                # And unpack the param types as maps from the param type to the reified type

                for v in (
                    u.__name__
                    for u in get_concrete_model_types(types, include_subclasses=True)
                ):
                    default_type_on_selection_map[v] = t.origin_type.__name__

        # If not set, map any direct relation-to-node types to None
        for t in field_definition.relations_to_node:
            for dt in get_concrete_model_types(
                t.annotated_type, include_subclasses=True
            ):
                if dt.__name__ not in default_type_on_selection_map:
                    default_type_on_selection_map[dt.__name__] = None

        return default_type_on_selection_map

    # If no default reified type is set, just return the relation-to-node types
    # This will return an empty dict if there is no relation-to-node types; in this case
    # the autocomplete field will not be shown

    default_type_on_selection_map = {}
    for t in field_definition.relations_to_node:
        default_type_on_selection_map.update(
            {
                p.__name__: None
                for p in get_concrete_model_types(
                    t.annotated_type, include_subclasses=True
                )
            }
        )

    return default_type_on_selection_map


@field_to_dict.register(RelationFieldDefinition)
def relation_field_to_dict(
    field_definition: RelationFieldDefinition,
) -> dict[str, typing.Any]:
    relation_field: dict[str, typing.Any] = {"metatype": "RelationField"}
    relation_field["types"] = []
    for ftd in field_definition.field_type_definitions:
        f = field_target_to_dict(ftd)
        if isinstance(f, list):
            relation_field["types"].extend(f)
        else:
            relation_field["types"].append(f)
    relation_field["edgeModel"] = (
        field_definition.edge_model.__name__ if field_definition.edge_model else None
    )
    relation_field["createInline"] = field_definition.create_inline
    relation_field["editInline"] = field_definition.edit_inline
    relation_field["validators"] = validators_to_dict(field_definition.validators)
    relation_field["name"] = camelize(field_definition.field_name)
    relation_field["relationLabels"] = camelize(
        list(camelize(i) for i in field_definition.relation_labels)
    )
    relation_field["reverseName"] = camelize(field_definition.reverse_name)
    relation_field["reverseRelationLabels"] = list(
        camelize(i) for i in field_definition.reverse_relation_labels
    )

    drf = field_definition.default_reified_type

    if (
        not drf
        and len(field_definition.field_type_definitions) == 1
        and isinstance(
            field_definition.field_type_definitions[0], RelationToReifiedDefinition
        )
    ):
        drf = field_definition.field_type_definitions[0].origin_type.__name__

    relation_field["defaultReifiedType"] = drf

    relation_field["defaultSearchType"] = build_default_search_types(field_definition)
    relation_field["defaultTypeOnSelection"] = build_default_type_on_selection(
        field_definition
    )

    relation_field["bind_fields_to_related"] = field_definition.bind_fields_to_related
    return relation_field


@field_to_dict.register(EnumFieldDefinition)
def enum_field_to_dict(field_definition: EnumFieldDefinition) -> dict[str, typing.Any]:
    enum_field: dict[str, typing.Any] = {"metatype": "EnumField"}

    enum_field["enumValues"] = [
        k.value for k in field_definition.field_annotation.__members__.values()
    ]
    return enum_field


@field_to_dict.register(MultiKeyFieldDefinition)
def multikey_field_to_dict(field_definition: MultiKeyFieldDefinition):
    multikey_field: dict[str, typing.Any] = {"metatype": "MultiKeyField", "types": {}}

    multikey_field["types"]["value"] = map_types(
        field_definition.multi_key_field_value_type, field_definition.field_name
    )
    multikey_field["types"]["value"]["validators"] = validators_to_dict(
        field_definition.multi_key_field_value_validators
    )

    for field_def in field_definition.multi_key_field_type._meta.fields:
        assert isinstance(field_def, PropertyFieldDefinition)

        multikey_field["types"][field_def.field_name] = {
            **map_types(field_def.field_annotation, field_def.field_name),
            "validators": validators_to_dict(field_def.validators),
            "defaultValue": field_def.default_value,
        }

    return multikey_field


@field_to_dict.register(ListFieldDefinition)
def list_field_to_dict(field_definition: ListFieldDefinition):
    list_field: dict[typing.Any, typing.Any] = {"metatype": "ListField"}
    list_field["validators"] = validators_to_dict(field_definition.validators)
    list_field["internalTypeValidators"] = validators_to_dict(
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
        "defaultValue": field.default_value,
    }


@field_to_dict.register(EmbeddedFieldDefinition)
def embedded_field_to_dict(field: EmbeddedFieldDefinition):
    return {
        "metatype": "EmbeddedField",
        "types": [
            t.__name__
            for t in get_concrete_model_types(
                field.field_annotation, include_subclasses=True
            )
        ],
    }


def field_def_to_dict(
    model: type[BaseNode | ReifiedRelation | SemanticSpace],
    model_field_definitions: ModelFieldDefinitions,
) -> dict:
    fields = {}

    for field_definition in model_field_definitions.values():
        if field_definition.field_name == "type":
            continue
        fields[camelize(field_definition.field_name)] = field_to_dict(field_definition)
        fields[camelize(field_definition.field_name)]["fieldOnModel"] = model.__name__
    return fields


def flatten(container):
    for i in container:
        if isinstance(i, (list, tuple)):
            for j in flatten(i):
                yield j
        else:
            yield i


def incoming_fields_to_dict(model: type[BaseNode]):
    incoming_field_defs = {}

    for (
        field_name,
        incoming_definition_set,
    ) in model._meta.fields.reverse_relations.items():
        incoming_field_defs[field_name] = {"types": []}

        for field_definition in incoming_definition_set:
            types = set()
            for t in field_definition.relation_definition.field_type_definitions:
                type_definitions = field_target_to_dict(t)
                if isinstance(type_definitions, list):
                    for td in type_definitions:
                        types.add(deepfreeze(td))
                else:
                    types.add(deepfreeze(type_definitions))

    return incoming_field_defs


def build_subclass_hierarchy(model: type["BaseNode"]):
    subclass_hierarchy = {}
    for subclass in model.__subclasses__():
        subclass_hierarchy[subclass.__name__] = build_subclass_hierarchy(subclass)
    return subclass_hierarchy


def get_order_fields(model: type[BaseNode]):
    # TODO: Get inherited InterfaceMeta fields and combine the order_fields,
    # bearing in mind subclassed names

    if getattr(model, "InterfaceMeta", None):
        order_fields = copy(getattr(model, "InterfaceMeta").order_fields)
    else:
        order_fields = []

    for field in model._meta.fields:
        if field.field_name not in order_fields and field.field_name != "type":
            order_fields.append(field.field_name)

    return [camelize(f) for f in order_fields]


def should_collapse_to_js(func: typing.Callable):
    arg_name = func.__code__.co_varnames[1]

    source_string = inspect.getsource(func)

    transformed = transform_string(source_string)

    return f"""
    function ({arg_name}) {{
        {transformed}
        return shouldCollapse({arg_name});
    }};
    """


def meta_to_dict(model, meta: BaseMeta) -> dict:
    meta_as_dict = copy(meta.__dict__)
    meta_as_dict["metatype"] = "BaseNode"
    meta_as_dict["base_model"] = meta.base_model.__name__
    meta_as_dict["supertypes"] = [m.__name__ for m in meta.supertypes]
    meta_as_dict["subtypes"] = [m.__name__ for m in get_all_subclasses(model)]

    meta_as_dict["traits"] = [m.__name__ for m in meta.traits]

    meta_as_dict = camelize(meta_as_dict)
    meta_as_dict["subtypeHierarchy"] = build_subclass_hierarchy(model)
    meta_as_dict["orderFields"] = get_order_fields(model)
    meta_as_dict["colour"] = (
        getattr(model, "InterfaceMeta").colour
        if getattr(model, "InterfaceMeta", None)
        else None
    )

    return meta_as_dict


def refied_relation_meta_to_dict(model, meta: ReifiedMeta) -> dict:
    meta_as_dict = copy(meta.__dict__)
    meta_as_dict["base_model"] = meta.base_model.__name__
    meta_as_dict["metatype"] = (
        "ReifiedRelationNode"
        if issubclass(model, ReifiedRelationNode)
        else "ReifiedRelation"
    )

    meta_as_dict = camelize(meta_as_dict)

    return meta_as_dict


def get_semantic_space_supertypes(model):
    supertypes = []
    for m in model.mro():
        if (
            getattr(m, "__base__", None)
            and not m.__base__.__pydantic_generic_metadata__["args"]
        ):
            if m.__base__ is SemanticSpace:
                break
            supertypes.append(m.__base__.__name__)

    return supertypes


def get_semantic_space_subtypes(model):
    return list(
        {
            m.__base__.__name__
            for m in get_all_subclasses(model)
            if issubclass(m, SemanticSpace)
            and getattr(m, "__base__", None)
            and not m.__pydantic_generic_metadata__["parameters"]
            and m.__base__ is not model
        }
    )


def build_semantic_space_subtype_hierarchy(model: type["SemanticSpace"]):
    subclass_hierarchy = {}
    for subclass in generic_get_subclasses(model):
        if (
            subclass.__base__ is not model
            and not subclass.__pydantic_generic_metadata__["parameters"]
        ):
            subclass_hierarchy[subclass.__base__.__name__] = (
                build_semantic_space_subtype_hierarchy(subclass)
            )
    return subclass_hierarchy


def semantic_space_meta_to_dict(model, meta: SemanticSpaceMeta) -> dict:
    meta_as_dict = copy(meta.__dict__)

    meta_as_dict["base_model"] = meta.base_model.__name__
    meta_as_dict["metatype"] = "SemanticSpace"
    meta_as_dict["supertypes"] = get_semantic_space_supertypes(model)
    meta_as_dict["subtypes"] = get_semantic_space_subtypes(model)

    meta_as_dict = camelize(meta_as_dict)
    meta_as_dict["subtypeHierarchy"] = build_semantic_space_subtype_hierarchy(model)
    meta_as_dict["colour"] = (
        getattr(model, "InterfaceMeta").colour
        if getattr(model, "InterfaceMeta", None)
        else None
    )

    return meta_as_dict


def edge_model_to_dict(model: type[EdgeModel]):
    fields = {}
    for field_name, field in model.__pg_field_definitions__.fields.items():
        fields[camelize(field_name)] = field_to_dict(field)

    return {
        "meta": {"baseModel": model.__name__, "metatype": "EdgeModel"},
        "fields": fields,
    }


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
        model_defintion_as_dict = {
            "meta": meta_to_dict(model, model._meta),
            "fields": field_def_to_dict(model, model._meta.fields),
            "incomingFields": incoming_fields_to_dict(model),
        }
        model_definitions[model_name] = model_defintion_as_dict

    model_definition_json_dict = {
        k: json.dumps(md, indent=2, ensure_ascii=False)
        for k, md in model_definitions.items()
    }

    reified_relation_definitions = {}
    for model_name, model in ModelManager.reified_relation_models.items():
        model_defintion_as_dict = {
            "meta": refied_relation_meta_to_dict(model, model._meta),
            "fields": field_def_to_dict(model, model._meta.fields),
        }
        reified_relation_definitions[model.__name__] = model_defintion_as_dict

    reified_relation_definitions_json_dict = {
        k: json.dumps(md, indent=2, ensure_ascii=False)
        for k, md in reified_relation_definitions.items()
    }

    semantic_space_definitions = {}
    for model_name, model in ModelManager.semantic_space_models.items():
        if not model.__pydantic_generic_metadata__["args"]:
            model_defintion_as_dict = {
                "meta": semantic_space_meta_to_dict(model, model._meta),
                "fields": field_def_to_dict(model, model._meta.fields),
            }
            semantic_space_definitions[model_name] = model_defintion_as_dict

    semantic_space_definitions_json_dict = {
        k: json.dumps(md, indent=2, ensure_ascii=False)
        for k, md in semantic_space_definitions.items()
    }

    edge_model_definitions = {}
    for model_name, model in ModelManager.edge_models.items():
        model_definition_as_dict = edge_model_to_dict(model)
        edge_model_definitions[model_name] = model_definition_as_dict

    edge_model_definitions_json_dict = {
        k: json.dumps(md, indent=2, ensure_ascii=False)
        for k, md in edge_model_definitions.items()
    }

    meta_functions = {}
    for model_name, model in ModelManager.reified_relation_models.items():
        if (
            hasattr(model, "InterfaceMeta")
            and hasattr(getattr(model, "InterfaceMeta"), "should_collapse")
            and callable(
                getattr(getattr(model, "InterfaceMeta"), "should_collapse", None)
            )
        ):
            meta_functions[model_name] = {
                "func": should_collapse_to_js(
                    getattr(getattr(model, "InterfaceMeta"), "should_collapse")
                ),
                "type": "shouldCollapse",
            }

    model_definitions_file_path.write_text(
        template.render(
            model_definitions=model_definition_json_dict,
            reified_relation_definitions=reified_relation_definitions_json_dict,
            semantic_space_definitions=semantic_space_definitions_json_dict,
            edge_model_definitions=edge_model_definitions_json_dict,
            meta_functions=meta_functions,
        ),
        encoding="utf-8",
    )

    try:
        os.system(
            f"bunx prettier {model_definitions_file_path.absolute()} --write > /dev/null"
        )
    except Exception:
        print("[red]File formatter could not be run[/red]")
