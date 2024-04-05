/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Factoid } from '../models/Factoid';
import type { FactoidEdit_Input } from '../models/FactoidEdit_Input';
import type { FactoidEdit_Output } from '../models/FactoidEdit_Output';
import type { FactoidReference } from '../models/FactoidReference';
import type { FactoidView } from '../models/FactoidView';
import type { ListResponse_FactoidReference_ } from '../models/ListResponse_FactoidReference_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FactoidService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_FactoidReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_FactoidReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Factoid/',
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
     * Factoid.View
     * @param uid
     * @returns FactoidView Successful Response
     * @throws ApiError
     */
    public static factoidView(
        uid: string,
    ): CancelablePromise<FactoidView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Factoid/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Factoid.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static factoidDeleteApiFactoidUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Factoid/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Factoid.Create
     * @param requestBody
     * @returns FactoidReference Successful Response
     * @throws ApiError
     */
    public static factoidCreate(
        requestBody: Factoid,
    ): CancelablePromise<FactoidReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Factoid/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Factoid.Editget
     * @param uid
     * @returns FactoidEdit_Output Successful Response
     * @throws ApiError
     */
    public static factoidEditGet(
        uid: string,
    ): CancelablePromise<FactoidEdit_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Factoid/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Factoid.Editpatch
     * @param uid
     * @param requestBody
     * @returns FactoidReference Successful Response
     * @throws ApiError
     */
    public static factoidEditPatch(
        uid: string,
        requestBody: FactoidEdit_Input,
    ): CancelablePromise<FactoidReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Factoid/edit/{uid}',
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
