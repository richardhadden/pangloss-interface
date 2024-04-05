/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_UserLogin_api_users_login_post } from '../models/Body_UserLogin_api_users_login_post';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserView } from '../models/UserView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Userlogin
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static userLoginApiUsersLoginPost(
        formData: Body_UserLogin_api_users_login_post,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Userlogout
     * @returns string Successful Response
     * @throws ApiError
     */
    public static userLogoutApiUsersLogoutGet(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/logout',
        });
    }
    /**
     * Currentuser
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public static currentUserApiUsersCurrentUserGet(): CancelablePromise<UserView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/current_user',
        });
    }
    /**
     * Read Users Me
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUsersMeApiUsersMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }
    /**
     * Read Own Items
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readOwnItemsApiUsersMeItemsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/items',
        });
    }
    /**
     * Createuser
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createUserApiUsersNewPost(
        requestBody: UserCreate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
