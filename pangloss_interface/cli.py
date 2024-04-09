from typer import Typer

from pangloss_core.cli.main import Project

from pangloss_interface.frontend_types.build_frontend_types import (
    build_frontend_type_file,
)

cli = Typer(name="interface")


@cli.command()
def build_frontend_types(project: Project):
    build_frontend_type_file()
