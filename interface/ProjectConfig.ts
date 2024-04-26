/* =========================DO NOT MODIFY!!!=========================
                
Auto-generated configuration for Pangloss project my_app.

It contains TypeScript types, Valibot validators and other information.

This configuration file will be used when building the interface.

============================DO NOT MODIFY!!!======================= */

import * as v from "valibot";

type ZoteroEntryReference = v.Output<typeof ZoteroEntryReferenceValidator>;
const ZoteroEntryReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("ZoteroEntry"),
  citation: v.string(),
});

type EntityReference = v.Output<typeof EntityReferenceValidator>;
const EntityReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Entity"),
});

type PersonReference = v.Output<typeof PersonReferenceValidator>;
const PersonReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Person"),
});

type OrganisationReference = v.Output<typeof OrganisationReferenceValidator>;
const OrganisationReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Organisation"),
});

type SourceReference = v.Output<typeof SourceReferenceValidator>;
const SourceReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Source"),
});

type CitationReference = v.Output<typeof CitationReferenceValidator>;
const CitationReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Citation"),
});

type FactoidReference = v.Output<typeof FactoidReferenceValidator>;
const FactoidReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Factoid"),
});

type StatementReference = v.Output<typeof StatementReferenceValidator>;
const StatementReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Statement"),
});

type TemporalStatementReference = v.Output<
  typeof TemporalStatementReferenceValidator
>;
const TemporalStatementReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("TemporalStatement"),
});

type NamingReference = v.Output<typeof NamingReferenceValidator>;
const NamingReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Naming"),
});

type BirthReference = v.Output<typeof BirthReferenceValidator>;
const BirthReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Birth"),
});

type DeathReference = v.Output<typeof DeathReferenceValidator>;
const DeathReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Death"),
});

type ActivityReference = v.Output<typeof ActivityReferenceValidator>;
const ActivityReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Activity"),
});

type MakeJamReference = v.Output<typeof MakeJamReferenceValidator>;
const MakeJamReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("MakeJam"),
});

type OrderReference = v.Output<typeof OrderReferenceValidator>;
const OrderReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Order"),
});

export type EntityTypes =
  | "ZoteroEntry"
  | "Entity"
  | "Person"
  | "Organisation"
  | "Source"
  | "Citation"
  | "Factoid"
  | "Statement"
  | "TemporalStatement"
  | "Naming"
  | "Birth"
  | "Death"
  | "Activity"
  | "MakeJam"
  | "Order";

type GenericListReturnType<T> = {
  results: T[];
  count: number;
  page: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  nextUrl: string;
  previousUrl: string;
};

export type ListReturnTypes = {
  ZoteroEntry: GenericListReturnType<ZoteroEntryReference>;
  Entity: GenericListReturnType<EntityReference>;
  Person: GenericListReturnType<PersonReference>;
  Organisation: GenericListReturnType<OrganisationReference>;
  Source: GenericListReturnType<SourceReference>;
  Citation: GenericListReturnType<CitationReference>;
  Factoid: GenericListReturnType<FactoidReference>;
  Statement: GenericListReturnType<StatementReference>;
  TemporalStatement: GenericListReturnType<TemporalStatementReference>;
  Naming: GenericListReturnType<NamingReference>;
  Birth: GenericListReturnType<BirthReference>;
  Death: GenericListReturnType<DeathReference>;
  Activity: GenericListReturnType<ActivityReference>;
  MakeJam: GenericListReturnType<MakeJamReference>;
  Order: GenericListReturnType<OrderReference>;
};

type Death__person_born__PersonReference = v.Output<
  typeof Death__person_born__PersonReferenceValidator
>;
const Death__person_born__PersonReferenceValidator = v.object({
  uid: v.string([v.uuid()]),
  label: v.string(),
  realType: v.literal("Person"),
  relationProperties: v.object({
    type: v.string(),
  }),
});

type ZoteroEntry = v.Output<typeof ZoteroEntryValidator>;
const ZoteroEntryValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("ZoteroEntry"),
  zoteroKey: v.string([]),
  zoteroGroupId: v.number([v.integer()]),
  zoteroGroupName: v.string([]),
  zoteroVersion: v.number([v.integer()]),
  zoteroUrl: v.any(),
  csljson: v.string([]),
  bib: v.string([]),
  citation: v.string(),
  createdBy: v.string(),
  createdWhen: v.string([v.isoDateTime()]),
  modifiedBy: v.string([]),
  modifiedWhen: v.string([v.isoDateTime()]),
});

type Entity = v.Output<typeof EntityValidator>;
const EntityValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Entity"),
});

type Person = v.Output<typeof PersonValidator>;
const PersonValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Person"),
});

type Organisation = v.Output<typeof OrganisationValidator>;
const OrganisationValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Organisation"),
});

type Source = v.Output<typeof SourceValidator>;
const SourceValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Source"),
  title: v.string(),
});

type Citation = v.Output<typeof CitationValidator>;
const CitationValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Citation"),
  reference: v.array(ZoteroEntryReferenceValidator),
  scope: v.union([v.string(), v.null_()]),
});

type Factoid = v.Output<typeof FactoidValidator>;
const FactoidValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Factoid"),
  citation: v.array(v.any()),
  statements: v.array(
    v.union([
      v.lazy(() => MakeJamValidator),
      v.lazy(() => DeathValidator),
      v.lazy(() => BirthValidator),
      v.lazy(() => OrderValidator),
      v.lazy(() => NamingValidator),
    ]),
  ),
});

type Statement = v.Output<typeof StatementValidator>;
const StatementValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Statement"),
  subjectOfStatement: v.array(PersonReferenceValidator),
});

type TemporalStatement = v.Output<typeof TemporalStatementValidator>;
const TemporalStatementValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("TemporalStatement"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
});

type Naming = v.Output<typeof NamingValidator>;
const NamingValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Naming"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  firstName: v.string(),
  lastName: v.string(),
});

type Birth = v.Output<typeof BirthValidator>;
const BirthValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Birth"),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  personBorn: v.array(PersonReferenceValidator),
});

type Death = v.Output<typeof DeathValidator>;
const DeathValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Death"),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  personBorn: v.array(Death__person_born__PersonReferenceValidator),
});

type Activity = v.Output<typeof ActivityValidator>;
const ActivityValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Activity"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  carriedOutBy: v.array(
    v.union([OrganisationReferenceValidator, PersonReferenceValidator]),
  ),
});

type MakeJam = v.Output<typeof MakeJamValidator>;
const MakeJamValidator = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("MakeJam"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  carriedOutBy: v.array(
    v.union([OrganisationReferenceValidator, PersonReferenceValidator]),
  ),
});

type Order = {
  uid: string | null;
  label: string;
  realType: "Order";
  subjectOfStatement: Array<PersonReference>;
  when: string | null;
  thingOrdered: Array<Order | MakeJam>;
};
const OrderValidator: v.BaseSchema<Order> = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Order"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  thingOrdered: v.array(
    v.union([v.lazy(() => OrderValidator), v.lazy(() => MakeJamValidator)]),
  ),
});

type ZoteroEntryView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  isReferenceFor: Array<CitationReference | FactoidReference> | null;
  realType: "ZoteroEntry";
  uid: string | null;
  label: string;
  zoteroKey: string;
  zoteroGroupId: number;
  zoteroGroupName: string;
  zoteroVersion: number;
  zoteroUrl: string;
  csljson: string;
  bib: string;
  citation: string;
};

type EntityView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Entity";
  uid: string | null;
  label: string;
};

type PersonView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  isSubjectOfStatement: Array<
    | ActivityReference
    | OrderReference
    | MakeJamReference
    | StatementReference
    | NamingReference
    | TemporalStatementReference
  > | null;
  hasBirthEvent: Array<BirthReference> | null;
  hasDeathEvent: Array<Person__has_death_event__DeathReference> | null;
  carriedOutActivity: Array<MakeJamReference | ActivityReference> | null;
  realType: "Person";
  uid: string | null;
  label: string;
};

type OrganisationView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  carriedOutActivity: Array<MakeJamReference | ActivityReference> | null;
  realType: "Organisation";
  uid: string | null;
  label: string;
};

type SourceView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Source";
  uid: string | null;
  label: string;
  title: string;
};

type CitationView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Citation";
  uid: string | null;
  label: string;
  reference: Array<ZoteroEntryReference>;
  scope: string | null;
};

type FactoidView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Factoid";
  uid: string | null;
  label: string;
  citation: Array<string>;
  statements: Array<MakeJam | Death | Birth | Order | Naming>;
};

type StatementView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Statement";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
};

type TemporalStatementView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "TemporalStatement";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  when: string | null;
};

type NamingView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Naming";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  firstName: string;
  lastName: string;
};

type BirthView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Birth";
  uid: string | null;
  label: string;
  when: string | null;
  personBorn: Array<PersonReference>;
};

type DeathView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Death";
  uid: string | null;
  label: string;
  when: string | null;
  personBorn: Array<Death__person_born__PersonReference>;
};

type ActivityView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  realType: "Activity";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  when: string | null;
  carriedOutBy: Array<OrganisationReference | PersonReference>;
};

type MakeJamView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  wasOrderedIn: Array<OrderReference> | null;
  realType: "MakeJam";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  when: string | null;
  carriedOutBy: Array<OrganisationReference | PersonReference>;
};

type OrderView = {
  createdWhen: string;
  modifiedWhen: string;
  createdBy: string;
  modifiedBy: string;
  wasOrderedIn: Array<OrderReference> | null;
  realType: "Order";
  uid: string | null;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  when: string | null;
  thingOrdered: Array<Order | MakeJam>;
};

export type EntityViewTypes = {
  ZoteroEntry: ZoteroEntryView;
  Entity: EntityView;
  Person: PersonView;
  Organisation: OrganisationView;
  Source: SourceView;
  Citation: CitationView;
  Factoid: FactoidView;
  Statement: StatementView;
  TemporalStatement: TemporalStatementView;
  Naming: NamingView;
  Birth: BirthView;
  Death: DeathView;
  Activity: ActivityView;
  MakeJam: MakeJamView;
  Order: OrderView;
};

export const ValidatorsByModelName = {
  ZoteroEntry: ZoteroEntryValidator,
  Entity: EntityValidator,
  Person: PersonValidator,
  Organisation: OrganisationValidator,
  Source: SourceValidator,
  Citation: CitationValidator,
  Factoid: FactoidValidator,
  Statement: StatementValidator,
  TemporalStatement: TemporalStatementValidator,
  Naming: NamingValidator,
  Birth: BirthValidator,
  Death: DeathValidator,
  Activity: ActivityValidator,
  MakeJam: MakeJamValidator,
  Order: OrderValidator,
};

export type ModelHierarchy = {
  [key: string]: {} | ModelHierarchy;
};

type Person__has_death_event__DeathReference = {
  uid: string;
  label: string;
  realType: "Death";
  relationProperties: string;
};
const ZoteroEntryHierarchy: ModelHierarchy = {};

const EntityHierarchy: ModelHierarchy = { Person: {}, Organisation: {} };

const PersonHierarchy: ModelHierarchy = {};

const OrganisationHierarchy: ModelHierarchy = {};

const SourceHierarchy: ModelHierarchy = {};

const CitationHierarchy: ModelHierarchy = {};

const FactoidHierarchy: ModelHierarchy = {};

const StatementHierarchy: ModelHierarchy = {
  TemporalStatement: {
    Birth: {},
    Death: {},
    Activity: { MakeJam: {} },
    Order: {},
  },
  Naming: {},
};

const TemporalStatementHierarchy: ModelHierarchy = {
  Birth: {},
  Death: {},
  Activity: { MakeJam: {} },
  Order: {},
};

const NamingHierarchy: ModelHierarchy = {};

const BirthHierarchy: ModelHierarchy = {};

const DeathHierarchy: ModelHierarchy = {};

const ActivityHierarchy: ModelHierarchy = { MakeJam: {} };

const MakeJamHierarchy: ModelHierarchy = {};

const OrderHierarchy: ModelHierarchy = {};

export const ModelHierarchies = {
  ZoteroEntry: ZoteroEntryHierarchy,
  Entity: EntityHierarchy,
  Person: PersonHierarchy,
  Organisation: OrganisationHierarchy,
  Source: SourceHierarchy,
  Citation: CitationHierarchy,
  Factoid: FactoidHierarchy,
  Statement: StatementHierarchy,
  TemporalStatement: TemporalStatementHierarchy,
  Naming: NamingHierarchy,
  Birth: BirthHierarchy,
  Death: DeathHierarchy,
  Activity: ActivityHierarchy,
  MakeJam: MakeJamHierarchy,
  Order: OrderHierarchy,
};

export const TopLevelModels = [
  "ZoteroEntry",
  "Entity",
  "Source",
  "Citation",
  "Factoid",
  "Statement",
];

export type FieldDefinition = {
  value?: boolean;
  outgoingRelation?: boolean;
  incomingRelation?: boolean;
  embeddedNode?: boolean;
  createInline?: boolean;
  editInline?: boolean;
};

type FieldsObject<T> = {
  [Property in keyof T]?: FieldDefinition;
};

type ConfigObject<T> = {
  abstract: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  search: boolean;
  fields: FieldsObject<T>;
};
export const ZoteroEntryConfig: ConfigObject<EntityViewTypes["ZoteroEntry"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    zoteroKey: { value: true },
    zoteroGroupId: { value: true },
    zoteroGroupName: { value: true },
    zoteroVersion: { value: true },
    zoteroUrl: { value: true },
    csljson: { value: true },
    bib: { value: true },
    citation: { value: true },
    createdBy: { value: true },
    createdWhen: { value: true },
    modifiedBy: { value: true },
    modifiedWhen: { value: true },
    isReferenceFor: { incomingRelation: true },
  },
};

export const EntityConfig: ConfigObject<EntityViewTypes["Entity"]> = {
  abstract: true,
  create: true,
  edit: true,
  delete: true,
  search: true,
  fields: { uid: { value: true }, label: { value: true } },
};

export const PersonConfig: ConfigObject<EntityViewTypes["Person"]> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    isSubjectOfStatement: { incomingRelation: true },
    hasBirthEvent: { incomingRelation: true },
    hasDeathEvent: { incomingRelation: true },
    carriedOutActivity: { incomingRelation: true },
  },
};

export const OrganisationConfig: ConfigObject<EntityViewTypes["Organisation"]> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    search: true,
    fields: {
      uid: { value: true },
      label: { value: true },
      carriedOutActivity: { incomingRelation: true },
    },
  };

export const SourceConfig: ConfigObject<EntityViewTypes["Source"]> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    title: { value: true },
  },
};

export const CitationConfig: ConfigObject<EntityViewTypes["Citation"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: false,
  fields: {
    uid: { value: true },
    label: { value: true },
    reference: { outgoingRelation: true },
    scope: { value: true },
  },
};

export const FactoidConfig: ConfigObject<EntityViewTypes["Factoid"]> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    citation: { embeddedNode: true },
    statements: {
      outgoingRelation: true,
      createInline: true,
      editInline: true,
    },
  },
};

export const StatementConfig: ConfigObject<EntityViewTypes["Statement"]> = {
  abstract: true,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
  },
};

export const TemporalStatementConfig: ConfigObject<
  EntityViewTypes["TemporalStatement"]
> = {
  abstract: true,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
    when: { value: true },
  },
};

export const NamingConfig: ConfigObject<EntityViewTypes["Naming"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
    firstName: { value: true },
    lastName: { value: true },
  },
};

export const BirthConfig: ConfigObject<EntityViewTypes["Birth"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    when: { value: true },
    personBorn: { outgoingRelation: true },
  },
};

export const DeathConfig: ConfigObject<EntityViewTypes["Death"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    when: { value: true },
    personBorn: { outgoingRelation: true },
  },
};

export const ActivityConfig: ConfigObject<EntityViewTypes["Activity"]> = {
  abstract: true,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
    when: { value: true },
    carriedOutBy: { outgoingRelation: true },
  },
};

export const MakeJamConfig: ConfigObject<EntityViewTypes["MakeJam"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
    when: { value: true },
    carriedOutBy: { outgoingRelation: true },
    wasOrderedIn: { incomingRelation: true },
  },
};

export const OrderConfig: ConfigObject<EntityViewTypes["Order"]> = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
  fields: {
    uid: { value: true },
    label: { value: true },
    subjectOfStatement: { outgoingRelation: true },
    when: { value: true },
    thingOrdered: { outgoingRelation: true, createInline: true },
    wasOrderedIn: { incomingRelation: true },
  },
};

export const ModelConfigs = {
  ZoteroEntry: ZoteroEntryConfig,
  Entity: EntityConfig,
  Person: PersonConfig,
  Organisation: OrganisationConfig,
  Source: SourceConfig,
  Citation: CitationConfig,
  Factoid: FactoidConfig,
  Statement: StatementConfig,
  TemporalStatement: TemporalStatementConfig,
  Naming: NamingConfig,
  Birth: BirthConfig,
  Death: DeathConfig,
  Activity: ActivityConfig,
  MakeJam: MakeJamConfig,
  Order: OrderConfig,
};
