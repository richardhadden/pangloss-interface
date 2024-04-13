import pathlib
import os

from rich import print
from typer import Typer

from pangloss_core.cli.main import Project

from pangloss_interface.frontend_types.build_frontend_types import (
    build_frontend_type_file,
)

cli = Typer(name="interface")


@cli.command()
def build_frontend_types(project: Project):
    interface_path = os.path.join(
        pathlib.Path(os.path.realpath(__file__)).parent.parent,
        pathlib.Path("interface/"),
    )
    print(
        f"Creating Interface configuration file for Project [green bold]{project}[/green bold] at path",
        interface_path,
        "\n\n",
    )
    build_frontend_type_file(str(project), interface_path)
