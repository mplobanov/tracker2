/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { Status } from '../models/Status';
import type { Task } from '../models/Task';
import type { User } from '../models/User';
import type { UserEntry } from '../models/UserEntry';

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
     * Task Exists
     * @param slug
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static taskExistsTaskExistsSlugGet(
        slug: string,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/task/exists/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
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
                400: `Bad Request`,
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
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Status List
     * @returns Status Successful Response
     * @throws ApiError
     */
    public static getStatusListStatusListGet(): CancelablePromise<Array<Status>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status/list',
        });
    }

    /**
     * Get Status List
     * @param requestBody
     * @returns Status Successful Response
     * @throws ApiError
     */
    public static getStatusListStatusCreatePost(
        requestBody: Status,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/status/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User List
     * @returns UserEntry Successful Response
     * @throws ApiError
     */
    public static getUserListUserlistGet(): CancelablePromise<Array<UserEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/userlist',
        });
    }

}