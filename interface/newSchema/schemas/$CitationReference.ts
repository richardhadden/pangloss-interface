/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CitationReference = {
    properties: {
        uid: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        label: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
        realType: {
            properties: {
            },
        },
    },
} as const;
