import re
from typing import TypedDict

from humps import camelize, pascalize
from pangloss.model_config.model_manager import ModelManager
from pangloss.models import (
    BaseNode,
    EdgeModel,
    ReifiedRelation,
    ReifiedRelationNode,
    SemanticSpace,
)
from pluralizer import Pluralizer


class FieldTranslation(TypedDict):
    verboseName: str
    verboseNamePlural: str
    helpText: str
    longDescription: str


class ModelOwnTranslation(TypedDict):
    verboseName: str
    verboseNamePlural: str
    helpText: str
    longDescription: str


# Key is the lang
type ModelOwnLanguage = dict[str, ModelOwnTranslation]

# Key is the lang
type FieldLanguage = dict[str, FieldTranslation]

type Fields = dict[str, FieldLanguage]


# Key is the model name
type AppTranslation = dict[str, dict]

type ModelTypes = type[
    BaseNode | ReifiedRelation | ReifiedRelationNode | EdgeModel | SemanticSpace
]

pluralizer = Pluralizer()


def to_space_separated_string(string: str) -> str:
    return re.sub(r"((?<=[a-z])[A-Z]|(?<!\A)[A-Z](?=[a-z]))", r" \1", string)


def generate_translation(model: ModelTypes, languages: list[str]) -> dict:
    model_language_translation = {}

    for lang in languages:
        if lang == "en":
            model_own_translation: ModelOwnTranslation = {
                "verboseName": to_space_separated_string(model.__name__),
                "verboseNamePlural": pluralizer.pluralize(
                    to_space_separated_string(model.__name__)
                ),
                "helpText": f"<p>{str(model.__doc__) if model.__doc__ else ''}</p>",
                "longDescription": f"<p>{str(model.__doc__) if model.__doc__ else ''}</p>",
            }
        else:
            model_own_translation = {
                "verboseName": "",
                "verboseNamePlural": "",
                "helpText": "<p></p>",
                "longDescription": "<p></p>",
            }
        model_language_translation[lang] = model_own_translation

    fields_languages_translations: Fields = {}

    for field_defintition in model.__pg_field_definitions__:
        if field_defintition.field_name == "type":
            continue

        field_name = camelize(field_defintition.field_name)
        fields_languages_translations[field_name] = {}
        for lang in languages:
            if lang == "en":
                fields_languages_translations[field_name][lang] = {
                    "verboseName": to_space_separated_string(
                        pascalize(field_defintition.field_name)
                    ),
                    "verboseNamePlural": pluralizer.pluralize(
                        to_space_separated_string(
                            pascalize(field_defintition.field_name)
                        )
                    ),
                    "helpText": "<p></p>",
                    "longDescription": "<p></p>",
                }
            else:
                fields_languages_translations[field_name][lang] = {
                    "verboseName": "",
                    "verboseNamePlural": "",
                    "helpText": "",
                    "longDescription": "",
                }

    translation = {
        "_model": model_language_translation,
        **fields_languages_translations,
    }

    return translation


def generate_blank_translation_for_app(
    app, default_language: str, languages: list[str]
) -> AppTranslation:
    # Get the models for this app by checking whether the app name
    # is in the module name for the model (model.__module__ == "<app_name>.models")

    models = {}

    for model_name, model in ModelManager.base_models.items():
        models[model_name] = model

    for model_name, model in ModelManager.semantic_space_models.items():
        if not model.__pydantic_generic_metadata__["origin"]:
            models[model_name] = model

    for model_name, model in ModelManager.reified_relation_models.items():
        models[model_name] = model

    for model_name, model in ModelManager.edge_models.items():
        models[model_name] = model

    for model_name, model in ModelManager.multikeyfields_models.items():
        models[model_name] = model

    models_for_app = {
        model_name: model
        for model_name, model in models.items()
        if app in model.__module__
    }

    app_translation: AppTranslation = {}

    all_langs = [default_language, *languages]

    for model_name, model in models_for_app.items():
        model_translation = generate_translation(model, all_langs)

        app_translation[model_name] = model_translation

    return dict(sorted(app_translation.items(), key=lambda o: o[0]))
