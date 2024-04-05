import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const q = z.union([z.string(), z.null()]).optional();
const ZoteroEntryReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("ZoteroEntry"),
    citation: z.string(),
  })
  .passthrough();
const ListResponse_ZoteroEntryReference_ = z
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
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
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
const EntityReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Entity"),
  })
  .passthrough();
const ListResponse_EntityReference_ = z
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
const PersonReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Person"),
  })
  .passthrough();
const ListResponse_PersonReference_ = z
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
const TemporalStatementReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("TemporalStatement"),
  })
  .passthrough();
const NamingReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Naming"),
  })
  .passthrough();
const StatementReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Statement"),
  })
  .passthrough();
const BirthReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Birth"),
  })
  .passthrough();
const DeathReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Death"),
  })
  .passthrough();
const PersonView = z
  .object({
    createdWhen: z.string().datetime({ offset: true }),
    modifiedWhen: z.string().datetime({ offset: true }),
    isSubjectOfStatement: z
      .union([
        z.array(
          z.union([
            TemporalStatementReference,
            NamingReference,
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
const SourceReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Source"),
  })
  .passthrough();
const ListResponse_SourceReference_ = z
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
const CitationReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Citation"),
  })
  .passthrough();
const ListResponse_CitationReference_ = z
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
const ZoteroEntryEmbedded = z
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
const CitationView = z
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
const FactoidReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Factoid"),
  })
  .passthrough();
const ListResponse_FactoidReference_ = z
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
const CitationEmbedded = z
  .object({
    realType: z.unknown().optional().default("Citation"),
    uid: z.union([z.string(), z.null()]).optional(),
    reference: z.array(ZoteroEntryEmbedded).min(1).max(1),
    scope: z.union([z.string(), z.null()]),
  })
  .passthrough();
const Birth = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Birth"),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const Death = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Death"),
    when: z.string(),
    personBorn: z.array(PersonReference).min(1).max(1),
  })
  .passthrough();
const Naming = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Naming"),
    subjectOfStatement: z.array(PersonReference),
    firstName: z.string(),
    lastName: z.string(),
  })
  .passthrough();
const FactoidView = z
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
const Factoid = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Factoid"),
    citation: z.array(CitationEmbedded).min(1).max(1),
    statements: z.array(z.union([Birth, Death, Naming])).min(1),
  })
  .passthrough();
const BirthEdit = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Birth"),
    personBorn: z.array(PersonReference).optional(),
  })
  .passthrough();
const NamingEdit = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Naming"),
    subjectOfStatement: z.array(PersonReference).optional(),
  })
  .passthrough();
const DeathEdit = z
  .object({
    uid: z.string().uuid(),
    realType: z.unknown().optional().default("Death"),
    personBorn: z.array(PersonReference).optional(),
  })
  .passthrough();
const FactoidEdit_Output = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Factoid"),
    statements: z.array(z.union([BirthEdit, NamingEdit, DeathEdit])).optional(),
    citation: z.array(CitationEmbedded).optional(),
    label: z.string().max(500),
  })
  .passthrough();
const FactoidEdit_Input = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    realType: z.unknown().optional().default("Factoid"),
    statements: z.array(z.union([BirthEdit, NamingEdit, DeathEdit])).optional(),
    citation: z.array(CitationEmbedded).optional(),
    label: z.string().max(500),
  })
  .passthrough();
const ListResponse_StatementReference_ = z
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
const ListResponse_TemporalStatementReference_ = z
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
const ListResponse_NamingReference_ = z
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
const NamingView = z
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
const ListResponse_BirthReference_ = z
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
const BirthView = z
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
const ListResponse_DeathReference_ = z
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
const DeathView = z
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
const SomethingReference = z
  .object({
    uid: z.string().uuid(),
    label: z.string().max(500),
    realType: z.unknown().optional().default("Something"),
  })
  .passthrough();
const ListResponse_SomethingReference_ = z
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
  TemporalStatementReference,
  NamingReference,
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
  BirthEdit,
  NamingEdit,
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

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "index__get",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "get",
    path: "/api/Birth/",
    alias: "list",
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
    path: "/api/Citation/",
    alias: "list",
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
  {
    method: "get",
    path: "/api/Death/",
    alias: "list",
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
    path: "/api/Entity/",
    alias: "list",
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
  {
    method: "get",
    path: "/api/Factoid/",
    alias: "list",
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
    path: "/api/Naming/",
    alias: "list",
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
    path: "/api/Person/",
    alias: "list",
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
    path: "/api/Something/",
    alias: "list",
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
    path: "/api/Source/",
    alias: "list",
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
    path: "/api/Statement/",
    alias: "list",
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
  {
    method: "get",
    path: "/api/TemporalStatement/",
    alias: "list",
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
  {
    method: "get",
    path: "/api/users/current_user",
    alias: "CurrentUser_api_users_current_user_get",
    requestFormat: "json",
    response: UserView,
  },
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
  {
    method: "get",
    path: "/api/ZoteroEntry/",
    alias: "list",
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

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
