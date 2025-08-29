import {
  AllModelTypes,
  BaseNodeTypes,
  EdgeModelTypes,
  ReifiedRelationTypes,
  SemanticSpaceTypes,
  TraitTypes,
} from "./model-typescript";
import colors from "tailwindcss/colors";

export type TSubtypeHierarchy<Types extends string> = {
  [key in Types]?: TSubtypeHierarchy<Types> | {};
};

export type TMeta<T extends BaseNodeTypes> = {
  metatype: "BaseNode";
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
  colour: keyof typeof colors | null;
};

export type TSemanticSpaceMeta<T extends SemanticSpaceTypes> = {
  metatype: "SemanticSpace";
  baseModel: T;
  supertypes: SemanticSpaceTypes[];

  abstract: boolean;
  canNest: boolean;

  subtypes: SemanticSpaceTypes[];
  subtypeHierarchy: TSubtypeHierarchy<SemanticSpaceTypes>;
  colour: keyof typeof colors | null;
};

export type TReifiedRelation<T extends ReifiedRelationTypes> = {
  meta: TReifiedRelationMeta<T>;
  fields: TFields;
};

export type TReifiedRelationMeta<T extends ReifiedRelationTypes> = {
  metatype: "ReifiedRelation" | "ReifiedRelationNode";
  baseModel: T;
};

export type TEdgeModelMeta<T extends EdgeModelTypes> = {
  metatype: "EdgeModel";
  baseModel: T;
};

export type TBaseNode<T extends BaseNodeTypes> = {
  meta: TMeta<T>;
  fields: TFields;
  incomingFields: { [key: string]: { types: TRelationFieldDefinition[] } };
};

export type TSemanticSpace<T extends SemanticSpaceTypes> = {
  meta: TSemanticSpaceMeta<T>;
  fields: TFields;
};

export type TEdgeModel<T extends EdgeModelTypes> = {
  meta: TEdgeModelMeta<T>;
  fields: TFields;
};

export type TFields = {
  [key: string]: TFieldDefinition;
};

export type TValidators = {
  Ge?: number;
  Le?: number;
  Gt?: number;
  Lt?: number;
  MaxLen?: number;
  MinLen?: number;
};

export type TLiteralFieldTypes =
  | "int"
  | "string"
  | "float"
  | "boolean"
  | "null"
  | "date"
  | "datetime";

export type TLiteralFieldDefinition = {
  metatype: "LiteralField";
  type: TLiteralFieldTypes;
  validators: TValidators;
};

export type TRelationFieldDefinition = {
  metatype: "RelationField";
  types: TRelationDefinition[];
  edgeModel: EdgeModelTypes | null;
  createInline: boolean;
  editInline: boolean;
  validators: TValidators;
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

export type TEnumFieldDefinition = {
  metatype: "EnumField";
  enumValues: (number | string)[];
};

export type TListFieldDefinition = {
  metatype: "ListField";
  validators: TValidators;
  internalTypeValidators: TValidators;
  type: TLiteralFieldTypes;
};

export type TMultiKeyFieldDefinition = {
  metatype: "MultiKeyField";
  types: TMultikeyFieldKeys;
};

export type TMultikeyFieldKeys = {
  [key: Exclude<string, "metatype">]: {
    type: TLiteralFieldTypes;
    validators?: TValidators;
  };
};

export type TEmbeddedFieldDefinition = {
  metatype: "EmbeddedField";
  types: BaseNodeTypes[];
};

//type TMultikeyFieldDefinition = IMultikeyFieldKeys & IMultikeyFieldDef;

type TFieldDefinition = (
  | TListFieldDefinition
  | TEnumFieldDefinition
  | TLiteralFieldDefinition
  | TRelationFieldDefinition
  | TMultiKeyFieldDefinition
  | TEmbeddedFieldDefinition
) & { fieldOnModel: AllModelTypes[number] };

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
const {{k}}Base: TBaseNode<"{{k}}"> = {{v}};
{% endfor %}

export type TModelDefinitionMap = { [key in BaseNodeTypes]: TBaseNode<key> };

export const BaseNodeDefinitionMap: TModelDefinitionMap = {
  {% for k, v in model_definitions.items() %}{{k}}: {{k}}Base,
  {% endfor %}
}

{% for k, v in reified_relation_definitions.items() %}
const {{k}}Definition: TReifiedRelation<"{{k}}"> = {{v}};
{% endfor %}

export const ReifiedRelationsDefinitionMap = {
  {% for k, v in reified_relation_definitions.items() %}{{k}}: {{k}}Definition,
  {% endfor %}
}

{% for k, v in semantic_space_definitions.items() %}
const {{k}}Definition: TSemanticSpace<"{{k}}"> = {{v}};
{% endfor %}

export const SemanticSpaceDefinitionMap = {
  {% for k, v in semantic_space_definitions.items() %}{{k}}: {{k}}Definition,
  {% endfor %}
}

{% for k, v in edge_model_definitions.items() %}
const {{k}}Definition: TEdgeModel<"{{k}}"> = {{v}};
{% endfor %}

export const EdgeModelDefinitionMap = {
  {% for k, v in edge_model_definitions.items() %}{{k}}: {{k}}Definition,
  {% endfor %}
}

export const ModelDefinitions = {...BaseNodeDefinitionMap, ...SemanticSpaceDefinitionMap, ...ReifiedRelationsDefinitionMap, ...EdgeModelDefinitionMap};