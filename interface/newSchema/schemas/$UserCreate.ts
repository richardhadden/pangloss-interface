/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreate = {
    properties: {
        username: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
        },
        full_name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        admin: {
            type: 'boolean',
            isReadOnly: true,
        },
        disabled: {
            type: 'boolean',
            isReadOnly: true,
        },
        password: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
