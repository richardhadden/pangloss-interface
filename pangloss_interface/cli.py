import subprocess
from pathlib import Path

from typer import Typer

from pangloss_interface.generate_config.generate_config import generate_config_files
from pangloss_interface.generate_config.generate_translation import (
    generate_translation_files,
)

cli = Typer(name="interface")


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
    process = subprocess.Popen("bun run build", shell=True, cwd=Path(__file__).parent)
    try:
        while process.poll() is None:
            pass
    except KeyboardInterrupt:
        process.kill()


@cli.command("serve")
def serve():
    process = subprocess.Popen("bun run start", shell=True, cwd=Path(__file__).parent)
    while True:
        try:
            pass
        except KeyboardInterrupt:
            process.kill()
