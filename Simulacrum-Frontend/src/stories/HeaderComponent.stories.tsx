import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import HeaderComponent from '../components/HeaderComponent';
import { HeaderComponentProps } from '../types/props/HeaderComponentProps';


const meta: Meta = {
    title: 'Navigation/Header Component',
    component: HeaderComponent,
    argTypes: {
        headerName: {
            defaultValue: "Projects"
        }
    }
};
export default meta;

const Template: Story<HeaderComponentProps> = (args) => <HeaderComponent {...args}></HeaderComponent>
export const Default = Template.bind({});