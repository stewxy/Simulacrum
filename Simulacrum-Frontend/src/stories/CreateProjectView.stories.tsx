import { Meta, Story } from "@storybook/react";
import { Component } from "react";
import CreateProjectView from "../views/CreateProjectStep1View";

const meta: Meta = {
    title: 'Views/CreateProjectView',
    component: CreateProjectView
};

export default meta;

const Template: Story = () => <CreateProjectView></CreateProjectView>
export const Default = Template.bind({});