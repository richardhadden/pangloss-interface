import * as v from 'valibot';

const EditHeadSetBaseSchema = v.object({ {% for field_name, valibot_type in edit_head_set_base.items() %}
	{{field_name}}: {{valibot_type}},{% endfor %}
});
  
const CreateBaseSchema = v.object({ {% for field_name, valibot_type in create_base.items() %}
	{{field_name}}: {{valibot_type}},{% endfor %}
});

{% for schema_name, schema in create_models.items() %}
const {{schema_name}} = v.intersect([
  CreateBaseSchema,
  v.object({ {% for field_name, valibot_type in schema.items() %}
		{{field_name}}: {{valibot_type}},{% endfor %}
  }),
]);
{% endfor %}