import typer

cli = typer.Typer(name="interface")


@cli.command(name="do-interface")
def do_interface():
    print("doing interface")
