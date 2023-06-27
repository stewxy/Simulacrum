import { Meta, Story } from '@storybook/react';
import ProfileDetailsComponent from '../components/ProfileDetailsComponent';
import { IconButton } from '@chakra-ui/react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { isLoggedIn } from '../utils';
import { ProfileDetailsComponentProps } from '../types/props/ProfileDetailsComponentProps';




const meta: Meta = {
    title: 'Grace/Profile details component',
    component: ProfileDetailsComponent,
    argTypes: {
        DetailName: {
            defaultValue: 'Project Joined'
        },

        IconType: {
            defaultValue:
                <IconButton
                    w={'60px'}
                    h={'20px'}
                    icon={<IoAddCircleOutline size={20} />}
                    aria-label='Add project'
                    borderRadius='20'
                    variant='outline'
                />
        },
        Projects: {
            defaultValue: [{
                "id": 1,
                "name": "Simulacrum 2",
                "projectLead": {
                    "firstName": "Mark",
                    "lastName": "Anklesaria",
                    "email": "marknzl@outlook.co.nz",
                    "username": "marknzl",
                    "profilePictureURL": "https://cs399group5storage.blob.core.windows.net/df409b1b-6370-41eb-a726-aa2152f92124/profile.gif"
                },
                "googleDriveURL": "https://drive.google.com/",
                "gitHubRepoURL": "https://github.com/",
                "jiraURL": "https://gansolutions.atlassian.net/jira/software/projects/SIGMA/boards/1",
                "discordURL": "https://discord.com/",
                "dateCreated": "2022-08-30T08:53:25.2347417",
                "description": "Simulacrum but not crap",
                "requiredSkills": [
                    "c#",
                    "typescript",
                    "react",
                    "sql",
                    "common-sense"
                ]
            },
            {
                "id": 2,
                "name": "string",
                "projectLead": {
                    "firstName": "Mark",
                    "lastName": "Anklesaria",
                    "email": "marknzl@outlook.co.nz",
                    "username": "marknzl",
                    "profilePictureURL": "https://cs399group5storage.blob.core.windows.net/df409b1b-6370-41eb-a726-aa2152f92124/profile.gif"
                },
                "googleDriveURL": "string",
                "gitHubRepoURL": "string",
                "jiraURL": "string",
                "discordURL": "string",
                "dateCreated": "2022-08-30T21:09:48.3825806",
                "description": "string",
                "requiredSkills": [
                    "string"
                ]
            },
            {
                "id": 4,
                "name": "string",
                "projectLead": {
                    "firstName": "Caleb",
                    "lastName": "Caleb",
                    "email": "cko780@aucklanduni.co.nz",
                    "username": "ko",
                    "profilePictureURL": null
                },
                "googleDriveURL": "string",
                "gitHubRepoURL": "string",
                "jiraURL": "string",
                "discordURL": "string",
                "dateCreated": "2022-08-31T02:06:45.3568923",
                "description": "string",
                "requiredSkills": [
                    "string"
                ]
            },
            {
                "id": 11,
                "name": "Project Red",
                "projectLead": {
                    "firstName": "Caleb",
                    "lastName": "Caleb",
                    "email": "cko780@aucklanduni.co.nz",
                    "username": "ko",
                    "profilePictureURL": null
                },
                "googleDriveURL": "Drive",
                "gitHubRepoURL": "Git",
                "jiraURL": "Jira",
                "discordURL": "Discord",
                "dateCreated": "2022-08-31T02:37:49.1556851",
                "description": "Bad game, over hype it ty",
                "requiredSkills": [
                    "bruh"
                ]
            },
            {
                "id": 30,
                "name": "Yes",
                "projectLead": {
                    "firstName": "Mark",
                    "lastName": "Anklesaria",
                    "email": "marknzl@outlook.co.nz",
                    "username": "marknzl",
                    "profilePictureURL": "https://cs399group5storage.blob.core.windows.net/df409b1b-6370-41eb-a726-aa2152f92124/profile.gif"
                },
                "googleDriveURL": "",
                "gitHubRepoURL": "No",
                "jiraURL": "",
                "discordURL": "",
                "dateCreated": "2022-08-31T03:09:59.9445512",
                "description": "Yes",
                "requiredSkills": [
                    "jello 😏"
                ]
            },
            {
                "id": 31,
                "name": "Yes🍆",
                "projectLead": {
                    "firstName": "Mark",
                    "lastName": "Anklesaria",
                    "email": "marknzl@outlook.co.nz",
                    "username": "marknzl",
                    "profilePictureURL": "https://cs399group5storage.blob.core.windows.net/df409b1b-6370-41eb-a726-aa2152f92124/profile.gif"
                },
                "googleDriveURL": "",
                "gitHubRepoURL": "No",
                "jiraURL": "",
                "discordURL": "",
                "dateCreated": "2022-08-31T03:10:20.1703083",
                "description": "Yes",
                "requiredSkills": [
                    "jello 😏"
                ]
            }
            ]
        }
    }
};

export default meta;

const Template: Story<ProfileDetailsComponentProps> = (args) => <ProfileDetailsComponent {...args}></ProfileDetailsComponent>
export const Default = Template.bind({});