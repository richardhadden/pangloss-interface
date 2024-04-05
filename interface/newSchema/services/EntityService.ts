/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_EntityReference_ } from '../models/ListResponse_EntityReference_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EntityService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_EntityReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_EntityReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Entity/',
            query: {
                'q': q,
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
