/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Death } from '../models/Death';
import type { DeathEdit } from '../models/DeathEdit';
import type { DeathReference } from '../models/DeathReference';
import type { DeathView } from '../models/DeathView';
import type { ListResponse_DeathReference_ } from '../models/ListResponse_DeathReference_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeathService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_DeathReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_DeathReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Death/',
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
     * Death.View
     * @param uid
     * @returns DeathView Successful Response
     * @throws ApiError
     */
    public static deathView(
        uid: string,
    ): CancelablePromise<DeathView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Death/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Death.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deathDeleteApiDeathUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Death/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Death.Create
     * @param requestBody
     * @returns DeathReference Successful Response
     * @throws ApiError
     */
    public static deathCreate(
        requestBody: Death,
    ): CancelablePromise<DeathReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Death/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Death.Editget
     * @param uid
     * @returns DeathEdit Successful Response
     * @throws ApiError
     */
    public static deathEditGet(
        uid: string,
    ): CancelablePromise<DeathEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Death/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Death.Editpatch
     * @param uid
     * @param requestBody
     * @returns DeathReference Successful Response
     * @throws ApiError
     */
    public static deathEditPatch(
        uid: string,
        requestBody: DeathEdit,
    ): CancelablePromise<DeathReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Death/edit/{uid}',
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
