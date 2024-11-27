import typer
from rich import print
from rich.panel import Panel

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
