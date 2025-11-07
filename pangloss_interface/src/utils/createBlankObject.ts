import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  ReifiedRelationsDefinitionMap,
  TEmbeddedFieldDefinition,
  TLiteralFieldDefinition,
  TRelationFieldDefinition,
} from "../../.model-configs/model-definitions";
import { EdgeModelTypes } from "../../.model-configs/model-typescript";

function literalFieldDefault(f: TLiteralFieldDefinition) {
  if (f.type === "boolean") {
    return f.defaultValue || false;
  } else if (f.type === "string") {
    return f.defaultValue || "";
  } else if (f.type === "int") {
    return f.defaultValue || 0;
  } else if (f.type === "float") {
    return f.defaultValue || 0;
  } else if (f.type === "date") {
    return f.defaultValue || new Date();
  } else if (f.type === "datetime") {
    return f.defaultValue || new Date();
  } else if (f.type === "null") {
    return null;
  }
}

function relationFieldDefault(f: TRelationFieldDefinition) {
  if (f.createInline) {
    if (f.validators.MinLen && f.validators.MinLen >= 1) {
      if (f.types.length === 1 && f.types[0].metatype === "RelationToNode") {
        return [createBlankObject(f.types[0].type, false)];
      } else {
        return [{}];
      }
    } else if (
      !f.validators.MinLen ||
      (f.validators.MinLen && f.validators.MinLen === 0)
    ) {
      return [];
    } else {
      return [{}];
    }
  }
  return [];
}

function embeddedFieldDefault(f: TEmbeddedFieldDefinition) {
  if (f.types.length === 1) {
    return [createBlankObject(f.types[0], true)];
  }
  return [{}];
}

function createBlankObject(
  modelType: keyof typeof ModelDefinitions,
  embedded: boolean,
  edgeModelType?: EdgeModelTypes | null,
) {
  const modelDef = ModelDefinitions[modelType];

  let baseBlankObject;

  if (modelType in BaseNodeDefinitionMap && !embedded) {
    baseBlankObject = { type: modelType, label: "" };
  } else if (modelType in ReifiedRelationsDefinitionMap) {
    console.log("creating blank model for", modelType);
    baseBlankObject = { type: modelType };
  } else {
    baseBlankObject = { type: modelType };
  }

  if (edgeModelType) {
    baseBlankObject["edgeProperties"] = createBlankObject(edgeModelType, false);
  }

  const mappedFields: (
    | (string | number | boolean | Date | null | undefined)[]
    | (string | {}[])[]
    | {}[]
  )[] = Object.entries(modelDef.fields).map(([fieldName, fieldDef]) => {
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
  });
  const blankObject = {
    ...baseBlankObject,
    ...Object.fromEntries(mappedFields),
  };
  console.log("BLANKOBJECT", blankObject);
  return blankObject;
}

export { createBlankObject };
