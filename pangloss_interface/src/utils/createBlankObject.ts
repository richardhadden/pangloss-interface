import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  TEmbeddedFieldDefinition,
  TLiteralFieldDefinition,
  TRelationFieldDefinition,
} from "../../.model-configs/model-definitions";

function literalFieldDefault(f: TLiteralFieldDefinition) {
  if (f.type === "boolean") {
    return false;
  } else if (f.type === "string") {
    return "";
  } else if (f.type === "int") {
    return 0;
  } else if (f.type === "float") {
    return 0;
  } else if (f.type === "date") {
    return new Date();
  } else if (f.type === "datetime") {
    return new Date();
  } else if (f.type === "null") {
    return null;
  }
}

function relationFieldDefault(f: TRelationFieldDefinition) {
  return [];
}

function embeddedFieldDefault(f: TEmbeddedFieldDefinition) {
  return [];
}

function createBlankObject(
  modelType: keyof typeof ModelDefinitions,
  embedded: boolean,
) {
  const modelDef = ModelDefinitions[modelType];

  let baseBlankObject;

  if (modelType in BaseNodeDefinitionMap && !embedded) {
    baseBlankObject = { type: modelType, label: "" };
  } else {
    baseBlankObject = { type: modelType };
  }

  const mappedFields = Object.entries(modelDef.fields).map(
    ([fieldName, fieldDef]) => {
      if (fieldDef.metatype === "LiteralField") {
        return [fieldName, literalFieldDefault(fieldDef)];
      } else if (fieldDef.metatype === "RelationField") {
        return [fieldName, relationFieldDefault(fieldDef)];
      } else if (fieldDef.metatype === "EmbeddedField") {
        return [fieldName, embeddedFieldDefault(fieldDef)];
      } else if (fieldDef.metatype === "ListField") {
        return [fieldName, []];
      } else if (fieldDef.metatype === "EnumField") {
        return [fieldName, fieldDef.enumValues[0]];
      } else if (fieldDef.metatype === "MultiKeyField") {
        return [fieldName, {}];
      }
      return [fieldName, null];
    },
  );
  const blankObject = {
    ...baseBlankObject,
    ...Object.fromEntries(mappedFields),
  };
  return blankObject;
}

export { createBlankObject };
