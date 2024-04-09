import dataclasses
import typing
import types
import uuid

from annotated_types import MaxLen, MinLen
from humps import camelize

import typing_inspect

from rich import print


from pangloss_core.model_setup.base_node_definitions import BaseNodeReference

if typing.TYPE_CHECKING:
    from pangloss_core.models import BaseNode
    from pydantic.fields import FieldInfo


field_types = types.SimpleNamespace()
field_types.str = str
field_types.uuid = uuid.UUID
field_types.max_len = MaxLen
field_types.union = typing.Union
field_types.list = list
field_types.literal = typing.Literal


def unpack_level(ann):
    try:
        ann_args = typing.get_args(ann.annotation) or ann.annotation
    except AttributeError:
        ann_args = ann
    return ann_args


def parse_annotation(field_name: str, ann: "FieldInfo"):
    tl = []
    extras = []
    args = typing_inspect.get_args(ann)
    origin = typing_inspect.get_origin(ann)
    if typing.get_origin(ann) is typing.Annotated:
        yield from parse_annotation(field_name, args[0])
        extras.append(typing.get_args(ann)[1:])

    elif typing_inspect.is_optional_type(ann):
        if origin:
            yield origin
        if args:
            yield from parse_annotation(field_name, args)

    elif typing_inspect.is_union_type(ann):

        if origin:
            yield origin

        yield list(list(parse_annotation(field_name, t))[0] for t in args)

    elif typing_inspect.is_generic_type(ann):

        if origin:
            yield origin
        yield from parse_annotation(field_name, args[0])
    else:
        # This gets literal types, which we like
        yield ann

    return extras


def build_valibot_object(model: "type[BaseNode]"):
    valibot_object = {}
    for field_name, field in model.model_fields.items():
        # print("=====")
        # print("FIELD ANNOTATION", field.annotation)

        tl = list(parse_annotation(field_name, field.annotation))
        valibot_object[camelize(field_name)] = tl
    return valibot_object


def parse_type(t):
    match t:
        case field_types.list:
            return "v.array({})"
        case field_types.union:
            return "v.union([{}])"
        case field_types.str:
            return "v.string([{}])"
        case field_types.literal:
            return "v.literal({})"
        case [*items]:
            return ", ".join(parse_type(i) for i in items)
        case str(x):
            return x
        case x:
            return x.__name__


def construct_type_string(ts):
    type_strings = [parse_type(t) for t in ts]
    s = type_strings[0]
    try:

        for t in type_strings[1:]:
            s = s.format(t)
            print(s)
        return s
    except:
        return f"ERR, {s}"


def build_fields_string(valibot_object):
    string = ""
    for field_name, tl in valibot_object.items():
        string += f"\t{field_name}: {construct_type_string(tl)}\n"
    return string


def build_object_string(model_name, valibot_object):

    string = f"""
    const {model_name}Schema = v.object({{
    {build_fields_string(valibot_object)}
    }})
    """
    return string


def build_frontend_type_file():
    from pangloss_core.model_setup.model_manager import ModelManager

    for model in ModelManager._registered_models:
        print("========")
        vo = build_valibot_object(model)
        print(vo)
        string = build_object_string(model.__name__, vo)
        print(string)
