/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_NamingReference_ } from '../models/ListResponse_NamingReference_';
import type { Naming } from '../models/Naming';
import type { NamingEdit } from '../models/NamingEdit';
import type { NamingReference } from '../models/NamingReference';
import type { NamingView } from '../models/NamingView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NamingService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_NamingReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_NamingReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Naming/',
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
     * Naming.View
     * @param uid
     * @returns NamingView Successful Response
     * @throws ApiError
     */
    public static namingView(
        uid: string,
    ): CancelablePromise<NamingView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Naming/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Naming.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static namingDeleteApiNamingUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Naming/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Naming.Create
     * @param requestBody
     * @returns NamingReference Successful Response
     * @throws ApiError
     */
    public static namingCreate(
        requestBody: Naming,
    ): CancelablePromise<NamingReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Naming/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Naming.Editget
     * @param uid
     * @returns NamingEdit Successful Response
     * @throws ApiError
     */
    public static namingEditGet(
        uid: string,
    ): CancelablePromise<NamingEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Naming/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Naming.Editpatch
     * @param uid
     * @param requestBody
     * @returns NamingReference Successful Response
     * @throws ApiError
     */
    public static namingEditPatch(
        uid: string,
        requestBody: NamingEdit,
    ): CancelablePromise<NamingReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Naming/edit/{uid}',
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
