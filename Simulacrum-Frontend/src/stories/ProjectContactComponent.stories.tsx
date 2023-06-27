import { Meta, Story } from '@storybook/react';
import ProjectContactComponent from '../components/ProjectContactComponent';
import { ProjectContactComponentProps } from '../types/props/ProjectContactComponentProps';

const meta: Meta = {
    title: 'Project/ProjectContactComponent',
    component: ProjectContactComponent,
    argTypes: {
        projectLead: {
            defaultValue: 'b4m3s_jl4ir'
        },
        date: {
            defaultValue: '20/04/1969'
        },
        email: {
            defaultValue: 'b4m3s_jl4ir@example.com'
        },
        projectId:{
            defaultValue: 1
        }
    }

};

export default meta;
const Template: Story<ProjectContactComponentProps> = (args) => <ProjectContactComponent {...args}></ProjectContactComponent>
export const Default = Template.bind({});