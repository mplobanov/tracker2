import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Page } from './Page';
import {Avatar} from "../Avatar/Avatar";
import img1 from '../../../assets/isaac.jpg'
import img2 from '../../../assets/jacob.jpg'
import img3 from '../../../assets/jake.jpg'

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Page',
    component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    children: <><Avatar imageUrl={img1} name={'Айзек'}/><Avatar imageUrl={img2} name={'Якоб'}/><Avatar imageUrl={img3} name={'Джейк'}/></>
}

