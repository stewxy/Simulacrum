import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import LogoutComponent from '../components/LogoutComponent';

const meta: Meta = {
    title: 'Navigation/Log out button',
    component: LogoutComponent
};
export default meta;

const Template: Story =  () => <LogoutComponent></LogoutComponent>
export const Default = Template.bind({});