import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ExampleStyledComponent from '../components/ExampleStyledComponent';
import { ExampleStyledComponentProps } from '../types/props/ExampleStyledComponentProps';

const meta: Meta = {
    title: 'Examples/Example Styled Component',
    component: ExampleStyledComponent,
    argTypes: {
        boxTitle: {
            defaultValue: 'A box'
        },
        backgroundColour: {
            defaultValue: 'black'
        },
        progressValue: {
            defaultValue: 69
        },
        badgeName: {
            defaultValue: 'Badge name'
        }
    }
};

export default meta;

const Template: Story<ExampleStyledComponentProps> = (args) => <ExampleStyledComponent {...args}></ExampleStyledComponent>
export const Default = Template.bind({});