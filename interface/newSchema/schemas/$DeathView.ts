/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeathView = {
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
        when: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
        personBorn: {
            type: 'array',
            contains: {
                type: 'PersonReference',
            },
            isRequired: true,
        },
    },
} as const;
