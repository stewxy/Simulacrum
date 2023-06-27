import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import CardComponent from '../components/CardComponent';
import { CardComponentProps } from '../types/props/CardComponentProps';

const meta: Meta = {
    title: 'Home/Card Component',
    component: CardComponent,
    argTypes: {
        projectName: {
            defaultValue: "Originium Arts Project"
        },
        description: {
            defaultValue: "The department that dives into the basic principles of Originium Arts and its application."
        },
        date: {
            defaultValue: "Date created: 20/04/1969"
        },
        user: {
            defaultValue: "b4m3s_jl4ir "
        },
        tags: {
            defaultValue: ['C#', 'Java', 'JavaScript', 'HTML', '.NET', 'Azure']
        }
    }
};
export default meta;

const Template: Story<CardComponentProps> = (args) => <CardComponent {...args}></CardComponent>
export const Default = Template.bind({});