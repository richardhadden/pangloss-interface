import {
  BaseNodeTypeNameList,
  EdgeModelTypeNamesList,
  MultiKeyFieldTypeNameList,
  ReifiedRelationTypeNameList,
  SemanticSpaceTypeNameList,
  TraitTypeNameList,
} from "./.generated/nodeTypeNames";

/* 
#
# Build union types from names of models 
#
*/
export type BaseNodeTypeNames = (typeof BaseNodeTypeNameList)[number];
export type ReifiedRelationTypeNames =
  (typeof ReifiedRelationTypeNameList)[number];
export type TraitTypeNames = (typeof TraitTypeNameList)[number];
export type SemanticSpaceTypeNames = (typeof SemanticSpaceTypeNameList)[number];
export type EdgeModelTypeNames = (typeof EdgeModelTypeNamesList)[number];
export type MultiKeyFieldTypeNames = (typeof MultiKeyFieldTypeNameList)[number];

export const AllModelTypeNameList = [
  ...BaseNodeTypeNameList,
  ...ReifiedRelationTypeNameList,
  ...TraitTypeNameList,
  ...SemanticSpaceTypeNameList,
  ...EdgeModelTypeNamesList,
  ...MultiKeyFieldTypeNameList,
] as const;

type TBaseNodeDefinition<T extends BaseNodeTypeNames> = {
  name: T;
  metatype: "BaseNode";
  fields: { [key in string]: TFieldDefinition };
};
type TReifiedRelationDefinition<T extends ReifiedRelationTypeNames> = {
  name: T;
  metatype: "ReifiedRelation";
};
type TTraitDefinition<T extends TraitTypeNames> = {
  name: T;
  metatype: "Trait";
};
type TSemanticSpaceDefinition<T extends SemanticSpaceTypeNames> = {
  name: T;
  metatype: "SemanticSpace";
};
type TEdgeModelDefinition<T extends EdgeModelTypeNames> = {
  name: T;
  metatype: "EdgeModel";
};
type TMultiKeyFieldDefinition<T extends MultiKeyFieldTypeNames> = {
  name: T;
  metatype: "MultiKeyField";
};
