import { Meta, Story } from "@storybook/react";
import { Component } from "react";
import LogInView from "../views/LogInView";

const meta: Meta = {
    title: 'Views/LogIn View',
    component: LogInView
};

export default meta;

const Template: Story = () => <LogInView></LogInView>
export const Default = Template.bind({});