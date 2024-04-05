/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_SomethingReference_ } from '../models/ListResponse_SomethingReference_';
import type { Something } from '../models/Something';
import type { SomethingEdit } from '../models/SomethingEdit';
import type { SomethingReference } from '../models/SomethingReference';
import type { SomethingView } from '../models/SomethingView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SomethingService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_SomethingReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_SomethingReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Something/',
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
     * Something.View
     * @param uid
     * @returns SomethingView Successful Response
     * @throws ApiError
     */
    public static somethingView(
        uid: string,
    ): CancelablePromise<SomethingView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Something/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Something.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static somethingDeleteApiSomethingUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Something/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Something.Create
     * @param requestBody
     * @returns SomethingReference Successful Response
     * @throws ApiError
     */
    public static somethingCreate(
        requestBody: Something,
    ): CancelablePromise<SomethingReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Something/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Something.Editget
     * @param uid
     * @returns SomethingEdit Successful Response
     * @throws ApiError
     */
    public static somethingEditGet(
        uid: string,
    ): CancelablePromise<SomethingEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Something/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Something.Editpatch
     * @param uid
     * @param requestBody
     * @returns SomethingReference Successful Response
     * @throws ApiError
     */
    public static somethingEditPatch(
        uid: string,
        requestBody: SomethingEdit,
    ): CancelablePromise<SomethingReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Something/edit/{uid}',
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
