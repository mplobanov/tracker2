/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Comment } from './Comment';

export type Task = {
    name: string;
    description: string;
    author_id: string;
    comments: Array<Comment>;
    assignee_id: string;
    follower_ids: Array<string>;
    slug: string;
    deadline?: string;
    status: string;
};
