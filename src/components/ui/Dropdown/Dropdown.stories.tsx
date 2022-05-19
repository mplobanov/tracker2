import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown } from './Dropdown';
import {Title} from "../Title/Title";
import {Formik} from "formik";

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Formik initialValues={{
    title: "Тестируется"
}} onSubmit={(values => console.log(values))}>
    {(props) => <Dropdown {...args}/>}
</Formik>;

export const Primary = Template.bind({});
Primary.args = {
    name: "title",
    choices: ["В работе", "Завершено", "Код-ревью"],
}


