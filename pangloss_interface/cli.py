import subprocess
from pathlib import Path

from pangloss.model_config.model_manager import ModelManager
from typer import Typer

from pangloss_interface.generate_configs.build_typescript_types import (
    build_typescript_types,
)
from pangloss_interface.generate_configs.utils import build_tailwind_imports

INTERFACE_APP_PATH = Path(__file__).parent.joinpath("interface_app")

cli = Typer(name="interface")


@cli.command("build-types")
def build_types():
    ModelManager.initialise_models()
    build_typescript_types()


@cli.command("dev")
def dev():
    build_tailwind_imports()
    process = subprocess.Popen("bun dev", shell=True, cwd=INTERFACE_APP_PATH)
    while True:
        try:
            pass
        except KeyboardInterrupt:
            process.kill()


'''
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
'''
