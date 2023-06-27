import { Meta, Story } from '@storybook/react';
import SelfContainedViewExample from '../views/SelfContainedViewExample';

const meta: Meta = {
    title: 'Examples/Self contained view example',
    component: SelfContainedViewExample
};

export default meta;

const Template: Story = () => <SelfContainedViewExample></SelfContainedViewExample>
export const Default = Template.bind({});