/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_PersonReference_ } from '../models/ListResponse_PersonReference_';
import type { Person } from '../models/Person';
import type { PersonEdit } from '../models/PersonEdit';
import type { PersonReference } from '../models/PersonReference';
import type { PersonView } from '../models/PersonView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonService {
    /**
     * List
     * @param q
     * @param page
     * @param pageSize
     * @returns ListResponse_PersonReference_ Successful Response
     * @throws ApiError
     */
    public static list(
        q?: (string | null),
        page: number = 1,
        pageSize: number = 25,
    ): CancelablePromise<ListResponse_PersonReference_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Person/',
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
     * Person.View
     * @param uid
     * @returns PersonView Successful Response
     * @throws ApiError
     */
    public static personView(
        uid: string,
    ): CancelablePromise<PersonView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Person/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Person.Delete
     * @param uid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static personDeleteApiPersonUidDelete(
        uid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Person/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Person.Create
     * @param requestBody
     * @returns PersonReference Successful Response
     * @throws ApiError
     */
    public static personCreate(
        requestBody: Person,
    ): CancelablePromise<PersonReference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Person/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Person.Editget
     * @param uid
     * @returns PersonEdit Successful Response
     * @throws ApiError
     */
    public static personEditGet(
        uid: string,
    ): CancelablePromise<PersonEdit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Person/edit',
            query: {
                'uid': uid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Person.Editpatch
     * @param uid
     * @param requestBody
     * @returns PersonReference Successful Response
     * @throws ApiError
     */
    public static personEditPatch(
        uid: string,
        requestBody: PersonEdit,
    ): CancelablePromise<PersonReference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Person/edit/{uid}',
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
