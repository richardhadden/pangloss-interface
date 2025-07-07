import subprocess
from pathlib import Path

from pangloss.cli.main import get_project_path
from pangloss.exceptions import PanglossConfigError
from pangloss.initialisation import initialisation_task


@initialisation_task(run_in_dev=False)
def start_interface_server():
    print("HEY FROM INTERFACE")

    project_path = get_project_path()
    if not project_path:
        raise PanglossConfigError("Project Path not found")
    m = __import__(project_path)
    interface_dir = Path(m.__dict__["__file__"]).parent.joinpath(".interface")

    if interface_dir.exists():
        process = subprocess.Popen(
            f"bun {interface_dir}/server/index.mjs &",
            cwd=Path(m.__dict__["__file__"]).parent,
            shell=True,
            close_fds=True,
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
