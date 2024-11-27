import datetime
import os
import types
import typing
import uuid
from pathlib import Path

import annotated_types
import pydantic
from rich import print

from pangloss.exceptions import PanglossConfigError
from pangloss.model_config.field_definitions import (
    EmbeddedFieldDefinition,
    ListFieldDefinition,
    LiteralFieldDefinition,
    MultiKeyFieldDefinition,
    RelationFieldDefinition,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.models_base import ReferenceSetBase
from pangloss.models import BaseNode, ReifiedRelation

field_types = types.SimpleNamespace()
field_types.str = str
field_types.uuid = uuid.UUID
field_types.union = typing.Union
field_types.list = list
field_types.literal = typing.Literal
field_types.int = int
field_types.float = float
field_types.url = pydantic.HttpUrl
field_types.datetime = datetime.datetime
field_types.date = datetime.date


def map_literal_types(annotated_type: type) -> str:
    match annotated_type:
        case field_types.str:
            return "string"
        case field_types.uuid:
            return 'string & tags.Format<"uuid">'
        case field_types.int:
            return 'number & tags.Type<"int64">'
        case field_types.float:
            return 'number & tags.Type<"float">'
        case field_types.date:
            return 'string & tags.Format<"date">'
        case field_types.datetime:
            return 'string & tags.Format<"date-time">'
        case field_types.url:
            return 'string & tags.Format<"url">'
        case _:
            return "any"


def map_validator_types(validator_type: annotated_types.BaseMetadata) -> str | None:
    match validator_type:
        case annotated_types.MaxLen(n):
            return f"tags.MaxLength<{n}>"
        case annotated_types.MinLen(n):
            return f"tags.MinLength<{n}>"
        case annotated_types.Len(a, b):
            return f"tags.MinLength<{a}> & tags.MaxLength<{b}>"
        case annotated_types.Gt(n):
            return f"tags.ExclusiveMinimum<{n}>"
        case annotated_types.Ge(n):
            return f"tags.Minimum<{n}>"
        case annotated_types.Lt(n):
            return f"tags.ExclusiveMaximum<{n}>"
        case annotated_types.Le(n):
            return f"tags.Maximum<{n}>"
        case _:
            return None


def replace_brackets(name: str) -> str:
    return name.replace("[", "__").replace("]", "__")


def create_typescript_type_for_model(
    model: type[BaseNode], edit_view: bool = False, edit_set: bool = False
) -> tuple[str, list[ReferenceSetBase]]:
    extra_types_to_create = []
    type_strings = []
    for field_definition in model.field_definitions:
        if (
            isinstance(field_definition, LiteralFieldDefinition)
            and field_definition.field_name == "type"
        ):
            type_strings.append(
                f'type: "{typing.get_args(field_definition.field_annotated_type)[0]}";'
            )
            continue
        elif isinstance(field_definition, MultiKeyFieldDefinition):
            from pangloss.model_config.model_setup_functions import (
                initialise_model_field_definitions,
            )

            initialise_model_field_definitions(field_definition.field_annotated_type)

            typesscript_type = replace_brackets(
                field_definition.field_annotated_type.__name__
            )

            validators = [
                t
                for validator in field_definition.validators
                if (t := map_validator_types(validator))
            ]

            type_strings.append(
                f"{field_definition.field_name}: {" & ".join([typesscript_type, *validators])}"
            )
            extra_types_to_create.append(field_definition.field_annotated_type)

        elif isinstance(field_definition, LiteralFieldDefinition):
            typesscript_type = map_literal_types(field_definition.field_annotated_type)

            validators = [
                t
                for validator in field_definition.validators
                if (t := map_validator_types(validator))
            ]

            type_strings.append(
                f"{field_definition.field_name}: {" & ".join([typesscript_type, *validators])};"
            )
        elif isinstance(field_definition, ListFieldDefinition):
            typesscript_type = (
                f"{map_literal_types(field_definition.field_annotated_type)}[]"
            )
            validators = [
                t
                for validator in field_definition.validators
                if (t := map_validator_types(validator))
            ]

            type_strings.append(
                f"{field_definition.field_name}: {" & ".join([typesscript_type, *validators])};"
            )
        elif isinstance(field_definition, RelationFieldDefinition):
            related_types = []
            for t in field_definition.field_concrete_types:
                if (
                    issubclass(t, BaseNode)
                    and field_definition.create_inline
                    and not edit_set
                    and not edit_view
                ):
                    typestring = f"{t.__name__}"
                elif (
                    issubclass(t, BaseNode)
                    and field_definition.edit_inline
                    and (edit_view)
                ):
                    typestring = f"{t.__name__} & EditViewBase"
                elif (
                    issubclass(t, BaseNode)
                    and field_definition.edit_inline
                    and (edit_set)
                ):
                    typestring = f"({t.__name__} | {t.__name__}EditSet)"

                elif issubclass(t, BaseNode):
                    typestring = f"{t.__name__}ReferenceSet"
                    extra_types_to_create.append(t.ReferenceSet)
                elif issubclass(t, ReifiedRelation):
                    if edit_view:
                        typestring = f"{replace_brackets(t.__name__)} & EditViewBase"
                    elif edit_set:
                        typestring = f"({replace_brackets(t.__name__)} | {replace_brackets(t.__name__)} & EditViewBase)"
                    else:
                        typestring = f"{replace_brackets(t.__name__)}"
                    extra_types_to_create.append(t)

                if field_definition.edge_model:
                    typestring = f"({typestring} & {{edgeProperties: {field_definition.edge_model.__name__}}})"
                    extra_types_to_create.append(field_definition.edge_model)

                related_types.append(typestring)
            typesscript_type = f"({" | ".join(related_types)})[]"

            validators = [
                t
                for validator in field_definition.validators
                if (t := map_validator_types(validator))
            ]

            type_strings.append(
                f"{field_definition.field_name}: {" & ".join([typesscript_type, *validators])};"
            )
        elif isinstance(field_definition, EmbeddedFieldDefinition):
            related_types = []
            for t in field_definition.field_concrete_types:
                if edit_view:
                    typestring = f'Omit<{t.__name__} & EditViewBase, "label">'
                elif edit_set:
                    typestring = f'Omit<{t.__name__}, "label"> | Omit<{t.__name__}EditSet & EditViewBase, "label">'
                else:
                    typestring = f'Omit<{t.__name__}, "label">'
                related_types.append(typestring)
            validators = [
                t
                for validator in field_definition.validators
                if (t := map_validator_types(validator))
            ]
            typesscript_type = f"({" | ".join(related_types)})[]"
            type_strings.append(
                f"{field_definition.field_name}: {" & ".join([typesscript_type, *validators])};"
            )

    type_modifier = ""
    if edit_view:
        type_modifier = "EditView"
    if edit_set:
        type_modifier = "EditSet"

    additional_type = ""
    if edit_set:
        additional_type = "& EditSetBase"

    return (
        f"""
export type {replace_brackets(model.__name__)}{type_modifier} = {{
\t{"\n\t".join(type_strings)}
}} {additional_type};
""",
        extra_types_to_create,
    )


def create_typescript_types():
    definition_strings = []

    ModelManager.initialise_models()
    extra_types_to_create = set()
    extra_types_already_created = set()

    for model in ModelManager.registered_models:
        string, extra_types = create_typescript_type_for_model(model)
        definition_strings.append(string)
        extra_types_to_create.update(extra_types)

    for model in ModelManager.registered_models:
        string, extra_types = create_typescript_type_for_model(model, edit_view=True)
        definition_strings.append(string)
        extra_types_to_create.update(extra_types)

    for model in ModelManager.registered_models:
        string, extra_types = create_typescript_type_for_model(model, edit_set=True)
        definition_strings.append(string)
        extra_types_to_create.update(extra_types)

    while extra_types_to_create:
        model = extra_types_to_create.pop()
        if model not in extra_types_already_created:
            string, extra_types = create_typescript_type_for_model(model)
            definition_strings.append(string)
            extra_types_to_create.update(extra_types)
            extra_types_already_created.add(model)

    generated_directory = Path(
        os.path.realpath(__file__)
    ).parent.parent.parent.joinpath(Path("src", "generated"))

    if not generated_directory.is_dir():
        raise PanglossConfigError(
            "Interface directory for generated TypeScript types (src/generated) is missing"
        )

    typescript_file = generated_directory.joinpath(Path("types.ts"))

    create_type_strings = [
        f"{model.__name__}: {model.__name__},"
        for model in ModelManager.registered_models
        if model.Meta.create
    ]

    create_validator_strings = [
        f"{model.__name__}: typia.createValidate<{model.__name__}>(),"
        for model in ModelManager.registered_models
        if model.Meta.create
    ]

    edit_validator_strings = [
        f"{model.__name__}: typia.createValidate<{model.__name__}EditSet>(),"
        for model in ModelManager.registered_models
        if model.Meta.edit
    ]

    edit_view_type_strings = [
        f"{model.__name__}: {model.__name__}EditView & HeadEditViewBase,"
        for model in ModelManager.registered_models
        if model.Meta.edit
    ]

    edit_set_type_strings = [
        f"{model.__name__}: {model.__name__}EditSet,"
        for model in ModelManager.registered_models
        if model.Meta.edit
    ]

    file_contents = f"""
import typia, {{ tags }} from "typia";

{"\n".join(definition_strings)}

export type CreationTypesMap = {{
    {"\n\t".join(create_type_strings)}
}}

export type CreateableTypesNames = keyof CreationTypesMap;

type CreationValidatorsType = {{
  [K in keyof CreationTypesMap]: (
    input: object
  ) => typia.IValidation<CreationTypesMap[K]>;
}};

export const creationValidators: CreationValidatorsType = {{
    {"\n\t".join(create_validator_strings)}
}}



export type HeadEditViewBase = {{
  uuid: string & tags.Format<"uuid">;
  createdBy: string;
  createdWhen: string & tags.Format<"date-time">;
  modifiedBy: string;
  modifiedWhen: string & tags.Format<"date-time">;
}};

export type EditViewBase = {{
  uuid: string & tags.Format<"uuid">;
}}

export type EditSetBase = {{
  uuid: string & tags.Format<"uuid">;
}};

export type EditViewTypesMap = {{
    {"\n\t".join(edit_view_type_strings)}
}}

export type EditableTypesNames = keyof EditViewTypesMap;

export type EditSetTypesMap = {{
    {"\n\t".join(edit_set_type_strings)}
}}

type EditValidatorType = {{
  [K in keyof EditSetTypesMap]: (
    input: object
  ) => typia.IValidation<EditSetTypesMap[K]>;
}};


export const editValidators: EditValidatorType = {{
    {"\n\t".join(edit_validator_strings)}
}}

"""

    typescript_file.write_text(file_contents)
    try:
        os.system(f"bunx prettier {typescript_file.absolute()} --write > /dev/null")
    except Exception:
        print("[red]File formatter could not be run[/red]")