import { Meta, Story } from "@storybook/react";
import { Component } from "react";
import RegistrationView from "../views/RegistrationView";

const meta: Meta = {
    title: 'Views/Registration View',
    component: RegistrationView
};

export default meta;

const Template: Story = () => <RegistrationView></RegistrationView>
export const Default = Template.bind({});