import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ExampleComponent from '../components/ExampleComponent';
import { ExampleComponentProps } from '../types/props/ExampleComponentProps';

const meta: Meta = {
    title: 'Examples/Example Component',
    component: ExampleComponent,
    argTypes: {
        title: {
            defaultValue: 'Project Title'
        },
        description: {
            defaultValue: 'Project Description'
        },
        id: {
            defaultValue: 69
        }
    }
};

export default meta;

const Template: Story<ExampleComponentProps> = (args) => <ExampleComponent {...args}></ExampleComponent>
export const Default = Template.bind({});

export const Custom = Template.bind({});
Custom.args = {
    title: 'yes',
    description: 'awd',
    id: 420
};