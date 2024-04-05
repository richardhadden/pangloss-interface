/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SomethingEdit = {
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
        realType: {
            properties: {
            },
        },
        label: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
