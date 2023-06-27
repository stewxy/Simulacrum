import { Meta, Story } from "@storybook/react";
import { Component } from "react";
import SearchView from "../views/SearchView";

const meta: Meta = {
    title: 'Views/SearchView',
    component: SearchView
};

export default meta;

const Template: Story = () => <SearchView></SearchView>
export const Default = Template.bind({});