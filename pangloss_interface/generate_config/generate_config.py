from pathlib import Path

from pangloss import initialise_models

from pangloss_interface.generate_config.generate_model_fields_definitions import (
    generate_model_fields_definitions,
)
from pangloss_interface.generate_config.generate_typescript2 import generate_typescript


def generate_config_files():
    model_config_dir_path = Path(__file__).parent.parent.joinpath(".model-configs")
    if not model_config_dir_path.is_dir():
        model_config_dir_path.mkdir()

    initialise_models()
    # generate_validators(model_config_dir_path)
    generate_typescript(model_config_dir_path)
    generate_model_fields_definitions(model_config_dir_path)
