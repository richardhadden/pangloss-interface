/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Birth } from '../models/Birth';
import type { BirthEdit } from '../models/BirthEdit';
import type { BirthReference } from '../models/BirthReference';
import type { BirthView } from '../models/BirthView';
import type { ListResponse_BirthReference_ } from '../models/ListResponse_BirthReference_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BirthService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_BirthReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_BirthReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Birth/',
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
     * Birth.View
     * @param uid
     * @returns BirthView Successful Response
     * @throws ApiError
     */
    public static birthView(
        uid: string,
    ): CancelablePromise<BirthView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Birth/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Birth.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static birthDeleteApiBirthUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Birth/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Birth.Create
     * @param requestBody
     * @returns BirthReference Successful Response
     * @throws ApiError
     */
    public static birthCreate(
        requestBody: Birth,
    ): CancelablePromise<BirthReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Birth/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Birth.Editget
     * @param uid
     * @returns BirthEdit Successful Response
     * @throws ApiError
     */
    public static birthEditGet(
        uid: string,
    ): CancelablePromise<BirthEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Birth/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Birth.Editpatch
     * @param uid
     * @param requestBody
     * @returns BirthReference Successful Response
     * @throws ApiError
     */
    public static birthEditPatch(
        uid: string,
        requestBody: BirthEdit,
    ): CancelablePromise<BirthReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Birth/edit/{uid}',
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
