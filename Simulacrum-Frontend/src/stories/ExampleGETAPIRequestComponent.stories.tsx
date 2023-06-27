import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ExampleGETAPIRequestComponent from '../components/ExampleGETAPIRequestComponent';

const meta: Meta = {
    title: 'Examples/API Examples/Example GET API Request Component',
    component: ExampleGETAPIRequestComponent
};

export default meta;

const Template: Story = () => <ExampleGETAPIRequestComponent></ExampleGETAPIRequestComponent>
export const Default = Template.bind({});