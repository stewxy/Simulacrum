import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import CreateProjectButtonComponent from '../components/CreateProjectButtonComponent';
import { SearchButtonProps } from '../types/props/SearchButtonProps';

const meta: Meta = {
    title: 'Navigation/Create project button Component',
    component: CreateProjectButtonComponent,
    argTypes: {
        width: {
            defaultValue: "95px"
        },
        height: {
            defaultValue: "30px"
        },
        fontSize: {
            defaultValue: "12px"
        }

    }
};
export default meta;

const Template: Story<SearchButtonProps> = (args) => <CreateProjectButtonComponent {...args}></CreateProjectButtonComponent>
export const Default = Template.bind({});