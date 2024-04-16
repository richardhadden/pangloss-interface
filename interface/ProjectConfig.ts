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

export type GenericListReturnType<T> = {
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
      v.lazy(() => NamingValidator),
      v.lazy(() => MakeJamValidator),
      v.lazy(() => BirthValidator),
      v.lazy(() => DeathValidator),
      v.lazy(() => OrderValidator),
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
  thingOrdered: Array<MakeJam | Order>;
};
const OrderValidator: v.BaseSchema<Order> = v.object({
  uid: v.union([v.string([v.uuid()]), v.null_()]),
  label: v.string([v.maxLength(500)]),
  realType: v.literal("Order"),
  subjectOfStatement: v.array(PersonReferenceValidator),
  when: v.union([v.string([v.isoDate()]), v.null_()]),
  thingOrdered: v.array(
    v.union([v.lazy(() => MakeJamValidator), v.lazy(() => OrderValidator)]),
  ),
});

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

type ConfigObject = {
  abstract: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  search: boolean;
};

export const ZoteroEntryConfig: ConfigObject = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: true,
};

export const EntityConfig: ConfigObject = {
  abstract: true,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const PersonConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const OrganisationConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const SourceConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const CitationConfig: ConfigObject = {
  abstract: false,
  create: false,
  edit: false,
  delete: false,
  search: false,
};

export const FactoidConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const StatementConfig: ConfigObject = {
  abstract: true,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const TemporalStatementConfig: ConfigObject = {
  abstract: true,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const NamingConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const BirthConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const DeathConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const ActivityConfig: ConfigObject = {
  abstract: true,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const MakeJamConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
};

export const OrderConfig: ConfigObject = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  search: true,
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
