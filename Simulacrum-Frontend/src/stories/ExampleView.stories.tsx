import { Meta, Story } from "@storybook/react";
import ExampleView from "../views/ExampleView";

const meta: Meta = {
    title: 'Examples/Example View',
    component: ExampleView
};

export default meta;

const Template: Story = () => <ExampleView></ExampleView>
export const Default = Template.bind({});