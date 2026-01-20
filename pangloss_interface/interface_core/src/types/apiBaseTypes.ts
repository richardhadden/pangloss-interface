import {
  type BaseNodeTypeNames,
  type ReifiedRelationTypeNames,
} from "./modelDefinitionTypes";

export type TEditHeadSetBase = {
  id: BaseNodeTypeNames;
  type: string;
  label: string;
  uris: string[];
  semanticSpaces: string[] | null;
};

export type TEditSetBase<ModelType extends BaseNodeTypeNames> = {
  id: string;
  type: ModelType;
  label: string;
  semanticSpaces: string[];
};

export type TCreateBase<ModelType extends BaseNodeTypeNames> = {
  type: ModelType;
  id?: string | string[] | null;
  label: string;
  uris?: string[];
};

export type THeadViewBase<ModelType extends BaseNodeTypeNames> = {
  type: ModelType;
  id: string;
  label: string;
  uris: string[];
  createdBy: string;
  createdWhen: Date;
  modifiedBy: string | null;
  modifiedWhen: Date | null;
  semanticSpaces: string[];
};

export type TViewBase<ModelType extends BaseNodeTypeNames> = {
  type: ModelType;
  id: string;
  label: string;
  headNode: string | null;
  headType: string | null;
  semanticSpaces: string[] | null;
};

export type TReifiedRelationCreateBase<
  ModelType extends ReifiedRelationTypeNames,
> = {
  type: ModelType;
};

export type TReifiedRelationViewBase<
  ModelType extends ReifiedRelationTypeNames,
> = {
  type: ModelType;
  id: string;
  headNode: string | null;
  headType: string | null;
  semanticSpaces: string[];
};

export type TReifiedRelationEditSetBase<
  ModelType extends ReifiedRelationTypeNames,
> = {
  type: ModelType;
  id: string;
  semanticSpaces: string[];
};

export type TEmbeddedCreateBase = {
  type: string;
};

export type TReferenceSetBase<ModelType extends ReifiedRelationTypeNames> = {
  type: ModelType;
  id: string | string;
  label: string | null;
};

export type TReferenceCreateBase<ModelType extends ReifiedRelationTypeNames> = {
  type: ModelType;
  id: string | string;
  label: string;
  create: true;
};

export type TReferenceViewBase<ModelType extends ReifiedRelationTypeNames> = {
  type: ModelType;
  id: string;
  label: string;
  headNode: string | null;
  headType: string | null;
  uris: string[] | null;
  semanticSpaces: string[] | null;
};

export type TSemanticSpaceCreateBase<ModelType extends BaseNodeTypeNames> = {
  contents: TCreateBase<ModelType>[];
  type: string;
};

export type TSemanticSpaceViewBase<ModelType extends BaseNodeTypeNames> = {
  contents: TViewBase<ModelType>[];
  type: string;
};

export type TSemanticSpaceEditSetBase<ModelType extends BaseNodeTypeNames> = {
  id: string;
  contents: TViewBase<ModelType>[];
  type: string;
  headNode: string | null;
  headType: string | null;
  semanticSpaces: string[];
};
