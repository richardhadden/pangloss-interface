/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_ZoteroEntryReference_ } from '../models/ListResponse_ZoteroEntryReference_';
import type { ZoteroEntryView } from '../models/ZoteroEntryView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ZoteroEntryService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_ZoteroEntryReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_ZoteroEntryReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ZoteroEntry/',
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
     * Zoteroentry.View
     * @param uid
     * @returns ZoteroEntryView Successful Response
     * @throws ApiError
     */
    public static zoteroEntryView(
        uid: string,
    ): CancelablePromise<ZoteroEntryView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ZoteroEntry/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
