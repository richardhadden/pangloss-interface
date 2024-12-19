import datetime
import functools
import inspect
import json
import os
import types
import typing
import uuid
from pathlib import Path

import annotated_types
import humps
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
from pangloss.model_config.model_setup_utils import get_all_subclasses
from pangloss.model_config.models_base import (
    EdgeModel,
    MultiKeyField,
    ReferenceViewBase,
    ReifiedRelationNode,
    ViewBase,
)
from pangloss.models import BaseNode, ReifiedRelation
from pangloss_interface.utils import AutocompleteEndpoints

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


class ExtraTypesToCreate:
    extra_types_to_create = set()
    created_types = set()


def map_literal_types(annotated_type: type) -> str:
    match annotated_type:
        case field_types.str:
            return "string"
        case field_types.uuid:
            return "string"  # & tags.Format<"uuid">'
        case field_types.int:
            return "number"  # & tags.Type<"int64">'
        case field_types.float:
            return "number"  # & tags.Type<"float">'
        case field_types.date:
            return "string"  # & tags.Format<"date">'
        case field_types.datetime:
            return "string"  # & tags.Format<"date-time">'
        case field_types.url:
            return "string"  # & tags.Format<"url">'
        case _ if inspect.isclass(annotated_type) and issubclass(
            annotated_type, EdgeModel
        ):
            return annotated_type.__name__
        case _ if typing.get_origin(annotated_type) == typing.Union:
            ExtraTypesToCreate.extra_types_to_create.update(
                typing.get_args(annotated_type)
            )
            return f'({" | ".join(replace_brackets(m.__name__) for m in typing.get_args(annotated_type))})'
        case c if inspect.isclass(c):
            ExtraTypesToCreate.extra_types_to_create.add(c)
            return replace_brackets(c.__name__)
        case _:
            return "TYPEGENERROR!!"


def map_validator_types(validator_type: annotated_types.BaseMetadata) -> str | None:
    return ""
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
) -> str:
    from pangloss.model_config.model_setup_functions import (
        initialise_model_field_definitions,
    )

    initialise_model_field_definitions(model)
    extra_types_to_create = []
    type_strings = []

    for field_definition in model.field_definitions:
        if (
            isinstance(field_definition, LiteralFieldDefinition)
            and field_definition.field_name == "type"
        ):
            try:
                type_strings.append(
                    f'type: "{typing.get_args(field_definition.field_annotated_type)[0]}";'
                )
            except Exception:
                type_strings.append(f'type: "{model.__name__}";')
        elif (
            isinstance(field_definition, LiteralFieldDefinition)
            and field_definition.field_name == "head_uuid"
        ):
            type_strings.append('headUuid?: string & tags.Format<"uuid">;')
        elif (
            isinstance(field_definition, LiteralFieldDefinition)
            and field_definition.field_name == "head_type"
        ):
            type_strings.append("headType?: string")

        elif isinstance(field_definition, MultiKeyFieldDefinition):
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
                f"{humps.camelize(field_definition.field_name)}: {" & ".join([typesscript_type, *validators])}"
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
                f"{humps.camelize(field_definition.field_name)}: {" & ".join([typesscript_type, *validators])};"
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
                f"{humps.camelize(field_definition.field_name)}: {" & ".join([typesscript_type, *validators])};"
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
                f"{humps.camelize(field_definition.field_name)}: {" & ".join([typesscript_type, *validators])};"
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
                f"{humps.camelize(field_definition.field_name)}: {" & ".join([typesscript_type, *validators])};"
            )

    ExtraTypesToCreate.extra_types_to_create.update(extra_types_to_create)

    type_modifier = ""
    if edit_view:
        type_modifier = "EditView"
    if edit_set:
        type_modifier = "EditSet"

    additional_type = ""
    if edit_set:
        additional_type = "& EditSetBase"

    return f"""
export type {replace_brackets(model.__name__)}{type_modifier} = {{
\t{"\n\t".join(type_strings)}
}} {additional_type};
"""


def create_incoming_relations_partial_type(
    model: type[BaseNode],
) -> str:
    from pangloss.model_config.model_setup_functions import (
        initialise_model_field_definitions,
    )

    type_strings = []
    extra_types_to_create = []

    for (
        incoming_field_name,
        incoming_relation_definition_set,
    ) in model.incoming_relation_definitions.items():
        type_names = []
        for incoming_relation_definition in incoming_relation_definition_set:
            if issubclass(
                incoming_relation_definition.source_concrete_type, ReferenceViewBase
            ):
                initialise_model_field_definitions(
                    incoming_relation_definition.source_concrete_type
                )

                type_names.append(
                    f"({incoming_relation_definition.source_concrete_type.__name__})"
                )
                extra_types_to_create.append(
                    incoming_relation_definition.source_concrete_type
                )
            elif issubclass(
                incoming_relation_definition.source_concrete_type, ViewBase
            ):
                initialise_model_field_definitions(
                    incoming_relation_definition.source_concrete_type
                )
                type_names.append(
                    incoming_relation_definition.source_concrete_type.__name__
                )
                extra_types_to_create.append(
                    incoming_relation_definition.source_concrete_type
                )

        type_strings.append(
            f"{humps.camelize(incoming_field_name)}?: ({" | ".join( replace_brackets(tn) for tn in type_names)})[];"
        )

    ExtraTypesToCreate.extra_types_to_create.update(extra_types_to_create)
    return f"""
{{
  {"\n".join(type_strings)}      
}}"""


"""
export type FieldDefinition = {
  metatype: "Value" | "Outgoing" | "Incoming" | "Embedded";
  type: Any[];
  createInline?: boolean;
  editInline?: boolean;
};"""


class ConfigObjectsToCreate:
    config_objects_to_create = set()
    created_objects = set(())


def create_validator_descriptions_for_field(
    validator_type: annotated_types.BaseMetadata,
) -> dict[str, typing.Any]:
    match validator_type:
        case annotated_types.MaxLen(n):
            return {"maxLength": n}
        case annotated_types.MinLen(n):
            return {"minLength": n}
        case annotated_types.Len(a, b):
            return {"minLength": a, "maxLength": b}
        case annotated_types.Gt(n):
            return {"exclusiveMinimum": n}
        case annotated_types.Ge(n):
            return {"minimum": n}
        case annotated_types.Lt(n):
            return {"exclusiveMaximum": n}
        case annotated_types.Le(n):
            return {"maximum": n}
        case _:
            return {}


def unpack_validators(validators):
    return functools.reduce(
        lambda existing, new: {
            **existing,
            **create_validator_descriptions_for_field(new),
        },
        validators,
        {},
    )


def build_model_hierarchy(model: type["BaseNode"]):
    subclass_hierarchy = {}
    for subclass in model.__subclasses__():
        subclass_hierarchy[subclass.__name__] = build_model_hierarchy(subclass)
    return subclass_hierarchy


def build_config_object_string(model: type[BaseNode] | type[MultiKeyField[typing.Any]]):
    if hasattr(model, "Meta"):
        model_dict = {
            humps.camelize(k): v
            for k, v in getattr(model, "Meta").__dict__.items()
            if not k.startswith("_")
        }
        model_dict["fields"] = {}
    else:
        model_dict = {
            "abstract": False,
            "create": True,
            "edit": True,
            "delete": True,
            "fields": {},
        }

    if issubclass(model, ReifiedRelationNode):
        model_dict["metatype"] = "ReifiedRelationNode"

    elif issubclass(model, ReifiedRelation):
        model_dict["metatype"] = "ReifiedRelation"

    elif issubclass(model, MultiKeyField):
        model_dict["metatype"] = "MultiKeyFieldModel"

    elif issubclass(model, ViewBase):
        model_dict["metatype"] = "IncomingViaReified"

    elif issubclass(model, EdgeModel):
        model_dict["metatype"] = "EdgeModel"

    else:
        model_dict["metatype"] = "BaseNode"

    if issubclass(model, BaseNode):
        model_dict["typeHierarchy"] = build_model_hierarchy(model)

    for field_definition in model.field_definitions:
        assert isinstance(
            field_definition,
            (
                LiteralFieldDefinition,
                ListFieldDefinition,
                RelationFieldDefinition,
                MultiKeyFieldDefinition,
                EmbeddedFieldDefinition,
            ),
        )
        if field_definition.field_metatype == "Literal":
            model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                "metatype": field_definition.field_metatype,
                "type": field_definition.field_annotated_type.__name__,
                "validators": unpack_validators(field_definition.validators),
            }
        elif field_definition.field_metatype == "List":
            # Small hack here to determine whether we are dealing with a real list-field
            # or incoming relation definition
            if issubclass(model, ViewBase):
                fd = typing.cast(
                    RelationFieldDefinition,
                    [
                        f
                        for f in model.base_class.field_definitions
                        if f.field_name == field_definition.field_name
                    ][0],
                )
                model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                    "metatype": "OutgoingRelation",
                    "type": [
                        replace_brackets(t.__name__) for t in fd.field_concrete_types
                    ],
                }
            else:
                model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                    "metatype": "ListField",
                    "type": field_definition.field_annotated_type.__name__,
                    "validators": unpack_validators(field_definition.validators),
                }

        elif field_definition.field_metatype == "MultiKeyField":
            model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                "metatype": field_definition.field_metatype,
                "type": field_definition.field_annotated_type.__name__,
            }
            ConfigObjectsToCreate.config_objects_to_create.add(
                field_definition.field_annotated_type
            )
        elif field_definition.field_metatype == "Relation":
            model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                "metatype": "OutgoingRelation",
                "type": [
                    replace_brackets(t.__name__)
                    for t in field_definition.field_concrete_types
                ],
                "createInline": field_definition.create_inline,
                "editInline": field_definition.edit_inline,
                "edgeModel": field_definition.edge_model.__name__
                if field_definition.edge_model
                else None,
                "validators": unpack_validators(field_definition.validators),
                "defaultType": field_definition.default_type,
                "autocompleteEndpoint": AutocompleteEndpoints.generate_endpoints(
                    [
                        model
                        for model in field_definition.field_concrete_types
                        if issubclass(model, BaseNode)
                    ]
                ),
            }
            ConfigObjectsToCreate.config_objects_to_create.update(
                [
                    t
                    for t in field_definition.field_concrete_types
                    if not issubclass(t, BaseNode)
                ],
            )
            if field_definition.edge_model:
                ConfigObjectsToCreate.config_objects_to_create.add(
                    field_definition.edge_model
                )

        elif field_definition.field_metatype == "Embedded":
            model_dict["fields"][humps.camelize(field_definition.field_name)] = {
                "metatype": field_definition.field_metatype,
                "type": [t.__name__ for t in field_definition.field_concrete_types],
                "validators": unpack_validators(field_definition.validators),
            }

    if issubclass(model, BaseNode):
        for (
            relation_name,
            relation_definitions,
        ) in model.incoming_relation_definitions.items():
            types = []
            for rd in relation_definitions:
                if issubclass(rd.source_concrete_type, ReferenceViewBase):
                    types.append(
                        replace_brackets(rd.source_concrete_type.base_class.__name__)
                    )
                else:
                    types.append(
                        f"{replace_brackets(rd.source_concrete_type.__name__)}"
                    )
                    ConfigObjectsToCreate.config_objects_to_create.add(
                        rd.source_concrete_type
                    )

            model_dict["fields"][humps.camelize(relation_name)] = {
                "metatype": "IncomingRelation",
                "type": types,
            }

    view_type_name = (
        f"{replace_brackets(model.__name__)}"
        if issubclass(model, MultiKeyField)
        else f"{replace_brackets(model.__name__)}"
    )

    extra_type_ending = "View" if issubclass(model, BaseNode) else ""
    return (
        replace_brackets(model.__name__),
        f"""const {replace_brackets(model.__name__)}Config: ConfigObject<{replace_brackets(view_type_name)}{extra_type_ending}> = {json.dumps(model_dict)};""",
    )


def create_typescript_types():
    definition_strings = []
    ModelManager.initialise_models()

    types_already_created = set()

    ExtraTypesToCreate.extra_types_to_create.update(
        [model.ReferenceView for model in ModelManager.registered_models]
    )

    for model in ModelManager.registered_models:
        string = create_typescript_type_for_model(model)
        definition_strings.append(string)

    for model in ModelManager.registered_models:
        string = create_typescript_type_for_model(model, edit_view=True)
        definition_strings.append(string)

    for model in ModelManager.registered_models:
        string = create_typescript_type_for_model(model, edit_set=True)
        definition_strings.append(string)

    for model in ModelManager.registered_models:
        if model.incoming_relation_definitions:
            string = create_incoming_relations_partial_type(model)
            definition_strings.append(
                f"export type {model.__name__}View = {model.__name__}EditView & {string};"
            )
        else:
            definition_strings.append(
                f"export type {model.__name__}View = {model.__name__}EditView;"
            )

    while ExtraTypesToCreate.extra_types_to_create:
        model = ExtraTypesToCreate.extra_types_to_create.pop()

        if model.__name__ not in types_already_created:
            string = create_typescript_type_for_model(model)
            definition_strings.append(string)

            types_already_created.add(model.__name__)

    generated_directory = Path(
        os.path.realpath(__file__)
    ).parent.parent.parent.joinpath(Path("src", "generated"))

    if not generated_directory.is_dir():
        raise PanglossConfigError(
            "Interface directory for generated TypeScript types (src/generated) is missing"
        )

    typescript_file = generated_directory.joinpath(Path("types.ts"))
    validators_file = generated_directory.joinpath(Path("validators.ts"))

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

    edit_type_import_string = f'import type {{ {", ".join(f"{model.__name__}EditSet" for model in ModelManager.registered_models
        if model.Meta.edit)}, EditValidatorType }} from "~/generated/types";'

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

    view_type_strings = [
        f"{model.__name__}: {model.__name__}View"
        for model in ModelManager.registered_models
    ]

    list_view_type_strings = [
        f"{model.__name__}: GenericListReturnType<{" | ".join(f"{m.__name__}ReferenceView" for m in [*get_all_subclasses(model), model])}>;"
        for model in ModelManager.registered_models
    ]

    config_object_strings = [
        build_config_object_string(model) for model in ModelManager.registered_models
    ]

    while ConfigObjectsToCreate.config_objects_to_create:
        model = ConfigObjectsToCreate.config_objects_to_create.pop()

        if model.__name__ not in ConfigObjectsToCreate.created_objects:
            config_object_strings.append(build_config_object_string(model))

            ConfigObjectsToCreate.created_objects.add(model.__name__)

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

        /*
        export const creationValidators: CreationValidatorsType = {{
            {"\n\t".join(create_validator_strings)}
        }}
        */


        export type HeadEditViewBase = {{
        uuid: string & tags.Format<"uuid">;
        createdBy: string;
        createdWhen: string & tags.Format<"date-time">;
        modifiedBy: string;
        modifiedWhen: string & tags.Format<"date-time">;
        }};

        export type ReferenceViewBase = {{
            label: string;
            head_uuid: string & tags.Format<"uuid">; 
            head_type: string;
        }}

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

       
        export type EditValidatorType = {{
        [K in keyof EditSetTypesMap]: (
            input: object
        ) => typia.IValidation<EditSetTypesMap[K]>;
        }};

        export type ViewTypesMap = {{
            {"\n\t".join(view_type_strings)}
        }}
        
        export type HeadViewTypesMap = {{
            [k in keyof ViewTypesMap]: k & HeadEditViewBase;
        }};

        export type ViewableTypesNames = keyof ViewTypesMap;
        

        type GenericListReturnType<T> = {{
            results: T[];
            count: number;
            page: number;
            totalPages: number;
            nextPage: number;
            previousPage: number;
            nextUrl: string;
            previousUrl: string;
        }};

        export type ListTypesMap = {{
            {"\n\t".join(list_view_type_strings)}
        }}

        export type ListableTypesNames = keyof ListTypesMap;

        export type FieldDefinition = {{
            metatype:
                | "Literal"
                | "ListField"
                | "OutgoingRelation"
                | "IncomingRelation"
                | "Embedded"
                | "MultiKeyField";
            type: string | string[];
            createInline?: boolean;
            editInline?: boolean;
            edgeModel?: string | null;
            validators?: object;
            defaultType?: string | null;
            autocompleteEndpoint?: string;
        }};

        type FieldsObjects<T> = {{
            [Property in keyof T]?: FieldDefinition;
            
        }};

        type ConfigObject<T> = {{
            metatype: "BaseNode" | "MultiKeyFieldModel" | "ReifiedRelation" | "ReifiedNode" | "IncomingViaReified" | "EdgeModel";
            abstract?: boolean;
            create: boolean;
            edit: boolean;
            delete: boolean;
            view?: boolean;
            search?: boolean;
            fields: FieldsObjects<T>;
            labelField?: string | null;
            typeHierarchy?: TypeHierarchy | {{}};
        }};
        
        type TypeHierarchy = {{
            [Property in ViewableTypesNames]: TypeHierarchy | {{}};
        }};

        {"\n".join(m[1] for m in config_object_strings)}

        export const ModelConfigs = {{
            {"\n".join(f"{replace_brackets(m[0])}: {f"{replace_brackets(m[0])}Config,"}" for m in config_object_strings)}
        }}
        
        export const TopLevelModels = [{", ".join(f'"{subclass.__name__}"' for subclass in BaseNode.__subclasses__())}]
    """

    typescript_file.write_text(file_contents)
    try:
        os.system(f"bunx prettier {typescript_file.absolute()} --write > /dev/null")
    except Exception:
        print("[red]File formatter could not be run[/red]")
