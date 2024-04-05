/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonView = {
    properties: {
        createdWhen: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        modifiedWhen: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        isSubjectOfStatement: {
            type: 'any-of',
            contains: [{
                type: 'null',
            }],
        },
        hasBirthEvent: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'BirthReference',
                },
            }, {
                type: 'null',
            }],
        },
        hasDeathEvent: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'DeathReference',
                },
            }, {
                type: 'null',
            }],
        },
        realType: {
            properties: {
            },
        },
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
    },
} as const;
