import os
from pathlib import Path

import typer
from rich import print
from rich.panel import Panel

from pangloss.exceptions import PanglossConfigError
from pangloss_interface.scripts.build_frontend_translations import (
    build_frontend_translations,
)
from pangloss_interface.scripts.create_translation_file import (
    build_or_patch_translation_file,
)
from pangloss_interface.scripts.create_typescript_types import create_typescript_types

cli = typer.Typer(name="interface")


@cli.command(name="create-ts-types")
def create_ts_types():
    create_typescript_types()
    print(
        Panel(
            ("[bold green]Created Interface Typescript types![/bold green]"),
            title="[bold]Pangloss Interface[/bold]",
            subtitle="🍹",
            subtitle_align="right",
        )
    )


@cli.command()
def create_translation_file():
    from pangloss.cli.main import get_project_path, get_project_settings
    from pangloss.model_config.model_manager import ModelManager

    project = Path(get_project_path())
    settings = get_project_settings(str(project))

    ModelManager.initialise_models(_defined_in_test=True)
    build_or_patch_translation_file(project, settings)


@cli.command()
def install_translation_file():
    from pangloss.cli.main import get_project_path

    interface_dir = Path(os.path.realpath(__file__)).parent.parent

    generated_directory = interface_dir.joinpath(Path("src", "generated"))
    if not generated_directory.is_dir():
        raise PanglossConfigError(
            "Interface directory for generated TypeScript types (src/generated) is missing"
        )

    interface_translations_dir = interface_dir.joinpath(
        "pangloss_interface", "interface_translations"
    )

    project = Path(get_project_path())

    build_frontend_translations(
        project, generated_directory, interface_translations_dir
    )
