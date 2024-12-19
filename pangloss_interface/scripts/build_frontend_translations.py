import json
import os
from collections import defaultdict

from humps import camelize


def infinite_defaultdict():
    return defaultdict(infinite_defaultdict)


def build_frontend_translations(
    project_name, interface_path, pangloss_interface_translations_dir
):
    with open(os.path.join(project_name, "translation.json")) as f:
        per_model_dict = json.loads(f.read())

    lang_dicts = infinite_defaultdict()
    # Flip the translation dicts inside out (i.e. per language), not per model
    # as in the project translation.json file
    for model_name, model_part_dict in per_model_dict.items():
        for model_part, part_translation_dicts in model_part_dict.items():
            for lang, lang_translation_dict in part_translation_dicts.items():
                lang_dicts[lang.lower()][model_name][model_part] = lang_translation_dict

    print(os.listdir(pangloss_interface_translations_dir))

    for filename in os.listdir(pangloss_interface_translations_dir):
        if filename.endswith(".json"):
            lang = filename.replace(".json", "")
            with open(os.path.join(pangloss_interface_translations_dir, filename)) as f:
                lang_dict = json.loads(f.read())
                lang_dicts[lang.lower()]["interface"] = lang_dict

    FILE_PATH = os.path.join(interface_path, "translations.ts")
    with open(FILE_PATH, "w") as f:
        for lang, lang_dict in lang_dicts.items():
            camelized_lang_dict = {
                key: camelize(value) for key, value in lang_dict.items()
            }
            f.write(
                f"""const {lang.lower()}_dict{": Dict" if lang != "en" else ""} = {json.dumps(camelized_lang_dict, ensure_ascii=False)};\n"""
            )

        f.write("\n\ntype Dict = typeof en_dict;")

        f.write(
            f"""\n\nexport const dictionaries = {{{
                ",\n".join(f"{lang.lower()}: {lang.lower()}_dict" for lang in lang_dicts)
            }}};
            """
        )

    os.system(f"bunx prettier {FILE_PATH} --write")
