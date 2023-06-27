import { Meta, Story } from "@storybook/react";
import React from "react";
import UpdateProfileView from "../views/UpdateProfileView";

const meta: Meta = {
    title: 'Views/UpdateProfileView',
    component: UpdateProfileView
};

export default meta;

const Template: Story = () => <UpdateProfileView></UpdateProfileView>
export const Default = Template.bind({});