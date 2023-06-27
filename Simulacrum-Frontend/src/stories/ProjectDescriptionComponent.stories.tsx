import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ProjectDescriptionComponent from '../components/ProjectDescriptionComponent';
import { ProjectDescriptionComponentProps } from '../types/props/ProjectDescriptionComponent';

const meta: Meta = {
    title: 'Project/ProjectDescriptionComponent',
    component: ProjectDescriptionComponent,
    argTypes: {
        description: {
            defaultValue: "The department that dives into the basic principles of Originium Arts and its application."
        },
        interestTags: {
            defaultValue: ['C', 'C#', 'JavaScript', 'TypeScript', '.NET', 'Azure', 'Cloud']
        }
    }
};

export default meta;
const Template: Story<ProjectDescriptionComponentProps> = (args) => <ProjectDescriptionComponent {...args}></ProjectDescriptionComponent>
export const Default = Template.bind({});