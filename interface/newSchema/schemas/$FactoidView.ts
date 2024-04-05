/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FactoidView = {
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
