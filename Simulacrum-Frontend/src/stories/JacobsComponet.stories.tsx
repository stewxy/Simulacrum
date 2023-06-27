import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import JacobsComponent from '../components/JacobsComponent';
import { JacobsComponentProps } from '../types/props/JacobsComponentProps';

const meta: Meta = {
    title: 'Examples/Jacobs Component',
    component: JacobsComponent,
    argTypes: {
        name: {
            defaultValue: 'Jacob'
        },
        coolSkills: {
            defaultValue: 'Getting the $5 tuck shop voucher'
        },
        expectedSalary: {
            defaultValue: 16
        }
    }
};

export default meta;

const Template: Story<JacobsComponentProps> = (args) => <JacobsComponent {...args}></JacobsComponent>
export const Default = Template.bind({});