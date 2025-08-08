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


export type BaseNodeTypes = {{base_node_types}};

export type ReifiedRelationTypes = {{reified_relation_types}};

export type TraitTypes = {{trait_types}};

export type SemanticSpaceTypes = {{semantic_space_types}};

export type EdgeModelTypes = {{edge_model_types}};

export type MultiKeyFieldTypes = {{multikey_field_types}};


export type AllModelTypesUnion =
  | BaseNodeTypes
  | ReifiedRelationTypes
  | TraitTypes
  | SemanticSpaceTypes
  | EdgeModelTypes
  | MultiKeyFieldTypes;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
type UnionToArray<T, A extends unknown[] = []> =
  IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

export type AllModelTypes = UnionToArray<AllModelTypesUnion>;