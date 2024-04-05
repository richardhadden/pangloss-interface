/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FactoidEdit_Output = {
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
        statements: {
            type: 'array',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'BirthEdit',
                }, {
                    type: 'NamingEdit',
                }, {
                    type: 'DeathEdit',
                }],
            },
        },
        citation: {
            type: 'array',
            contains: {
                type: 'CitationEmbedded',
            },
        },
        label: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
    },
} as const;
