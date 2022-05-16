import React from 'react';
import '../../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} onClick={() => {console.log('click')}}/>;

export const Primary = Template.bind({});
Primary.args = {
    text: <span>Создать</span>
}

export const Secondary = Template.bind({});
Secondary.args = {
    text: <span>Новая задача</span>,
    secondary: true
}

