import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import NavbarComponent from '../components/NavbarComponent';

const meta: Meta = {
    title: 'Navigation/Navbar Component',
    component: NavbarComponent
};

export default meta;

const Template: Story = () => <NavbarComponent></NavbarComponent>
export const Default = Template.bind({});