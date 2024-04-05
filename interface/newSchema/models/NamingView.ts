/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PersonReference } from './PersonReference';
export type NamingView = {
    createdWhen: string;
    modifiedWhen: string;
    realType?: any;
    uid?: (string | null);
    label: string;
    subjectOfStatement: Array<PersonReference>;
    firstName: string;
    lastName: string;
};

