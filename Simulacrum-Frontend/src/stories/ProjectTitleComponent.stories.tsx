import { Meta, Story } from '@storybook/react';
import ProjectTitleComponent from '../components/ProjectTitleComponent';
import { ProjectTitleComponentProps } from '../types/props/ProjectTitleComponentProps';

const meta: Meta = {
    title: 'Project/Project Title Component',
    component: ProjectTitleComponent,
    argTypes: {
        title: {
            defaultValue: "Ecological Project"
        }
    }
};


export default meta;


const Template: Story<ProjectTitleComponentProps> = (args) => <ProjectTitleComponent {...args}></ProjectTitleComponent>
export const Default = Template.bind({});

