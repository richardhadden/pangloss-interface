/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BirthEdit } from './BirthEdit';
import type { CitationEmbedded } from './CitationEmbedded';
import type { DeathEdit } from './DeathEdit';
import type { NamingEdit } from './NamingEdit';
export type FactoidEdit_Input = {
    uid?: (string | null);
    realType?: any;
    statements?: Array<(BirthEdit | NamingEdit | DeathEdit)>;
    citation?: Array<CitationEmbedded>;
    label: string;
};

