/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Factoid = {
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
        citation: {
            type: 'array',
            contains: {
                type: 'CitationEmbedded',
            },
            isRequired: true,
        },
        statements: {
            type: 'array',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'Birth',
                }, {
                    type: 'Death',
                }, {
                    type: 'Naming',
                }],
            },
            isRequired: true,
        },
    },
} as const;
