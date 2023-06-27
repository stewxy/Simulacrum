import { Meta, Story } from '@storybook/react';
import SpinnerComponent from '../components/SpinnerComponent';

const meta: Meta = {
    title: 'Navigation/Spinner Component',
    component: SpinnerComponent
};

export default meta;

const Template: Story = () => <SpinnerComponent></SpinnerComponent>
export const Default = Template.bind({});