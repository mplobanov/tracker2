import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Datepicker } from './Datepicker';
import {Formik} from "formik";

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Datepicker',
    component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (args) => <Formik initialValues={{
    title: "2022-05-19T10:52:33"
}} onSubmit={(values => console.log(values))}>
    {(props) => <Datepicker {...args}/>}
</Formik>;

export const Primary = Template.bind({});
Primary.args = {
    name: "title",
}


