import shutil
import subprocess
from pathlib import Path

from pangloss.cli.utils import get_project_path
from pangloss.exceptions import PanglossConfigError
from rich import print
from rich.panel import Panel
from typer import Typer

from pangloss_interface.generate_config.gather_custom_components import (
    gather_custom_components,
)
from pangloss_interface.generate_config.generate_config import generate_config_files
from pangloss_interface.generate_config.generate_translation import (
    generate_translation_files,
)

cli = Typer(name="interface")


@cli.command("gather-custom-components")
def gathercustomcomponents():
    gather_custom_components()


@cli.command("generate-translation-files")
def gentranslation():
    generate_translation_files()


@cli.command("generate-config")
def genconfig():
    generate_config_files()


@cli.command("dev")
def dev():
    process = subprocess.Popen("bun dev", shell=True, cwd=Path(__file__).parent)
    while True:
        try:
            pass
        except KeyboardInterrupt:
            process.kill()


@cli.command("build")
def build():
    print(
        "\n",
        Panel(
            "[bold green]Building Pangloss interface[/bold green]",
            title="Building Pangloss Interface",
        ),
        "\n",
    )
    generate_config_files()

    print("\n\n")
    print("[green bold]Calling Bun to build interface...[/green bold]")
    process = subprocess.Popen("bun run build", shell=True, cwd=Path(__file__).parent)
    try:
        while process.poll() is None:
            pass
    except KeyboardInterrupt:
        process.kill()

    project_path = get_project_path()
    if not project_path:
        raise PanglossConfigError("Project Path not found")

    built_dir = Path(__file__).parent.joinpath(".output")

    m = __import__(project_path)

    destination = Path(m.__dict__["__file__"]).parent.joinpath(".interface")
    if destination.exists():
        shutil.rmtree(destination)

    print(
        f"[green bold]Moving generated interface files to {project_path}...[/green bold]"
    )

    shutil.copytree(built_dir, destination)

    print(
        "\n",
        Panel(
            "[bold green]Interface built![/bold green]",
            title="Building Pangloss Interface",
        ),
        "\n",
    )


@cli.command("serve")
def serve():
    project_path = get_project_path()
    if not project_path:
        raise PanglossConfigError("Project Path not found")
    m = __import__(project_path)
    interface_dir = Path(m.__dict__["__file__"]).parent.joinpath(".interface")

    if interface_dir.exists():
        process = subprocess.Popen(
            f"bun {interface_dir}/server/index.mjs",
            shell=True,
            # cwd=Path(__file__).parent,
        )
        try:
            while process.poll() is None:
                pass
        except KeyboardInterrupt:
            process.kill()

    else:
        print(
            "[red bold]Interface is not yet built. Run [blue bold]pangloss interface build[/blue bold].[/red bold]"
        )
    """ process = subprocess.Popen("bun run start", shell=True, cwd=Path(__file__).parent)
    while True:
        try:
            pass
        except KeyboardInterrupt:
            process.kill() """
