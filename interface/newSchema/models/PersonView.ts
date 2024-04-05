/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BirthReference } from './BirthReference';
import type { DeathReference } from './DeathReference';
export type PersonView = {
    createdWhen: string;
    modifiedWhen: string;
    isSubjectOfStatement?: null;
    hasBirthEvent?: (Array<BirthReference> | null);
    hasDeathEvent?: (Array<DeathReference> | null);
    realType?: any;
    uid?: (string | null);
    label: string;
};

