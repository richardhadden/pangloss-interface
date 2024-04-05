/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeathEdit = {
    properties: {
        uid: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        realType: {
            properties: {
            },
        },
        personBorn: {
            type: 'array',
            contains: {
                type: 'PersonReference',
            },
        },
    },
} as const;
