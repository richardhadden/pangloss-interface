"""
build_frontend_types.py

Introspects the type annotations of all models installed by a project
and builds a CURRENT_PROJECT_CONFIG.ts in the interface/src directory

"""

import datetime
import io
import inspect
import types
import typing
import os
import uuid

import annotated_types
from humps import camelize
import pydantic
from rich import print
import typing_inspect

from pangloss_core.model_setup.base_node_definitions import BaseNodeReference
from pangloss_core.models import RelationTo, RelationConfig, BaseNode, RelationPropertiesModel
from pangloss_core.indexes import IndexAnnotation
from pangloss_core.model_setup.model_manager import ModelManager

if typing.TYPE_CHECKING:
    from pangloss_core.models import BaseNode
  


class PanglossInterfaceConfigError(Exception):
    pass


field_types = types.SimpleNamespace()
field_types.str = str
field_types.uuid = uuid.UUID
field_types.union = typing.Union
field_types.list = list
field_types.literal = typing.Literal
field_types.int = int
field_types.float = float


def build_valibot_item_for_model(model):
    valibot_objects = {}
    for field_name, field in model.model_fields.items():
        valibot_objects[camelize(field_name)] = to_valibot(parse(field.annotation))
        
    return valibot_objects

def build_typescript_item(model):
    typescript_objects = {}
    for field_name, field in model.model_fields.items():
        typescript_objects[camelize(field_name)] = to_typescript(parse(field.annotation))
    return typescript_objects

already_built_reference_types = set()
extra_reference_types_to_write = {}

def write_item_to_file(f: io.TextIOBase, model, model_valibot_object):
    
    # Checks for mention of the current model validator in its own fields (i.e. self-referencing model)
    # In this case, we need to generate our own TypeScript definition, and not rely on inferring
    # from Valibot validator 
    if any(f"v.lazy(() => {model.__name__}Validator)" in values for values in model_valibot_object.values()):
        typescript_object = build_typescript_item(model)
        f.write(f"type {model.__name__} = {{{",\n\t".join(f"{name}: {decl}" for name, decl in typescript_object.items())}}};\n")
        f.write(f"""const {model.__name__}Validator: v.BaseSchema<{model.__name__}> = v.object({{{
            ",".join(f"\n\t{name}: {decl}" for name, decl in model_valibot_object.items()) 
            }}});""")
    else:
        f.write(f"type {model.__name__} = v.Output<typeof {model.__name__}Validator>;\n")
        f.write(f"""const {model.__name__}Validator = v.object({{{
            ",".join(f"\n\t{name}: {decl}" for name, decl in model_valibot_object.items()) 
            }}});""")
    
    f.write("\n\n")

def build_frontend_type_file(project_name: str, interface_path):
    
    FILE_PATH = os.path.join(interface_path, "ProjectConfig.ts")
    
    base_class_valibot_models = {}
    already_built_reference_types.update(model.Reference for model in ModelManager._registered_models)
    
    for model in ModelManager._registered_models:
        model_valibot_object = build_valibot_item_for_model(model)
        base_class_valibot_models[model] = model_valibot_object
        
    with open(FILE_PATH, "w") as f:
        
        f.write(f"""/* =========================DO NOT MODIFY!!!==================={"".join("=" for _ in range(len(project_name)))}
                
Auto-generated configuration for Pangloss project {project_name}.

It contains TypeScript types, Valibot validators and other information.

This configuration file will be used when building the interface.

============================DO NOT MODIFY!!!================={"".join("=" for _ in range(len(project_name)))} */\n\n
""")
        f.write('import * as v from "valibot"')
        f.write("\n\n")
        
        for model in ModelManager._registered_models:
            model_valibot_object = build_valibot_item_for_model(model.Reference)
            write_item_to_file(f, model.Reference, model_valibot_object)
        
        f.write(f"""export type EntityTypes = ({"|".join(f'"{model.__name__}"' for model in ModelManager._registered_models)});\n\n""")
        
        f.write("""type GenericListReturnType<T> = {
            results: T[];
            count: number;
            page: number;
            totalPages: number;
            nextPage: number;
            previousPage: number;
            nextUrl: string;
            previousUrl: string;
        };\n\n""")
        
        f.write(f"""export type ListReturnTypes = {{
    {",".join(f"{model.__name__}: GenericListReturnType<{model.__name__}Reference>" for model in ModelManager._registered_models)}
        }};\n\n""")
            
        for model, model_valibot_object in extra_reference_types_to_write.items():
            write_item_to_file(f, model, model_valibot_object)
        
        for model, model_valibot_object in base_class_valibot_models.items():
            write_item_to_file(f, model, model_valibot_object)
            
        f.write(f"""export const ValidatorsByModelName = {{
            {",\n".join(f"{model.__name__}: {model.__name__}Validator" for model in ModelManager._registered_models)}
        }};\n\n""")
    
    print("[blue bold]Running Prettier formatter on generated file to make it nice...[/blue bold]")
    os.system(f"bunx prettier {FILE_PATH} --write")
    print("\n\n[green bold]Interface Config file generated[/green bold]")
    
class Union(list):
    def __repr__(self):
        return f"Union({super().__repr__()[1:][:-1]})"


class Literal(str):
    def __repr__(self):
        return f"Literal({super().__repr__()})"


def parse(ann):
    """Parses a type annotation to a nested object"""
    if typing_inspect.is_literal_type(ann):
        return Literal(typing_inspect.get_args(ann)[0])
    if typing.get_origin(ann) is typing.Annotated:
        return {
            **parse(typing_inspect.get_args(ann)[0]),
            "type": typing.get_origin(typing_inspect.get_origin(ann))
            or typing_inspect.get_origin(ann),
            "annotations": list(typing.get_args(ann)[1:]),
        }
    if typing_inspect.is_union_type(ann):
        return Union(parse(a) for a in typing_inspect.get_args(ann))

    if typing_inspect.is_generic_type(ann):
        return {
            "type": typing_inspect.get_origin(ann)
            or typing_inspect.get_origin(typing.get_args(ann)[0])
            or typing_inspect.get_origin(ann),
            "inner": parse(typing.get_args(ann)[0]),
        }
    return {"type": ann}


def typescript_primitive_types(t) -> str:
    """Converts a Pydantic type to TypeScript equivalent"""
    match t:
        case {"type": pydantic.HttpUrl}:
            return "string"
        case {"type": types.NoneType}:
            return "null"
        case {"type": uuid.UUID}:
            return "string"
        case {"type": field_types.str}:
            return "string"
        case {"type": datetime.date}:
            return "string"
        case {"type": datetime.datetime}:
            return "string"
        case {"type": field_types.int}:
            return "number"
        case {"type": field_types.float}:
            return "number"
        case {"type": c} if issubclass(c, BaseNode):
            return c.__name__
        case {"type": c } if issubclass(c, BaseNodeReference):
            return f"{c.__name__}"
        case _:
            return "v.any()"
            return "Missing!"



def primitive_types(t) -> str:
    """Converts Pydantic primitive types to Valibot validators"""
    match t:
        case {"type": pydantic.HttpUrl}:
            return "v.string([v.url()])"
        case {"type": types.NoneType}:
            return "v.null_()"
        case {"type": uuid.UUID}:
            return "v.string([v.uuid()])"
        case {"type": field_types.str}:
            if vs := t.get("annotations", None):
                return f"v.string([{",".join(parse_validators(v) for v in vs)}])"
            return "v.string()"
        case {"type": datetime.date}:
            return "v.string([v.isoDate()])"
        case {"type": datetime.datetime}:
            return "v.string([v.isoDateTime()])"
        case {"type": field_types.int}:
            if vs := t.get("annotations", None):
                return f"v.number([v.integer(), {",".join(parse_validators(v) for v in vs)}])"
            return "v.number([v.integer()])"
        case {"type": field_types.float}:
            if vs := t.get("annotations", None):
                return f"v.number([v.decimal(), {",".join(parse_validators(v) for v in vs)}])"
            return "v.number([v.decimal()])"
        case {"type": c} if issubclass(c, BaseNode):
            return f"v.lazy(() => {c.__name__}Validator)"
        case {"type": c } if issubclass(c, BaseNodeReference):
            if c not in already_built_reference_types:
                already_built_reference_types.add(c)
                extra_reference_types_to_write[c] = build_valibot_item_for_model(c)
            return f"{c.__name__}Validator"
        case {"type": c} if issubclass(c, RelationPropertiesModel):
           
            return f"""v.object({{{
                ",".join(f"\n\t{name}: {decl}" for name, decl in build_valibot_item_for_model(c).items()) 
            }}})"""
        case _:
            return "v.any()"
            return "Missing!"

def parse_validators(ann):
    """Converts typing.Annotated validators to additional Valibot validators"""
    match ann:
        case annotated_types.MaxLen(n):
            return f"v.maxLength({n})"
        case annotated_types.MinLen(n):
            return f"v.minLength({n})"
        case annotated_types.Gt(n):
            return f"v.minValue({n}), v.notValue({n})"
        case annotated_types.Lt(n):
            return f"v.maxValue({n}), v.notValue({n})"
        case annotated_types.Ge(n):
            return f"v.minValue({n})"
        case annotated_types.Le(n):
            return f"v.maxValue({n})"
        case annotated_types.Len(l, u):
            return f"v.minLength({l}), v.maxLength({u})"
        case a if (inspect.isclass(a) and issubclass(a, IndexAnnotation)) or isinstance(a, IndexAnnotation):
            return ""
        case _:
            raise PanglossInterfaceConfigError(f"Cannot build interface validator for annotation {ann}")

def to_valibot(td):
    """Converts parsed nested model to Valibot validator objects"""
    match td:
        case Union(items):
            union_items = ", ".join(to_valibot(i) for i in items)
            return f"v.union([{union_items}])"
        case Literal(value):
            return f'v.literal("{value}")'
        case {"type": field_types.list}:
            return f"v.array({to_valibot(td.get("inner", ""))}{f", [{",".join(parse_validators(t) for t in td.get("annotations", []))}]" if td.get("annotations", None) else ""})"
        case t:
            return primitive_types(t)


def to_typescript(td):
    """Converts parsed nested model to TypeScript types"""
    match td:
        case Union(items):
            return " | ".join(to_typescript(i) for i in items)
        case Literal(value):
            return f'"{str(value)}"'
        case {"type": field_types.list}:
            return f"Array<{to_typescript(td.get("inner", ""))}>"
        case t:
            return typescript_primitive_types(t)


