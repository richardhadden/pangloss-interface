/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitationView } from '../models/CitationView';
import type { ListResponse_CitationReference_ } from '../models/ListResponse_CitationReference_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CitationService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_CitationReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_CitationReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citation/',
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
    /**
     * Citation.View
     * @param uid
     * @returns CitationView Successful Response
     * @throws ApiError
     */
    public static citationView(
        uid: string,
    ): CancelablePromise<CitationView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citation/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
