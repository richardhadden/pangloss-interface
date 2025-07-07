import datetime
import json
from pathlib import Path

import patchdiff
from pangloss.cli.utils import get_project_path
from pangloss.exceptions import PanglossConfigError
from pangloss.initialisation import get_project_settings
from pangloss.model_config.model_manager import ModelManager

from pangloss_interface.generate_config.generate_blank_translation import (
    generate_blank_translation_for_app,
)
from pangloss_interface.generate_config.generate_translation_from_diffs import (
    generate_translation_from_diffs,
)


def is_empty(path: Path):
    return not bool(list(path.glob("*")))


def get_translation_folders_for_app(app, app_path) -> tuple[Path, Path, Path]:
    translation_path = Path(app_path).joinpath("translations")
    translation_path.mkdir(exist_ok=True)

    translation_diffs_path = translation_path.joinpath(".diffs")
    translation_diffs_path.mkdir(exist_ok=True)

    translation_diffs_manual_path = translation_diffs_path.joinpath("manual")
    translation_diffs_manual_path.mkdir(exist_ok=True)

    translation_diffs_auto_path = translation_diffs_path.joinpath("auto")
    translation_diffs_auto_path.mkdir(exist_ok=True)

    translation_file_path = translation_path.joinpath("translations.json")

    return (
        translation_file_path,
        translation_diffs_auto_path,
        translation_diffs_manual_path,
    )


def build_translation_files(
    app, app_path, default_language: str, languages: list[str]
) -> None:
    if app == "pangloss" or app == "pangloss_interface":
        return

    (
        translation_file_path,
        translation_diffs_auto_path,
        translation_diffs_manual_path,
    ) = get_translation_folders_for_app(app, app_path)

    # Check if we have a blank slate, in which case generate a blank file
    if (
        not translation_file_path.exists()
        and is_empty(translation_diffs_auto_path)
        and is_empty(translation_diffs_manual_path)
    ):
        blank_translation = generate_blank_translation_for_app(
            app, default_language, languages
        )
        translation_file_path.write_text(
            json.dumps(blank_translation, ensure_ascii=True, indent=4)
        )

        diff, _ = patchdiff.diff({}, blank_translation)
        translation_diffs_auto_path.joinpath(
            f"{str(datetime.datetime.now())}.json"
        ).write_text(patchdiff.to_json(diff))
        return
    else:
        translation = generate_translation_from_diffs(
            app,
            default_language,
            languages,
            translation_file_path,
            translation_diffs_manual_path,
            translation_diffs_auto_path,
        )
        translation_file_path.write_text(
            json.dumps(translation, ensure_ascii=True, indent=4)
        )


def generate_translation_files():
    project_path = get_project_path()
    if not project_path:
        raise PanglossConfigError("Project Path not found")

    settings = get_project_settings(project_path)

    default_language = settings.DEFAULT_INTERFACE_LANGUAGE or "en"
    languages = settings.INTERFACE_LANGUAGES or [default_language]

    loaded_apps = []
    for app in settings.INSTALLED_APPS:
        m = __import__(app)
        loaded_apps.append((app, m.__path__[0]))

    ModelManager.initialise_models()

    for app, app_path in loaded_apps:
        build_translation_files(app, app_path, default_language, languages)
