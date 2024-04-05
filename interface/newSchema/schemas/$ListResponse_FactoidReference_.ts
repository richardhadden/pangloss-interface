/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ListResponse_FactoidReference_ = {
    properties: {
        results: {
            type: 'array',
            contains: {
                type: 'FactoidReference',
            },
            isRequired: true,
        },
        page: {
            type: 'number',
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
        totalPages: {
            type: 'number',
            isRequired: true,
        },
        nextPage: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        previousPage: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        nextUrl: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        previousUrl: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
