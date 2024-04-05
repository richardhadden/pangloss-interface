/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Person = {
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
    },
} as const;
