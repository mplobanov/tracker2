import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';
import img from '../../../assets/housine.jpg';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Avatar',
    component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} onClick={() => {console.log('click')}}/>;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Хусин',
    imageUrl: img,
}

export const Big = Template.bind({});
Big.args = {
    name: 'Хусин',
    imageUrl: img,
    big: true,
    reverse: true,
}

export const Reverse = Template.bind({});
Reverse.args = {
    name: 'Хусин',
    imageUrl: img,
    reverse: true,
}

export const NameLess = Template.bind({});
NameLess.args = {
    imageUrl: img,
}