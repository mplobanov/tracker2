import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Slug } from './Slug';
import {Avatar} from "../Avatar/Avatar";
import img1 from '../../../assets/isaac.jpg'
import img2 from '../../../assets/jacob.jpg'
import img3 from '../../../assets/jake.jpg'

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Slug',
    component: Slug,
} as ComponentMeta<typeof Slug>;

const Template: ComponentStory<typeof Slug> = (args) => <Slug {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    text: "yandex-auth",
}

