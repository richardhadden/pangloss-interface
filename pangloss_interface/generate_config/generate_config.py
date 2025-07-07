from pathlib import Path

from pangloss import initialise_models
from rich import print

from pangloss_interface.generate_config.generate_model_fields_definitions import (
    generate_model_fields_definitions,
)
from pangloss_interface.generate_config.generate_translation import (
    generate_translation_files,
)
from pangloss_interface.generate_config.generate_translation_dicts import (
    generate_translation_dicts,
)
from pangloss_interface.generate_config.generate_typescript2 import generate_typescript


def generate_config_files():
    model_config_dir_path = Path(__file__).parent.parent.joinpath(".model-configs")
    if not model_config_dir_path.is_dir():
        model_config_dir_path.mkdir()

    print("[green]Initialising models...[/green]")
    initialise_models()
    # generate_validators(model_config_dir_path)
    print("[green]Generating TypeScript definitions...[/green]")
    generate_typescript(model_config_dir_path)
    print("[green]Generating model definitions...[/green]")
    generate_model_fields_definitions(model_config_dir_path)
    print("[green]Rebuilding app translation files...[/green]")
    generate_translation_files()
    print("[green]Bundling translation files...[/green]")
    generate_translation_dicts(model_config_dir_path)

    print("[green]Done 😊[/green]")
