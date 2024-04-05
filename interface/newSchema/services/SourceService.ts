/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_SourceReference_ } from '../models/ListResponse_SourceReference_';
import type { Source } from '../models/Source';
import type { SourceEdit } from '../models/SourceEdit';
import type { SourceReference } from '../models/SourceReference';
import type { SourceView } from '../models/SourceView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SourceService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_SourceReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_SourceReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Source/',
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
     * Source.View
     * @param uid
     * @returns SourceView Successful Response
     * @throws ApiError
     */
    public static sourceView(
        uid: string,
    ): CancelablePromise<SourceView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Source/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Source.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sourceDeleteApiSourceUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Source/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Source.Create
     * @param requestBody
     * @returns SourceReference Successful Response
     * @throws ApiError
     */
    public static sourceCreate(
        requestBody: Source,
    ): CancelablePromise<SourceReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Source/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Source.Editget
     * @param uid
     * @returns SourceEdit Successful Response
     * @throws ApiError
     */
    public static sourceEditGet(
        uid: string,
    ): CancelablePromise<SourceEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Source/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Source.Editpatch
     * @param uid
     * @param requestBody
     * @returns SourceReference Successful Response
     * @throws ApiError
     */
    public static sourceEditPatch(
        uid: string,
        requestBody: SourceEdit,
    ): CancelablePromise<SourceReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Source/edit/{uid}',
            path: {
                'uid': uid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
