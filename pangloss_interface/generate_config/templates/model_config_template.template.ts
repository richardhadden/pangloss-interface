type MetaType = {
  baseModel: string;
  supertypes: string[];
  traits: string[];
  abstract: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
  search: boolean;
  createByReference: boolean;
  labelField: string | null;
};

type RelationFieldDefinition = {
  metatype: "RelationField";
  types: Array<{
    metatype:
      | "RelationToNode"
      | "RelationToReifiedDefinition"
      | "RelationToReifiedDefinitionWithProxy";
    type: string;
    originType?: string;
    typeParamsToTypeMap?: {
      [key: string]: { typeParam: string; type: string };
    };
  } | null>;
  validators: { [key: string]: any };
  name: string;
  relationLabels: string[];
  reverseName: string;
  reverseRelationLabels: string[];
  bindFieldsToRelated: string[];
};

type LiteralFieldDefinition = {
  metatype: "LiteralField";
  type: "string" | "int" | "float" | "datetime";
  validators?: { [key: string]: any };
};

type FieldDefinition = RelationFieldDefinition | LiteralFieldDefinition;

type FieldsDefinition = { [key: string]: FieldDefinition };

type ModelDefinition = { meta: MetaType; fields: FieldsDefinition };

type ModelDefinitions = { [key: string]: ModelDefinition };

const modelDefinitions = {{model_definitions}};