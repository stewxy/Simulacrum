import { Meta, Story } from "@storybook/react";
import React from "react";
import { Component } from "react";
import ViewProjectView from "../views/ViewProjectView";

const meta: Meta = {
    title: 'Views/ViewProjectView',
    component: ViewProjectView
};

export default meta;

const Template: Story = () => <ViewProjectView></ViewProjectView>
export const Default = Template.bind({});