/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Death = {
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
