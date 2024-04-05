/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Birth } from './Birth';
import type { CitationEmbedded } from './CitationEmbedded';
import type { Death } from './Death';
import type { Naming } from './Naming';
export type Factoid = {
    uid?: (string | null);
    label: string;
    realType?: any;
    citation: Array<CitationEmbedded>;
    statements: Array<(Birth | Death | Naming)>;
};

