import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Comment } from './Comment';
import {Comment as CommentDTO, User} from '../../../services/openapi';
import { Formik } from 'formik';
import img from '../../../assets/housine.jpg';
import 'moment/locale/ru';
import moment from "moment";

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Comment',
    component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => <Formik initialValues={{
    comment: {
        text: "Подключить Яндекс авторизацию",
        author_id: "abacaba",
        created_at: "2022-05-17T19:54:47.813000+00:00",
    } as CommentDTO
}} onSubmit={(values => console.log(values))}>
    {(props) => <Comment {...args}/>}
</Formik>;

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

moment.locale('ru');

export const Editable = Template.bind({});
Editable.args = {
    name: 'comment',
    getCurrentUserId: () => "abacaba",
    getUserByAuthorId: async () => {
        await timeout(2000);
        return {
            name: "Хусин",
            photoUrl: img,
        } as User
    }

}

const Template2: ComponentStory<typeof Comment> = (args) => <Formik initialValues={{
    comment: {
        text: "",
        author_id: "abacaba",
        created_at: "2022-05-17T19:54:47.813000+00:00",
    } as CommentDTO
}} onSubmit={(values => console.log(values))}>
    {(props) => <Comment {...args}/>}
</Formik>;

export const New = Template2.bind({});
New.args = {
    name: 'comment',
    getCurrentUserId: () => "abacaba",
    getUserByAuthorId: async () => {
        await timeout(2000);
        return {
            name: "Хусин",
            photoUrl: img,
        } as User
    },
    placeholder: "Хусин, напишите и вы что нибудь",

}

