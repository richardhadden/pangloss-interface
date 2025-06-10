import datetime
import types
import typing
from pathlib import Path
from types import SimpleNamespace

import pydantic
from humps import camelize
from jinja2 import Environment, PackageLoader
from pangloss.model_config.field_definitions import (
    EmbeddedFieldDefinition,
    FieldDefinition,
    MultiKeyFieldDefinition,
    PropertyFieldDefinition,
    RelationFieldDefinition,
)
from pangloss.model_config.model_manager import ModelManager
from pangloss.model_config.model_setup_functions.utils import (
    get_concrete_model_types,
    get_root_semantic_space_subclasses,
)
from pangloss.model_config.models_base import (
    CreateBase,
    EdgeModel,
    EditHeadSetBase,
    EditSetBase,
    EmbeddedCreateBase,
    HeadViewBase,
    ReferenceCreateBase,
    ReferenceSetBase,
    ReferenceViewBase,
    ReifiedCreateBase,
    ReifiedRelationEditSetBase,
    ReifiedRelationViewBase,
    RootNode,
    SemanticSpace,
    SemanticSpaceCreateBase,
    SemanticSpaceViewBase,
    ViewBase,
)
from ulid import ULID

env = Environment(
    loader=PackageLoader(
        "pangloss_interface", package_path=str(Path("generate_config", "templates"))
    )
)

template = env.get_template("typescript_template.template.ts")


prop_types = SimpleNamespace()

prop_types.type_alias = typing.TypeAliasType
prop_types.str = str
prop_types.ulid = ULID
prop_types.generic_alias = types.GenericAlias
prop_types.union = types.UnionType
prop_types.list = list
prop_types.literal = typing.Literal
prop_types.int = int
prop_types.float = float
prop_types.bool = bool
prop_types.none = types.NoneType
prop_types.datetime = datetime.datetime
prop_types.date = datetime.date
prop_types.uri = pydantic.AnyHttpUrl


reified_relation_instantiations = set()
semantic_space_instantiations = set()
embedded_instantiations = set()
reference_set_via_instantiations = set()
view_instantiations = set()


def remove_brackets(string: str) -> str:
    return string.replace("[", "__").replace("]", "__")


def map_types(t, field_name: str) -> str:
    if field_name == "type":
        """ print(
            t,
            type(t),
        ) """

    match t:
        case _ if typing.get_origin(t) == typing.Literal:
            return f'"{typing.get_args(t)[0]}"'
        case prop_types.uri:
            return "string"
        case prop_types.generic_alias():
            return f"({map_types(t.__args__[0], field_name)})[]"
        case _ if type(t) is types.UnionType:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.union():
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case prop_types.type_alias() if t.__name__ == "ULID":
            return "string"
        case prop_types.str:
            return "string"
        case prop_types.int:
            return "number"
        case prop_types.float:
            return "number"
        case prop_types.bool:
            return "boolean"
        case prop_types.none:
            return "null"
        case prop_types.date:
            return "Date"
        case prop_types.datetime:
            return "Date"
        case _ if typing.get_origin(t) is typing.Union:
            options = [map_types(x, field_name) for x in typing.get_args(t)]
            return f"{' | '.join(options)}"
        case _:
            print(typing.get_origin(t), typing.get_args(t), type(t))
            return f"<!!!ERROR - NO TYPE MATCH {t} {type(t)}!!!>"


def build_multikeyvalue_field(fd: MultiKeyFieldDefinition) -> str:
    base_fields = [
        f"{k}: {map_types(v.annotation, fd.field_name)}"
        for k, v in fd.multi_key_field_type.model_fields.items()
        if k != "value"
    ]
    return f"{{value: {map_types(fd.multi_key_field_value_type, fd.field_name)}, {', '.join(base_fields)}}}"


def build_relation_field_for_create(
    fd: RelationFieldDefinition, model_name: str
) -> str:
    types = []

    for relation_definition in fd.relations_to_node:
        if fd.create_inline:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                types.append(f"{ct.__name__}Create")

        else:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                if fd.edge_model:
                    types.append(
                        f"{ct.__name__}ReferenceSet__via__{fd.edge_model.__name__}"
                    )

                    reference_set_via_instantiations.add((ct, fd.edge_model))
                else:
                    types.append(f"{ct.__name__}ReferenceSet")
                    if (
                        ct._meta.create_by_reference
                        and ct._meta.create
                        and not ct._meta.abstract
                    ):
                        types.append(f"{ct.__name__}ReferenceCreate")

    for relation_definition in fd.relations_to_reified:
        for ct in get_concrete_model_types(
            relation_definition.annotated_type, include_subclasses=True
        ):
            types.append(f"{remove_brackets(ct.__name__)}Create")
            reified_relation_instantiations.add(ct)

    for relation_definition in fd.relations_to_semantic_space:
        params = (
            relation_definition.origin_type.__pydantic_generic_metadata__["parameters"],
        )

        for ct in get_root_semantic_space_subclasses(
            relation_definition.origin_type,
        ):
            typed_args = get_concrete_model_types(
                relation_definition.type_params_to_type_map["T"].type
            )

            types.append(
                f"{remove_brackets(ct.__name__)}Create<{' | '.join(f'{t.__name__}Create' for t in typed_args)}>"
            )

            semantic_space_instantiations.add(ct)

    return f"""({" | ".join(types)})[]"""


def build_relation_field_for_edit(fd: RelationFieldDefinition, model_name: str) -> str:
    types = []

    for relation_definition in fd.relations_to_node:
        if fd.create_inline:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                types.append(f"{ct.__name__}EditSet")
                types.append(f"{ct.__name__}Create")

        else:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                if fd.edge_model:
                    types.append(
                        f"{ct.__name__}ReferenceSet__via__{fd.edge_model.__name__}"
                    )

                    reference_set_via_instantiations.add((ct, fd.edge_model))
                else:
                    types.append(f"{ct.__name__}ReferenceSet")
                    if (
                        ct._meta.create_by_reference
                        and ct._meta.create
                        and not ct._meta.abstract
                    ):
                        types.append(f"{ct.__name__}ReferenceCreate")

    for relation_definition in fd.relations_to_reified:
        for ct in get_concrete_model_types(
            relation_definition.annotated_type, include_subclasses=True
        ):
            types.append(f"{remove_brackets(ct.__name__)}EditSet")
            types.append(f"{remove_brackets(ct.__name__)}Create")
            reified_relation_instantiations.add(ct)

    for relation_definition in fd.relations_to_semantic_space:
        params = (
            relation_definition.origin_type.__pydantic_generic_metadata__["parameters"],
        )

        for ct in get_root_semantic_space_subclasses(
            relation_definition.origin_type,
        ):
            typed_args = get_concrete_model_types(
                relation_definition.type_params_to_type_map["T"].type
            )

            types.append(
                f"{remove_brackets(ct.__name__)}Create<{' | '.join(f'{t.__name__}Create' for t in typed_args)}>"
            )

            types.append(
                f"{remove_brackets(ct.__name__)}EditSet<{' | '.join(f'{t.__name__}Create | {t.__name__}EditSet' for t in typed_args)}>"
            )

            semantic_space_instantiations.add(ct)

    return f"""({" | ".join(types)})[]"""


def build_relation_field_for_view(fd: RelationFieldDefinition, model_name: str) -> str:
    types = []

    for relation_definition in fd.relations_to_node:
        if fd.create_inline:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                types.append(f"{ct.__name__}View")
                view_instantiations.add(ct)

        else:
            for ct in get_concrete_model_types(
                relation_definition.annotated_type, include_subclasses=True
            ):
                if fd.edge_model:
                    types.append(
                        f"{ct.__name__}ReferenceView__via__{fd.edge_model.__name__}"
                    )

                    # reference_set_via_instantiations.add((ct, fd.edge_model))
                else:
                    types.append(f"{ct.__name__}ReferenceView")

    for relation_definition in fd.relations_to_reified:
        for ct in get_concrete_model_types(
            relation_definition.annotated_type, include_subclasses=True
        ):
            types.append(f"{remove_brackets(ct.__name__)}View")
            reified_relation_instantiations.add(ct)

    for relation_definition in fd.relations_to_semantic_space:
        params = (
            relation_definition.origin_type.__pydantic_generic_metadata__["parameters"],
        )

        for ct in get_root_semantic_space_subclasses(
            relation_definition.origin_type,
        ):
            typed_args = get_concrete_model_types(
                relation_definition.type_params_to_type_map["T"].type
            )

            types.append(
                f"{remove_brackets(ct.__name__)}View<{' | '.join(f'{t.__name__}View' for t in typed_args)}>"
            )

            semantic_space_instantiations.add(ct)

    return f"""({" | ".join(types)})[]"""


def build_relation_field_for_embedded_create(
    fd: EmbeddedFieldDefinition, model_name: str
) -> str:
    types = []
    for ct in get_concrete_model_types(fd.field_annotation):
        types.append(f"{ct.__name__}EmbeddedCreate")
        embedded_instantiations.add(ct)

    return f"""({" | ".join(types)})[]"""


def generate_typescript_definition(
    model: type[RootNode | EdgeModel | SemanticSpace],
    fd: FieldDefinition,
    def_type: typing.Literal["Create"]
    | typing.Literal["View"]
    | typing.Literal["Edit"],
) -> str:
    match fd:
        case RelationFieldDefinition():
            # print("relationfielddefintion", fd.field_name)
            if def_type == "Create":
                return build_relation_field_for_create(fd, model.__name__)
            if def_type == "View":
                return build_relation_field_for_view(fd, model.__name__)
            if def_type == "Edit":
                return build_relation_field_for_edit(fd, model.__name__)
        case EmbeddedFieldDefinition():
            return build_relation_field_for_embedded_create(fd, model.__name__)
        case PropertyFieldDefinition(field_annotation=t):
            return map_types(t, field_name=fd.field_name)
        case MultiKeyFieldDefinition():
            return build_multikeyvalue_field(fd)
        case _:
            pass


def generate_base_typescript(base_type):
    fields: dict[str, str] = {}
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_semantic_space_create_base_typescript(base_type):
    fields: dict[str, str] = {}

    fields["contents"] = "(CreateBase)[]"
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_model_create_typescript(
    model: type[RootNode] | type[SemanticSpace],
):
    fields: dict[str, str] = {}
    for field_definition in model._meta.fields:
        fields[camelize(field_definition.field_name)] = generate_typescript_definition(
            model, field_definition, "Create"
        )

    return fields


def generate_semantic_space_create_typescript(
    model: type[RootNode] | type[SemanticSpace],
):
    fields: dict[str, str] = {}
    fields["contents"] = "T[]"
    for field_definition in model._meta.fields:
        if field_definition.field_name != "contents":
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "Create")
            )

    return fields


def generate_semantic_space_view_base_typescript(base_type):
    fields: dict[str, str] = {}
    fields["id"] = "string"
    fields["contents"] = "(ViewBase)[]"
    for field_name, field_definition in base_type.model_fields.items():
        fields[camelize(field_name)] = map_types(
            field_definition.annotation, field_name
        )

    return fields


def generate_model_reference_set_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.ReferenceSet.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "Create")
            )

    return fields


def generate_model_reference_view_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.ReferenceView.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "View")
            )

    return fields


def generate_edge_model_typescript(model: type[EdgeModel]):
    fields: dict[str, str] = {}
    for field_definition in model.__pg_field_definitions__:
        fields[camelize(field_definition.field_name)] = generate_typescript_definition(
            model, field_definition, "Create"
        )

    return fields


def generate_model_reference_create_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    assert model.ReferenceCreate
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.ReferenceCreate.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "Create")
            )

    return fields


def generate_model_head_view_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    assert model.HeadView
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.HeadView.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "View")
            )
    for (
        incoming_name,
        incoming_rel_definitions,
    ) in model._meta.fields.reverse_relations.items():
        fields[camelize(incoming_name)] = " | ".join(
            generate_typescript_definition(
                model, incoming_rel_def.relation_definition, "View"
            )
            for incoming_rel_def in incoming_rel_definitions
        )

    return fields


def generate_model_head_edit_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    assert model.EditHeadSet
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.EditHeadSet.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "Edit")
            )

    return fields


def generate_model_view_typescript(model: type[RootNode]):
    fields: dict[str, str] = {}
    assert model.HeadView
    for field_definition in model._meta.fields:
        if field_definition.field_name in model.HeadView.model_fields:
            fields[camelize(field_definition.field_name)] = (
                generate_typescript_definition(model, field_definition, "View")
            )

    return fields


def generate_typescript(model_config_dir_path: Path):
    model_config_file_path = model_config_dir_path.joinpath("model-typescript.ts")

    semantic_space_create = {}
    for model_name, model in ModelManager.semantic_space_models.items():
        # print(model_name, model._meta, model.type)
        if not model._meta.abstract and model.type != "SemanticSpace":
            semantic_space_create[model.type] = (
                generate_semantic_space_create_typescript(model)
            )

    create_models = {}

    for model_name, model in ModelManager.base_models.items():
        create_models[f"{model_name}"] = generate_model_create_typescript(model)

    embedded_create_models = {}

    for model in embedded_instantiations:
        embedded_create_models[f"{model.__name__}"] = generate_model_create_typescript(
            model
        )

    reference_set_models = {}

    for model_name, model in ModelManager.base_models.items():
        reference_set_models[f"{(model_name)}"] = (
            generate_model_reference_set_typescript(model)
        )

    head_view_models = {}

    for model_name, model in ModelManager.base_models.items():
        head_view_models[f"{(model_name)}"] = generate_model_head_view_typescript(model)

    edit_head_set_models = {}
    for model_name, model in ModelManager.base_models.items():
        edit_head_set_models[f"{(model_name)}"] = generate_model_head_edit_typescript(
            model
        )

    reference_view_models = {}

    for model_name, model in ModelManager.base_models.items():
        reference_view_models[f"{(model_name)}"] = (
            generate_model_reference_view_typescript(model)
        )

    reference_create_models = {}
    for model_name, model in ModelManager.base_models.items():
        if getattr(model, "ReferenceCreate"):
            reference_create_models[f"{(model_name)}"] = (
                generate_model_reference_create_typescript(model)
            )

    reified_create_models = {}
    for model in reified_relation_instantiations:
        reified_create_models[f"{remove_brackets(model.__name__)}"] = (
            generate_model_create_typescript(model)
        )

    reified_view_models = {}
    for model in reified_relation_instantiations:
        reified_view_models[f"{remove_brackets(model.__name__)}"] = (
            generate_model_create_typescript(model)
        )

    reified_edit_models = {}
    for model in reified_relation_instantiations:
        reified_edit_models[f"{remove_brackets(model.__name__)}"] = (
            generate_model_create_typescript(model)
        )

    view_models = {}
    for model in view_instantiations:
        view_models[model.__name__] = generate_model_view_typescript(model)

    edge_models = {}
    for edge_model_name, edge_model in ModelManager.edge_models.items():
        edge_models[f"{edge_model_name}"] = generate_edge_model_typescript(edge_model)

    reference_set_via = {}
    for model, edge_model in reference_set_via_instantiations:
        reference_set_via[
            f"{model.__name__}ReferenceSet__via__{edge_model.__name__}"
        ] = (
            model.__name__,
            edge_model.__name__,
        )

    model_config_file_path.write_text(
        template.render(
            create_base=generate_base_typescript(CreateBase),
            edit_head_set_base=generate_base_typescript(EditHeadSetBase),
            edit_set_base=generate_base_typescript(EditSetBase),
            reference_set_base=generate_base_typescript(ReferenceSetBase),
            reference_view_base=generate_base_typescript(ReferenceViewBase),
            reference_create_base=generate_base_typescript(ReferenceCreateBase),
            embedded_create_base=generate_base_typescript(EmbeddedCreateBase),
            reified_create_base=generate_base_typescript(ReifiedCreateBase),
            reified_view_base=generate_base_typescript(ReifiedRelationViewBase),
            reified_edit_base=generate_base_typescript(ReifiedRelationEditSetBase),
            head_view_base=generate_base_typescript(HeadViewBase),
            view_base=generate_base_typescript(ViewBase),
            semantic_space_create_base=generate_semantic_space_create_base_typescript(
                SemanticSpaceCreateBase
            ),
            semantic_space_view_base=generate_semantic_space_view_base_typescript(
                SemanticSpaceViewBase
            ),
            semantic_space_edit_set_base=generate_semantic_space_view_base_typescript(
                SemanticSpaceViewBase
            ),
            semantic_space_create=semantic_space_create,
            create_models=create_models,
            reified_create_models=reified_create_models,
            reified_view_models=reified_view_models,
            embedded_create_models=embedded_create_models,
            reference_view_models=reference_view_models,
            reference_set_models=reference_set_models,
            reference_set_via=reference_set_via,
            reference_create_models=reference_create_models,
            edge_models=edge_models,
            head_view_models=head_view_models,
            view_models=view_models,
            edit_head_set_models=edit_head_set_models,
            reified_edit_models=reified_edit_models,
        ),
    )
