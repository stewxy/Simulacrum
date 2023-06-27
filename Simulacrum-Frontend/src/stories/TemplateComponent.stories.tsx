import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import TemplateComponent from '../components/TemplateComponent';
import { TemplateProp } from '../types/props/TemplateProp';

const meta: Meta = {
    title: 'Examples/Template Component',
    component: TemplateComponent,
    argTypes: {
        slot1: {
            defaultValue: "Home"
        },
        slot2: {
            defaultValue: "Projects"
        },
        slot3: {
            defaultValue: "Profile"
        },
        slot4: {
            defaultValue: "Favourites"
        },
    }
};
export default meta;

const Template: Story<TemplateProp> = (args) => <TemplateComponent {...args}></TemplateComponent>
export const Default = Template.bind({});