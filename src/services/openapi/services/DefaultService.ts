/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Task } from '../models/Task';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * All Tasks
     * @returns Task Successful Response
     * @throws ApiError
     */
    public static allTasksListGet(): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/list',
        });
    }

    /**
     * Get Task
     * @param slug
     * @returns Task Successful Response
     * @throws ApiError
     */
    public static getTaskTaskSlugGet(
        slug: string,
    ): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/task/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Verify
     * @param token
     * @returns string Successful Response
     * @throws ApiError
     */
    public static verifyVerifyGet(
        token: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/verify',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User
     * @param uid
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUserUserUidGet(
        uid: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{uid}',
            path: {
                'uid': uid,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Task
     * @param slug
     * @param requestBody
     * @returns Task Successful Response
     * @throws ApiError
     */
    public static updateTaskTaskSlugUpdatePost(
        slug: string,
        requestBody: Task,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/task/{slug}/update',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Task
     * @param requestBody
     * @returns Task Successful Response
     * @throws ApiError
     */
    public static createTaskTaskCreatePost(
        requestBody: Task,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/task/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}