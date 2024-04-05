import { makeApi, Zodios } from "@zodios/core";
import { z } from "zod";

type Birth = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  realType?: unknown | undefined;
  when: string;
  personBorn: Array<PersonReference>;
};
type PersonReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type BirthEdit = {
  uid: string;
  realType?: unknown | undefined;
  personBorn?: Array<PersonReference> | undefined;
};
type BirthView = {
  createdWhen: string;
  modifiedWhen: string;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  when: string;
  personBorn: Array<PersonReference>;
};
type CitationEmbedded = {
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  reference: Array<ZoteroEntryEmbedded>;
  scope: (string | null) | Array<string | null>;
};
type ZoteroEntryEmbedded = {
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  zoteroKey: string;
  zoteroGroupId: number;
  zoteroGroupName: string;
  zoteroVersion: number;
  zoteroUrl: string;
  csljson: string;
  bib: string;
  citation: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
};
type CitationView = {
  createdWhen: string;
  modifiedWhen: string;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  reference: Array<ZoteroEntryEmbedded>;
  scope: (string | null) | Array<string | null>;
};
type Death = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  realType?: unknown | undefined;
  when: string;
  personBorn: Array<PersonReference>;
};
type DeathEdit = {
  uid: string;
  realType?: unknown | undefined;
  personBorn?: Array<PersonReference> | undefined;
};
type DeathView = {
  createdWhen: string;
  modifiedWhen: string;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  when: string;
  personBorn: Array<PersonReference>;
};
type Factoid = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  realType?: unknown | undefined;
  citation: Array<CitationEmbedded>;
  statements: Array<(Birth | Death | Naming) | Array<Birth | Death | Naming>>;
};
type Naming = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  realType?: unknown | undefined;
  subjectOfStatement: Array<PersonReference>;
  firstName: string;
  lastName: string;
};
type FactoidEdit_Input = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  realType?: unknown | undefined;
  statements?:
    | Array<
        | (NamingEdit | BirthEdit | DeathEdit)
        | Array<NamingEdit | BirthEdit | DeathEdit>
      >
    | undefined;
  citation?: Array<CitationEmbedded> | undefined;
  label: string;
};
type NamingEdit = {
  uid: string;
  realType?: unknown | undefined;
  subjectOfStatement?: Array<PersonReference> | undefined;
};
type FactoidEdit_Output = {
  uid?: ((string | null) | Array<string | null>) | undefined;
  realType?: unknown | undefined;
  statements?:
    | Array<
        | (NamingEdit | BirthEdit | DeathEdit)
        | Array<NamingEdit | BirthEdit | DeathEdit>
      >
    | undefined;
  citation?: Array<CitationEmbedded> | undefined;
  label: string;
};
type FactoidView = {
  createdWhen: string;
  modifiedWhen: string;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  citation: Array<CitationEmbedded>;
  statements: Array<(Birth | Death | Naming) | Array<Birth | Death | Naming>>;
};
type HTTPValidationError = Partial<{
  detail: Array<ValidationError>;
}>;
type ValidationError = {
  loc: Array<(string | number) | Array<string | number>>;
  msg: string;
  type: string;
};
type ListResponse_BirthReference_ = {
  results: Array<BirthReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type BirthReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_CitationReference_ = {
  results: Array<CitationReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type CitationReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_DeathReference_ = {
  results: Array<DeathReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type DeathReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_EntityReference_ = {
  results: Array<EntityReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type EntityReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_FactoidReference_ = {
  results: Array<FactoidReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type FactoidReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_NamingReference_ = {
  results: Array<NamingReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type NamingReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_PersonReference_ = {
  results: Array<PersonReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type ListResponse_SomethingReference_ = {
  results: Array<SomethingReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type SomethingReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_SourceReference_ = {
  results: Array<SourceReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type SourceReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_StatementReference_ = {
  results: Array<StatementReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type StatementReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_TemporalStatementReference_ = {
  results: Array<TemporalStatementReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type TemporalStatementReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
};
type ListResponse_ZoteroEntryReference_ = {
  results: Array<ZoteroEntryReference>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: (number | null) | Array<number | null>;
  previousPage: (number | null) | Array<number | null>;
  nextUrl: (string | null) | Array<string | null>;
  previousUrl: (string | null) | Array<string | null>;
};
type ZoteroEntryReference = {
  uid: string;
  label: string;
  realType?: unknown | undefined;
  citation: string;
};
type NamingView = {
  createdWhen: string;
  modifiedWhen: string;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
  subjectOfStatement: Array<PersonReference>;
  firstName: string;
  lastName: string;
};
type PersonView = {
  createdWhen: string;
  modifiedWhen: string;
  isSubjectOfStatement?:
    | (
        | (Array<
            | (
                | NamingReference
                | TemporalStatementReference
                | StatementReference
              )
            | Array<
                | NamingReference
                | TemporalStatementReference
                | StatementReference
              >
          > | null)
        | Array<Array<
            | (
                | NamingReference
                | TemporalStatementReference
                | StatementReference
              )
            | Array<
                | NamingReference
                | TemporalStatementReference
                | StatementReference
              >
          > | null>
      )
    | undefined;
  hasBirthEvent?:
    | ((Array<BirthReference> | null) | Array<Array<BirthReference> | null>)
    | undefined;
  hasDeathEvent?:
    | ((Array<DeathReference> | null) | Array<Array<DeathReference> | null>)
    | undefined;
  realType?: unknown | undefined;
  uid?: ((string | null) | Array<string | null>) | undefined;
  label: string;
};

const q = z.union([z.string(), z.null()]).optional();
const ZoteroEntryReference: z.ZodType<ZoteroEntryReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("ZoteroEntry"),
    citation: z.string(),
  })
  .passthrough();
const ListResponse_ZoteroEntryReference_: z.ZodType<ListResponse_ZoteroEntryReference_> =
  z
    .object({
      results: z.array(ZoteroEntryReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const ValidationError: z.ZodType<ValidationError> = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError: z.ZodType<HTTPValidationError> = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const ZoteroEntryView = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("ZoteroEntry"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    zoteroKey: z.string(),
    zoteroGroupId: z.number().int(),
    zoteroGroupName: z.string(),
    zoteroVersion: z.number().int(),
    zoteroUrl: z.string().min(1).max(2083).url(),
    csljson: z.string(),
    bib: z.string(),
    citation: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
  })
  .passthrough();
const EntityReference: z.ZodType<EntityReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Entity"),
  })
  .passthrough();
const ListResponse_EntityReference_: z.ZodType<ListResponse_EntityReference_> =
  z
    .object({
      results: z.array(EntityReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const PersonReference: z.ZodType<PersonReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Person"),
  })
  .passthrough();
const ListResponse_PersonReference_: z.ZodType<ListResponse_PersonReference_> =
  z
    .object({
      results: z.array(PersonReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const NamingReference: z.ZodType<NamingReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Naming"),
  })
  .passthrough();
const TemporalStatementReference: z.ZodType<TemporalStatementReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("TemporalStatement"),
  })
  .passthrough();
const StatementReference: z.ZodType<StatementReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Statement"),
  })
  .passthrough();
const BirthReference: z.ZodType<BirthReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Birth"),
  })
  .passthrough();
const DeathReference: z.ZodType<DeathReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Death"),
  })
  .passthrough();
const PersonView: z.ZodType<PersonView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    isSubjectOfStatement: z
      .union([
        z.array(
          z.union([
            NamingReference,
            TemporalStatementReference,
            StatementReference,
          ])
        ),
        z.null(),
      ])
      .optional(),
    hasBirthEvent: z.union([z.array(BirthReference), z.null()]).optional(),
    hasDeathEvent: z.union([z.array(DeathReference), z.null()]).optional(),
    realType: z.unknown().optional().default("Person"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
  })
  .passthrough();
const Person = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Person"),
  })
  .passthrough();
const PersonEdit = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Person"),
    label: z.string().max(500),
  })
  .passthrough();
const SourceReference: z.ZodType<SourceReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Source"),
  })
  .passthrough();
const ListResponse_SourceReference_: z.ZodType<ListResponse_SourceReference_> =
  z
    .object({
      results: z.array(SourceReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const SourceView = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Source"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    title: z.string(),
  })
  .passthrough();
const Source = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Source"),
    title: z.string(),
  })
  .passthrough();
const SourceEdit = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Source"),
    label: z.string().max(500),
    title: z.string(),
  })
  .passthrough();
const CitationReference: z.ZodType<CitationReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Citation"),
  })
  .passthrough();
const ListResponse_CitationReference_: z.ZodType<ListResponse_CitationReference_> =
  z
    .object({
      results: z.array(CitationReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const ZoteroEntryEmbedded: z.ZodType<ZoteroEntryEmbedded> = z
  .object({
    realType: z.unknown().optional().default("ZoteroEntry"),
    uid: z.union([z.string(), z.null()]).optional(),
    zoteroKey: z.string(),
    zoteroGroupId: z.number().int(),
    zoteroGroupName: z.string(),
    zoteroVersion: z.number().int(),
    zoteroUrl: z.string().min(1).max(2083).url(),
    csljson: z.string(),
    bib: z.string(),
    citation: z.string(),
    createdBy: z.string(),
    createdWhen: z.string().datetime({ offset: true }),
    modifiedBy: z.string(),
    modifiedWhen: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CitationView: z.ZodType<CitationView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Citation"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    reference: z.array(ZoteroEntryEmbedded).min(1).max(1),
    scope: z.union([z.string(), z.null()]),
  })
  .passthrough();
const FactoidReference: z.ZodType<FactoidReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Factoid"),
  })
  .passthrough();
const ListResponse_FactoidReference_: z.ZodType<ListResponse_FactoidReference_> =
  z
    .object({
      results: z.array(FactoidReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const CitationEmbedded: z.ZodType<CitationEmbedded> = z
  .object({
    realType: z.unknown().optional().default("Citation"),
    uid: z.union([z.string(), z.null()]).optional(),
    reference: z.array(ZoteroEntryEmbedded).min(1).max(1),
    scope: z.union([z.string(), z.null()]),
  })
  .passthrough();
const Birth: z.ZodType<Birth> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Birth"),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const Death: z.ZodType<Death> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Death"),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const Naming: z.ZodType<Naming> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Naming"),
    subjectOfStatement: z.array(PersonReference),
    firstName: z.string(),
    lastName: z.string(),
  })
  .passthrough();
const FactoidView: z.ZodType<FactoidView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Factoid"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    citation: z.array(CitationEmbedded).min(1).max(1),
    statements: z.array(z.union([Birth, Death, Naming])).min(1),
  })
  .passthrough();
const Factoid: z.ZodType<Factoid> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Factoid"),
    citation: z.array(CitationEmbedded).min(1).max(1),
    statements: z.array(z.union([Birth, Death, Naming])).min(1),
  })
  .passthrough();
const NamingEdit: z.ZodType<NamingEdit> = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Naming"),
    subjectOfStatement: z.array(PersonReference).optional(),
  })
  .passthrough();
const BirthEdit: z.ZodType<BirthEdit> = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Birth"),
    personBorn: z.array(PersonReference).optional(),
  })
  .passthrough();
const DeathEdit: z.ZodType<DeathEdit> = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Death"),
    personBorn: z.array(PersonReference).optional(),
  })
  .passthrough();
const FactoidEdit_Output: z.ZodType<FactoidEdit_Output> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Factoid"),
    statements: z.array(z.union([NamingEdit, BirthEdit, DeathEdit])).optional(),
    citation: z.array(CitationEmbedded).optional(),
    label: z.string().max(500),
  })
  .passthrough();
const FactoidEdit_Input: z.ZodType<FactoidEdit_Input> = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Factoid"),
    statements: z.array(z.union([NamingEdit, BirthEdit, DeathEdit])).optional(),
    citation: z.array(CitationEmbedded).optional(),
    label: z.string().max(500),
  })
  .passthrough();
const ListResponse_StatementReference_: z.ZodType<ListResponse_StatementReference_> =
  z
    .object({
      results: z.array(StatementReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const ListResponse_TemporalStatementReference_: z.ZodType<ListResponse_TemporalStatementReference_> =
  z
    .object({
      results: z.array(TemporalStatementReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const ListResponse_NamingReference_: z.ZodType<ListResponse_NamingReference_> =
  z
    .object({
      results: z.array(NamingReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const NamingView: z.ZodType<NamingView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Naming"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    subjectOfStatement: z.array(PersonReference),
    firstName: z.string(),
    lastName: z.string(),
  })
  .passthrough();
const ListResponse_BirthReference_: z.ZodType<ListResponse_BirthReference_> = z
  .object({
    results: z.array(BirthReference),
    page: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    nextPage: z.union([z.number(), z.null()]),
    previousPage: z.union([z.number(), z.null()]),
    nextUrl: z.union([z.string(), z.null()]),
    previousUrl: z.union([z.string(), z.null()]),
  })
  .passthrough();
const BirthView: z.ZodType<BirthView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Birth"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const ListResponse_DeathReference_: z.ZodType<ListResponse_DeathReference_> = z
  .object({
    results: z.array(DeathReference),
    page: z.number().int(),
    count: z.number().int(),
    totalPages: z.number().int(),
    nextPage: z.union([z.number(), z.null()]),
    previousPage: z.union([z.number(), z.null()]),
    nextUrl: z.union([z.string(), z.null()]),
    previousUrl: z.union([z.string(), z.null()]),
  })
  .passthrough();
const DeathView: z.ZodType<DeathView> = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Death"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const SomethingReference: z.ZodType<SomethingReference> = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Something"),
  })
  .passthrough();
const ListResponse_SomethingReference_: z.ZodType<ListResponse_SomethingReference_> =
  z
    .object({
      results: z.array(SomethingReference),
      page: z.number().int(),
      count: z.number().int(),
      totalPages: z.number().int(),
      nextPage: z.union([z.number(), z.null()]),
      previousPage: z.union([z.number(), z.null()]),
      nextUrl: z.union([z.string(), z.null()]),
      previousUrl: z.union([z.string(), z.null()]),
    })
    .passthrough();
const SomethingView = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    realType: z.unknown().optional().default("Something"),
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    name: z.string(),
  })
  .passthrough();
const Something = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Something"),
    name: z.string(),
  })
  .passthrough();
const SomethingEdit = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Something"),
    label: z.string().max(500),
    name: z.string(),
  })
  .passthrough();
const Body_UserLogin_api_users_login_post = z
  .object({
    grant_type: z.union([z.string(), z.null()]).optional(),
    username: z.string(),
    password: z.string(),
    scope: z.string().optional(),
    client_id: z.union([z.string(), z.null()]).optional(),
    client_secret: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const Token = z
  .object({ access_token: z.string(), token_type: z.string() })
  .passthrough();
const UserView = z
  .object({
    username: z.string(),
    email: z.string(),
    full_name: z.union([z.string(), z.null()]),
  })
  .passthrough();
const User = z
  .object({
    username: z.string(),
    email: z.string(),
    full_name: z.union([z.string(), z.null()]).optional(),
    admin: z.boolean().optional(),
    disabled: z.boolean().optional(),
  })
  .passthrough();
const UserCreate = z
  .object({
    username: z.string(),
    email: z.string(),
    full_name: z.union([z.string(), z.null()]).optional(),
    admin: z.boolean().optional(),
    disabled: z.boolean().optional(),
    password: z.string(),
  })
  .passthrough();

export const schemas = {
  q,
  ZoteroEntryReference,
  ListResponse_ZoteroEntryReference_,
  ValidationError,
  HTTPValidationError,
  ZoteroEntryView,
  EntityReference,
  ListResponse_EntityReference_,
  PersonReference,
  ListResponse_PersonReference_,
  NamingReference,
  TemporalStatementReference,
  StatementReference,
  BirthReference,
  DeathReference,
  PersonView,
  Person,
  PersonEdit,
  SourceReference,
  ListResponse_SourceReference_,
  SourceView,
  Source,
  SourceEdit,
  CitationReference,
  ListResponse_CitationReference_,
  ZoteroEntryEmbedded,
  CitationView,
  FactoidReference,
  ListResponse_FactoidReference_,
  CitationEmbedded,
  Birth,
  Death,
  Naming,
  FactoidView,
  Factoid,
  NamingEdit,
  BirthEdit,
  DeathEdit,
  FactoidEdit_Output,
  FactoidEdit_Input,
  ListResponse_StatementReference_,
  ListResponse_TemporalStatementReference_,
  ListResponse_NamingReference_,
  NamingView,
  ListResponse_BirthReference_,
  BirthView,
  ListResponse_DeathReference_,
  DeathView,
  SomethingReference,
  ListResponse_SomethingReference_,
  SomethingView,
  Something,
  SomethingEdit,
  Body_UserLogin_api_users_login_post,
  Token,
  UserView,
  User,
  UserCreate,
};

const ZoteroEntryEndpoints = makeApi([
  {
    method: "get",
    path: "/api/ZoteroEntry/",
    alias: "ZoteroEntrylist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_ZoteroEntryReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/ZoteroEntry/:uid",
    alias: "ZoteroEntryView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: ZoteroEntryView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const ZoteroEntryApi = new Zodios(ZoteroEntryEndpoints);

const EntityEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Entity/",
    alias: "Entitylist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_EntityReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const EntityApi = new Zodios(EntityEndpoints);

const PersonEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Person/",
    alias: "Personlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_PersonReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Person/:uid",
    alias: "PersonView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: PersonView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Person/:uid",
    alias: "Person_Delete_api_Person__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Person/new",
    alias: "PersonCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Person,
      },
    ],
    response: PersonReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Person/edit",
    alias: "PersonEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: PersonEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Person/edit/:uid",
    alias: "PersonEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PersonEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: PersonReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const PersonApi = new Zodios(PersonEndpoints);

const SourceEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Source/",
    alias: "Sourcelist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_SourceReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Source/:uid",
    alias: "SourceView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: SourceView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Source/:uid",
    alias: "Source_Delete_api_Source__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Source/new",
    alias: "SourceCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Source,
      },
    ],
    response: SourceReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Source/edit",
    alias: "SourceEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: SourceEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Source/edit/:uid",
    alias: "SourceEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SourceEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: SourceReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const SourceApi = new Zodios(SourceEndpoints);

const CitationEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Citation/",
    alias: "Citationlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_CitationReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Citation/:uid",
    alias: "CitationView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: CitationView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const CitationApi = new Zodios(CitationEndpoints);

const FactoidEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Factoid/",
    alias: "Factoidlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_FactoidReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Factoid/:uid",
    alias: "FactoidView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: FactoidView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Factoid/:uid",
    alias: "Factoid_Delete_api_Factoid__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Factoid/new",
    alias: "FactoidCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Factoid,
      },
    ],
    response: FactoidReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Factoid/edit",
    alias: "FactoidEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: FactoidEdit_Output,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Factoid/edit/:uid",
    alias: "FactoidEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: FactoidEdit_Input,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: FactoidReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const FactoidApi = new Zodios(FactoidEndpoints);

const StatementEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Statement/",
    alias: "Statementlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_StatementReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const StatementApi = new Zodios(StatementEndpoints);

const TemporalStatementEndpoints = makeApi([
  {
    method: "get",
    path: "/api/TemporalStatement/",
    alias: "TemporalStatementlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_TemporalStatementReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const TemporalStatementApi = new Zodios(TemporalStatementEndpoints);

const NamingEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Naming/",
    alias: "Naminglist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_NamingReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Naming/:uid",
    alias: "NamingView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: NamingView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Naming/:uid",
    alias: "Naming_Delete_api_Naming__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Naming/new",
    alias: "NamingCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Naming,
      },
    ],
    response: NamingReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Naming/edit",
    alias: "NamingEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: NamingEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Naming/edit/:uid",
    alias: "NamingEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: NamingEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: NamingReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const NamingApi = new Zodios(NamingEndpoints);

const BirthEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Birth/",
    alias: "Birthlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_BirthReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Birth/:uid",
    alias: "BirthView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: BirthView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Birth/:uid",
    alias: "Birth_Delete_api_Birth__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Birth/new",
    alias: "BirthCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Birth,
      },
    ],
    response: BirthReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Birth/edit",
    alias: "BirthEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: BirthEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Birth/edit/:uid",
    alias: "BirthEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: BirthEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: BirthReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const BirthApi = new Zodios(BirthEndpoints);

const DeathEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Death/",
    alias: "Deathlist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_DeathReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Death/:uid",
    alias: "DeathView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: DeathView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Death/:uid",
    alias: "Death_Delete_api_Death__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Death/new",
    alias: "DeathCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Death,
      },
    ],
    response: DeathReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Death/edit",
    alias: "DeathEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: DeathEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Death/edit/:uid",
    alias: "DeathEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: DeathEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: DeathReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const DeathApi = new Zodios(DeathEndpoints);

const SomethingEndpoints = makeApi([
  {
    method: "get",
    path: "/api/Something/",
    alias: "Somethinglist",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: q,
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional().default(25),
      },
    ],
    response: ListResponse_SomethingReference_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Something/:uid",
    alias: "SomethingView",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: SomethingView,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/Something/:uid",
    alias: "Something_Delete_api_Something__uid__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/Something/new",
    alias: "SomethingCreate",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Something,
      },
    ],
    response: SomethingReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/Something/edit",
    alias: "SomethingEditGet",
    requestFormat: "json",
    parameters: [
      {
        name: "uid",
        type: "Query",
        schema: z.string().uuid(),
      },
    ],
    response: SomethingEdit,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/Something/edit/:uid",
    alias: "SomethingEditPatch",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SomethingEdit,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: SomethingReference,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const SomethingApi = new Zodios(SomethingEndpoints);

const UserEndpoints = makeApi([
  {
    method: "post",
    path: "/api/users/login",
    alias: "UserLogin_api_users_login_post",
    requestFormat: "form-url",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Body_UserLogin_api_users_login_post,
      },
    ],
    response: Token,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/users/logout",
    alias: "UserLogout_api_users_logout_get",
    requestFormat: "json",
    response: z.record(z.string()),
  },
  {
    method: "get",
    path: "/api/users/current_user",
    alias: "CurrentUser_api_users_current_user_get",
    requestFormat: "json",
    response: UserView,
  },
  {
    method: "get",
    path: "/api/users/me",
    alias: "read_users_me_api_users_me_get",
    requestFormat: "json",
    response: User,
  },
  {
    method: "get",
    path: "/api/users/me/items",
    alias: "read_own_items_api_users_me_items_get",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "post",
    path: "/api/users/new",
    alias: "CreateUser_api_users_new_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserCreate,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const UserApi = new Zodios(UserEndpoints);

const DefaultEndpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "index__get",
    requestFormat: "json",
    response: z.unknown(),
  },
]);

export const DefaultApi = new Zodios(DefaultEndpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
