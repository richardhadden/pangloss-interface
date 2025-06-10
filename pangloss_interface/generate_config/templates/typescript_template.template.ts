import { ulid } from "ulid";

type EditHeadSetBase = { {% for field_name, typescript_def in edit_head_set_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};

type EditSetBase = { {% for field_name, typescript_def in edit_set_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};
  
type CreateBase = { {% for field_name, typescript_def in create_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};

type HeadViewBase = { {% for field_name, typescript_def in head_view_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};

type ViewBase = { {% for field_name, typescript_def in view_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};

type ReifiedCreateBase = { {% for field_name, typescript_def in reified_create_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type ReifiedViewBase = { {% for field_name, typescript_def in reified_view_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type ReifiedEditSetBase = { {% for field_name, typescript_def in reified_edit_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};


type EmbeddedCreateBase = { {% for field_name, typescript_def in embedded_create_base.items() %}
	{{field_name}}: {{typescript_def}},{% endfor %}
};

type ReferenceSetBase = { {% for field_name, typescript_def in reference_set_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type ReferenceCreateBase = { {% for field_name, typescript_def in reference_create_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type ReferenceViewBase = { {% for field_name, typescript_def in reference_view_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};


type SemanticSpaceCreateBase = { {% for field_name, typescript_def in semantic_space_create_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type SemanticSpaceViewBase = { {% for field_name, typescript_def in semantic_space_create_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};

type SemanticSpaceEditSetBase = { {% for field_name, typescript_def in semantic_space_edit_set_base.items() %}
  {{field_name}}: {{typescript_def}},{% endfor %}
};


{% for model_name, typescript_def in semantic_space_create.items() %}
type {{model_name}}Create<T> = SemanticSpaceCreateBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in semantic_space_create.items() %}
type {{model_name}}View<T> = SemanticSpaceViewBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in semantic_space_create.items() %}
type {{model_name}}EditSet<T> = SemanticSpaceEditSetBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}


{% for model_name, typescript_def in reference_set_models.items() %}
type {{model_name}}ReferenceSet = ReferenceSetBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for via_model_name, (model_name, edge_model_name) in reference_set_via.items() %}
type {{via_model_name}} = {{model_name}}ReferenceSet &  {
  "edge_properties": {{edge_model_name}}
};
{% endfor %}

{% for model_name, typescript_def in reference_create_models.items() %}
type {{model_name}}ReferenceCreate = ReferenceCreateBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in reference_set_models.items() %}
type {{model_name}}ReferenceView = ReferenceViewBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in create_models.items() %}
type {{model_name}}Create = CreateBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in reified_create_models.items() %}
type {{model_name}}Create = ReifiedCreateBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}


{% for model_name, typescript_def in reified_view_models.items() %}
type {{model_name}}View = ReifiedViewBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in reified_view_models.items() %}
type {{model_name}}EditSet = ReifiedEditSetBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in head_view_models.items() %}
type {{model_name}}HeadView = HeadViewBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in edit_head_set_models.items() %}
type {{model_name}}EditHeadSet = EditHeadSetBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in edit_head_set_models.items() %}
type {{model_name}}EditSet = EditSetBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in view_models.items() %}
type {{model_name}}View = ViewBase & { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in embedded_create_models.items() %}
type {{model_name}}EmbeddedCreate = EmbeddedCreateBase & {
{% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

{% for model_name, typescript_def in edge_models.items() %}
type {{model_name}} = { {% for field_name, typescript_type in typescript_def.items() %}
	{{field_name}}: {{typescript_type}},{% endfor %}
};
{% endfor %}

export type CreateTypes = {
  {% for model_name in create_models %}{{model_name}}: {{model_name}}Create,
  {% endfor %}
};

export type EditHeadSetTypes = {
  {% for model_name in create_models %}{{model_name}}: {{model_name}}EditHeadSet,
  {% endfor %}
};

export type EditSetTypes = {
  {% for model_name in create_models %}{{model_name}}: {{model_name}}EditSet,
  {% endfor %}
};

export type ReferenceSetTypes = {
  {% for model_name in reference_set_models %}{{model_name}}: {{model_name}}ReferenceSet,
  {% endfor %}
};

export type ReferenceCreateTypes = {
  {% for model_name in reference_create_models %}{{model_name}}: {{model_name}}ReferenceCreate,
  {% endfor %}
};

export type ReferenceViewTypes = {
  {% for model_name in reference_view_models %}{{model_name}}: {{model_name}}ReferenceView,
  {% endfor %}
};