import {
  BaseNodeTypes,
  EdgeModelTypes,
  ReifiedRelationTypes,
  SemanticSpaceTypes,
  TraitTypes,
} from "./model-typescript";

type TSubtypeHierarchy<Types extends string> = {
  [key in Types]?: TSubtypeHierarchy<Types> | {};
};

type TMeta<T extends BaseNodeTypes> = {
  baseModel: T;
  supertypes: BaseNodeTypes[];
  traits: TraitTypes[];
  abstract: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
  search: boolean;
  createByReference: boolean;
  labelField: string | null;
  subtypes: BaseNodeTypes[];
  subtypeHierarchy: TSubtypeHierarchy<BaseNodeTypes>;
  orderFields: string[];
};

type TSemanticSpaceMeta<T extends SemanticSpaceTypes> = {
  metatype: "SemanticSpace";
  baseModel: T;
  supertypes: SemanticSpaceTypes[];

  abstract: boolean;
  canNest: boolean;

  subtypes: SemanticSpaceTypes[];
  subtypeHierarchy: TSubtypeHierarchy<SemanticSpaceTypes>;
};

type TReifiedRelation<T extends ReifiedRelationTypes> = {
  meta: TReifiedRelationMeta<T>;
  fields: TFields;
};

type TReifiedRelationMeta<T extends ReifiedRelationTypes> = {
  metatype: "ReifiedRelation" | "ReifiedRelationNode";
  baseModel: T;
};

type TEdgeModelMeta<T extends EdgeModelTypes> = {
  metatype: "EdgeModel";
  baseModel: T;
};

type TBaseNode<T extends BaseNodeTypes> = {
  meta: TMeta<T>;
  fields: TFields;
  incomingFields: { [key: string]: { types: TRelationFieldDefinition[] } };
};

type TSemanticSpace<T extends SemanticSpaceTypes> = {
  meta: TSemanticSpaceMeta<T>;
  fields: TFields;
};

type TEdgeModel<T extends EdgeModelTypes> = {
  meta: TEdgeModelMeta<T>;
  fields: TFields;
};

type TFields = {
  [key: string]: TFieldDefinition;
};

type TValidators = {
  Ge?: Number;
  Le?: Number;
  Gt?: Number;
  Lt?: Number;
  MaxLen?: Number;
  MinLen?: Number;
};

type TLiteralFieldTypes =
  | "int"
  | "string"
  | "float"
  | "boolean"
  | "null"
  | "date"
  | "datetime";

type TLiteralFieldDefinition = {
  metatype: "LiteralField";
  type: TLiteralFieldTypes;
  validators: TValidators;
};

type TRelationFieldDefinition = {
  metatype: "RelationField";
  types: TRelationDefinition[];
  edgeModel: EdgeModelTypes | null;
  createInline: boolean;
  editInline: boolean;
  validators: {};
  name: string;
  relationLabels: string[];
  reverseName: string;
  reverseRelationLabels: string[];
  defaultReifiedType: ReifiedRelationTypes | null;
  defaultSearchType: (BaseNodeTypes | TraitTypes)[];
  defaultTypeOnSelection: {
    [key in BaseNodeTypes]?: BaseNodeTypes | ReifiedRelationTypes | null;
  };
  bind_fields_to_related: [];
};

type TEnumFieldDefinition = {
  metatype: "EnumField";
  enumValues: (number | string)[];
};

type TListFieldDefinition = {
  metatype: "ListField";
  validators: TValidators;
  internalTypeValidators: TValidators;
  type: TLiteralFieldTypes;
};

type TMultiKeyFieldDefinition = {
  metatype: "MultiKeyField";
  types: TMultikeyFieldKeys;
};

type TMultikeyFieldKeys = {
  [key: Exclude<string, "metatype">]: {
    type: TLiteralFieldTypes;
    validators?: TValidators;
  };
};

type TEmbeddedFieldDefinition = {
  metatype: "EmbeddedField";
  types: BaseNodeTypes[];
};

//type TMultikeyFieldDefinition = IMultikeyFieldKeys & IMultikeyFieldDef;

type TFieldDefinition =
  | TListFieldDefinition
  | TEnumFieldDefinition
  | TLiteralFieldDefinition
  | TRelationFieldDefinition
  | TMultiKeyFieldDefinition
  | TEmbeddedFieldDefinition;

/* Relation Definition Types */
interface IRelationToNodeDefinition {
  metatype: "RelationToNode";
  type: BaseNodeTypes;
}

interface TTypeParamsToTypeMap {
  [key: string]: {
    typeParam: string;
    types: TRelationDefinition[];
  };
}

interface IRelationToReified {
  metatype: "RelationToReified";
  type: ReifiedRelationTypes;
  typeParamsToTypeMap: TTypeParamsToTypeMap;
}

interface IRelationToTypeVar {
  metatype: "RelationToTypeVar";
  type: string;
  typeVarName: string;
}

interface ISemanticSpaceTypes {
  baseType: SemanticSpaceTypes;
  typeParamsToTypeMap: TTypeParamsToTypeMap;
}

interface IRelationToSemanticSpace {
  metatype: "RelationToSemanticSpace";
  baseType: SemanticSpaceTypes;
  types: ISemanticSpaceTypes[];
}

type TRelationDefinition =
  | IRelationToNodeDefinition
  | IRelationToReified
  | IRelationToSemanticSpace
  | IRelationToTypeVar;

{% for k, v in model_definitions.items() %}
const {{k}}: TBaseNode<"{{k}}"> = {{v}};
{% endfor %}

export const ModelDefinitionMap = {
  {% for k, v in model_definitions.items() %}{{k}}: {{k}},
  {% endfor %}
}

{% for k, v in reified_relation_definitions.items() %}
const {{k}}: TReifiedRelation<"{{k}}"> = {{v}};
{% endfor %}

export const ReifiedRelationsDefinitionMap = {
  {% for k, v in reified_relation_definitions.items() %}{{k}}: {{k}},
  {% endfor %}
}

{% for k, v in semantic_space_definitions.items() %}
const {{k}}: TSemanticSpace<"{{k}}"> = {{v}};
{% endfor %}

export const SemanticSpaceDefinitionMap = {
  {% for k, v in semantic_space_definitions.items() %}{{k}}: {{k}},
  {% endfor %}
}

{% for k, v in edge_model_definitions.items() %}
const {{k}}: TEdgeModel<"{{k}}"> = {{v}};
{% endfor %}

export const EdgeModelDefinitionMap = {
  {% for k, v in edge_model_definitions.items() %}{{k}}: {{k}},
  {% endfor %}
}

export const ModelDefinitions = {...ModelDefinitionMap, ...SemanticSpaceDefinitionMap, ...ReifiedRelationsDefinitionMap, ...EdgeModelDefinitionMap};