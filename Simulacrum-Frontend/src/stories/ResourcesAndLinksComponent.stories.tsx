import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ResourcesAndLinksComponent from '../components/ResourcesAndLinksComponent';
import { ResourceAndLinksComponentProps } from '../types/props/ResourceAndLinksComponentProps';

const meta: Meta = {
    title: 'Project/ResourcesAndLinksComponent',
    component: ResourcesAndLinksComponent,
    argTypes: {
        googleDriveURL: {
            defaultValue: 'https://drive.google.com/'
        },
        jiraURL: {
            defaultValue: 'https://www.atlassian.com/software/jira'
        },
        githubURL: {
            defaultValue: 'https://github.com/'
        },
        discordURL: {
            defaultValue: 'https://discord.com/'
        }
    }
};

export default meta;
const Template: Story<ResourceAndLinksComponentProps> = (args) => <ResourcesAndLinksComponent {...args}></ResourcesAndLinksComponent>
export const Default = Template.bind({});