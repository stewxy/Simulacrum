import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ExampleComponentGrace from '../components/ExampleComponentGrace';
import { ExampleComponentPropsGrace } from '../types/props/ExampleComponentPropsGrace';

const meta: Meta = {
    title: 'Examples/Example Grace',
    component: ExampleComponentGrace,
    argTypes: {
        firstName: {
            defaultValue: 'Grace'
        },
        lastName: {
            defaultValue: 'Kim'
        },
        description: {
            defaultValue: "Gei"
        }
    }
};

export default meta;

const Template: Story<ExampleComponentPropsGrace> = (args) => <ExampleComponentGrace {...args}></ExampleComponentGrace>
export const Default = Template.bind({});