import inspect
import os
from collections import defaultdict
from pathlib import Path
from typing import Literal

from humps import camelize, pascalize
from jinja2 import Environment, PackageLoader
from pangloss.model_config.model_manager import AllModelTypes, ModelManager

from pangloss_interface.models import ComponentMapping


def get_component_mapping_keys(
    mapping: ComponentMapping, mapping_for: Literal["node"] | Literal["fields"]
):
    return [
        k for k in ComponentMapping.__annotations__.keys() if k.startswith(mapping_for)
    ]


def build_model_component_mapping(
    model_name: str, model: AllModelTypes, mapping: ComponentMapping
):
    module = inspect.getmodule(model)
    if not module:
        return None

    package = module.__package__

    package_path = os.path.abspath(package)

    mappings_file_path = Path(os.path.abspath(__file__)).parent.parent.joinpath(
        ".model-configs", "custom-component-mappings.ts"
    )
    relative_path = "/".join(
        os.path.relpath(package_path, mappings_file_path).split("/")[1:]
    )

    component_map: dict[str, ComponentMapping] = defaultdict(lambda: defaultdict(dict))  # type: ignore

    for key in get_component_mapping_keys(mapping, "node"):
        if path_string := mapping.get(key, None):
            component_map[camelize(key)] = (
                f"{pascalize(model_name)}{pascalize(key)}",
                str(Path(relative_path, "interface", "components", f"{path_string}")),
            )

    return component_map


def gather_custom_components():
    print("Gathering custom components")

    component_map = {}

    # Get .model-config folder path
    model_config_dir_path = Path(__file__).parent.parent.joinpath(".model-configs")
    if not model_config_dir_path.is_dir():
        model_config_dir_path.mkdir()

    # Iterate models and get the mappings, adding to component_map
    for model_name, model in ModelManager.all().items():
        if interface_meta := getattr(model, "InterfaceMeta", None):
            if interface_meta.components:
                component_map[model_name] = build_model_component_mapping(
                    model_name, model, interface_meta.components
                )

    # Write mappings to a file
    custom_component_mapping_file = model_config_dir_path.joinpath(
        "custom-component-mapping.ts"
    )

    env = Environment(
        loader=PackageLoader(
            "pangloss_interface", package_path=str(Path("generate_config", "templates"))
        )
    )

    template = env.get_template("custom_components_template.template.ts")

    custom_component_mapping_file.write_text(
        template.render(component_map=component_map)
    )
