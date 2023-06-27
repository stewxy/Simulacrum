import { Meta, Story } from "@storybook/react";
import { Component } from "react";
import RegisterSkillsView from "../views/RegisterSkillsView";

const meta: Meta = {
    title: 'Views/Register Skills View',
    component: RegisterSkillsView
};

export default meta;

const Template: Story = () => <RegisterSkillsView></RegisterSkillsView>
export const Default = Template.bind({});