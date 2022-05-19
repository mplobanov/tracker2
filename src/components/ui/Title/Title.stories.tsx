import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './Title';
import { Formik } from 'formik';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Title',
    component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Formik initialValues={{
    title: "Подключить Яндекс авторизацию"
}} onSubmit={(values => console.log(values))}>
    {(props) => <Title {...args}/>}
</Formik>;

const Template2: ComponentStory<typeof Title> = (args) => <Formik initialValues={{
    title: "Нужно подключить авторзацию с помощью Yandex ID. Login Flow такой же, как и для всех других third-party сервисов. Нужно сохранять о ФИО и почте."
}} onSubmit={(values => console.log(values))}>
    {(props) => <Title {...args}/>}
</Formik>;

export const Primary = Template.bind({});
Primary.args = {
    name: 'title'
}

export const Secondary = Template2.bind({});
Secondary.args = {
    name: 'title',
    small: true
}

