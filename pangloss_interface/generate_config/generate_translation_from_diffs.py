import datetime
import json
from collections.abc import Hashable
from pathlib import Path
from typing import Any, Literal, TypedDict, cast

import patchdiff
from patchdiff.pointer import Pointer
from patchdiff.types import Diffable

from pangloss_interface.generate_config.generate_blank_translation import (
    generate_blank_translation_for_app,
)

type opTypes = Literal["add"] | Literal["replace"] | Literal["remove"]


class Patch(TypedDict):
    op: opTypes
    path: Pointer
    value: Any


def cast_int(i):
    try:
        return int(i)
    except ValueError:
        return i


def decode_pointer(path) -> list[Hashable]:
    return [cast_int(i) for i in path.split("/") if i]


def produce_new_version(
    start: dict,
    manual_ff: list[Patch],
    manual_patches: list[Patch],
    auto_ff: list[Patch],
    auto_patches: list[Patch],
) -> Diffable:
    manual_diffs_applied = patchdiff.apply(
        start,
        cast(
            list[dict[Any, Any]], [*auto_ff, *manual_ff, *manual_patches, *auto_patches]
        ),
    )
    # cast(dict, manual_diffs_applied).pop("", None)
    # return manual_diffs_applied
    return manual_diffs_applied


def generate_translation_from_diffs(
    app,
    default_language: str,
    languages: list[str],
    translation_file: Path,
    manual_diffs_path: Path,
    auto_diffs_path: Path,
):
    """
    1. Generate new translation N
    2. Fast-forward all auto diffs from blank -- gives a repr of what would have been there O
    3. Diff N and O (detects all auto changes) -- gives adds, removes, and changes


    4. Using method for producing final version, produce previous final version U
    5. Diff this with actual file to get user changes;


    6. Apply auto adds and removes
    7. Apply user changes on top
    """

    current_blank = generate_blank_translation_for_app(app, default_language, languages)

    auto_fast_forward_diffs: list[Patch] = []

    for file in sorted(auto_diffs_path.glob("*.json")):
        for op in json.loads(file.read_text()):
            auto_fast_forward_diffs.append(
                cast(
                    Patch,
                    {
                        **op,
                        "path": Pointer.from_str(op["path"]),
                    },
                )
            )

    previous_auto_version = patchdiff.apply(
        {}, cast(list[dict[Any, Any]], auto_fast_forward_diffs)
    )

    auto_changes, _ = patchdiff.diff(previous_auto_version, current_blank)

    auto_changes: list[Patch] = [
        {
            **op,
            "path": Pointer.from_str(op["path"])
            if isinstance(op["path"], str)
            else op["path"],
        }
        for op in auto_changes
    ]

    manual_fast_forward_diffs: list[Patch] = []

    for file in sorted(manual_diffs_path.glob("*.json")):
        for op in json.loads(file.read_text()):
            manual_fast_forward_diffs.append(
                cast(
                    Patch,
                    {
                        **op,
                        "path": Pointer.from_str(op["path"]),
                    },
                )
            )

    previous_version = produce_new_version(
        {},
        manual_ff=manual_fast_forward_diffs,
        manual_patches=[],
        auto_ff=auto_fast_forward_diffs,
        auto_patches=[],
    )

    current_file_version = json.loads(translation_file.read_text())

    manual_changes, _ = patchdiff.diff(previous_version, current_file_version)

    manual_replaces = [op for op in manual_changes if op["op"] == "replace"]

    new_version = produce_new_version(
        start={},
        manual_ff=manual_fast_forward_diffs,
        manual_patches=manual_replaces,
        auto_ff=auto_fast_forward_diffs,
        auto_patches=auto_changes,
    )

    if auto_changes:
        auto_diffs_path.joinpath(f"{str(datetime.datetime.now())}.json").write_text(
            patchdiff.to_json(auto_changes)
        )

    if manual_replaces:
        manual_diffs_path.joinpath(f"{str(datetime.datetime.now())}.json").write_text(
            patchdiff.to_json(manual_changes)
        )

    return dict(sorted(cast(dict, new_version).items(), key=lambda o: o[0]))
