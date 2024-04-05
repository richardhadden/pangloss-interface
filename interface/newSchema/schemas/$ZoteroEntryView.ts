/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ZoteroEntryView = {
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
        modifiedBy: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
