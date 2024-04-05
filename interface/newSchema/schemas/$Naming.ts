/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Naming = {
    properties: {
        uid: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'uuid',
            }, {
                type: 'null',
            }],
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
        subjectOfStatement: {
            type: 'array',
            contains: {
                type: 'PersonReference',
            },
            isRequired: true,
        },
        firstName: {
            type: 'string',
            isRequired: true,
        },
        lastName: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
