import pathlib
import os

from rich import print
from typer import Typer

from pangloss_core.cli.main import Project
from pangloss_core.model_setup.model_manager import ModelManager

from pangloss_interface.frontend_types.build_frontend_types import (
    build_frontend_type_file,
)
from pangloss_interface.frontend_types.build_frontend_translations import (
    build_frontend_translations,
)

cli = Typer(name="interface")


@cli.command()
def build_frontend_types(project: Project):
    interface_path = os.path.join(
        pathlib.Path(os.path.realpath(__file__)).parent.parent,
        pathlib.Path("interface/"),
    )
    pangloss_interface_translations_dir = os.path.join(
        pathlib.Path(os.path.realpath(__file__)).parent.parent,
        pathlib.Path("pangloss_interface/interface_translations"),
    )

    print(
        f"Creating Interface configuration file for Project [green bold]{project}[/green bold] at path",
        interface_path,
        "\n\n",
    )
    build_frontend_type_file(str(project), interface_path)
    build_frontend_translations(
        project, interface_path, pangloss_interface_translations_dir
    )
