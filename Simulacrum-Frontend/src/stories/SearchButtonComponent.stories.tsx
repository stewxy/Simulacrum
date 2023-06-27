import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SearchButtonComponent from '../components/SearchButtonComponent';
import { SearchButtonProps } from '../types/props/SearchButtonProps';

const meta: Meta = {
    title: 'Navigation/Search button Component',
    component: SearchButtonComponent,
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

const Template: Story<SearchButtonProps> = (args) => <SearchButtonComponent {...args}></SearchButtonComponent>
export const Default = Template.bind({});