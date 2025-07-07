import json
import os
from collections import defaultdict
from pathlib import Path

from pangloss.cli.utils import get_project_path
from pangloss.exceptions import PanglossConfigError
from pangloss.initialisation import get_project_settings
from rich import print


def iter_translation_files(apps):
    for app in apps:
        m = __import__(app)
        translations_path = (
            Path(m.__path__[0]).joinpath("translations").joinpath("translations.json")
        )

        if translations_path.exists() and translations_path.is_file:
            yield json.loads(translations_path.read_text())


def generate_translation_dicts(model_config_dir: Path):
    project_path = get_project_path()
    if not project_path:
        raise PanglossConfigError("Project Path not found")
    settings = get_project_settings(project_path)

    translation_dir = model_config_dir.joinpath("model-translations")
    translation_dir.mkdir(exist_ok=True)

    translation_dicts = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))

    for translation_dict in iter_translation_files(settings.INSTALLED_APPS):
        for model_name, model_trans in translation_dict.items():
            # print("model_name", model_name)
            for field, m in model_trans.items():
                # print("field", field)
                for lang, f in m.items():
                    # print("lang", lang, f)
                    translation_dicts[lang][model_name][field] = f

    for lang, translation in translation_dicts.items():
        file_path = translation_dir.joinpath(f"{lang}.ts")
        file_path.write_text(f"export const {lang} = {json.dumps(translation)}")

        try:
            os.system(f"bunx prettier {file_path.absolute()} --write > /dev/null")
        except Exception:
            print("[red]File formatter could not be run[/red]")
