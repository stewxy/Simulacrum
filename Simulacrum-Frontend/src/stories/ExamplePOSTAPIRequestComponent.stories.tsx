import { Meta, Story } from '@storybook/react';
import ExamplePOSTAPIRequestComponent from '../components/ExamplePOSTAPIRequestComponent';

const meta: Meta = {
    title: 'Examples/API Examples/Example POST API Request Component',
    component: ExamplePOSTAPIRequestComponent
};

export default meta;

const Template: Story = () => <ExamplePOSTAPIRequestComponent></ExamplePOSTAPIRequestComponent>
export const Default = Template.bind({});