{% for model_name, mapping in component_map.items() %}
{% for fieldName, item in mapping.items() %}
import {{item[0]}} from "{{item[1]}}";
{% endfor %}
{% endfor %}


export const customComponentMapping = {
{% for model_name, mapping in component_map.items() %}
    {{model_name}}: {
        {% for fieldName, item in mapping.items() %}
            {{fieldName}}: {{item[0]}},
        {% endfor %}
    },
{% endfor %}
}