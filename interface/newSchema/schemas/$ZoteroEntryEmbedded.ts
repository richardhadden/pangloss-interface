/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ZoteroEntryEmbedded = {
    properties: {
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
        zoteroKey: {
            type: 'string',
            isRequired: true,
        },
        zoteroGroupId: {
            type: 'number',
            isRequired: true,
        },
        zoteroGroupName: {
            type: 'string',
            isRequired: true,
        },
        zoteroVersion: {
            type: 'number',
            isRequired: true,
        },
        zoteroUrl: {
            type: 'string',
            isRequired: true,
            format: 'uri',
            maxLength: 2083,
            minLength: 1,
        },
        csljson: {
            type: 'string',
            isRequired: true,
        },
        bib: {
            type: 'string',
            isRequired: true,
        },
        citation: {
            type: 'string',
            isRequired: true,
        },
        createdBy: {
            type: 'string',
            isRequired: true,
        },
        createdWhen: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        modifiedBy: {
            type: 'string',
            isRequired: true,
        },
        modifiedWhen: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
