import { Meta, Story } from '@storybook/react';
import {ProfileUserCardComponentProps} from '../types/props/ProfileUserCardComponentProps';
import ProfileUserCardComponent from '../components/ProfileUserCardComponent';

const meta: Meta = {
    title: 'Profile/Profile user card component',
    component: ProfileUserCardComponent,
    argTypes: {
        firstName: {
            defaultValue: 'Bames William'
        },
        lastName: {
            defaultValue: 'Jlair'
        },
        userProfilePic:{
            defaultValue: 'https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-superJumbo.jpg'
        },
        userDescription: {
            defaultValue: "Senior software developer at Crown Data Systems"
        },
        projectsJoined: {
            defaultValue: 4
        },
        projectsWaitlisted: {
            defaultValue: 2
        },
        projectsCreated: {
            defaultValue: 0
        },
        interestTags: {
            defaultValue: ['Python', 'Typescript', 'yue', 'aws', '.net', 'CSS', 'C', 'React', 'HTML', 'SQL']
        },
        githubURL: {
            defaultValue: 'https://github.com/'
        },
        discordURL: {
            defaultValue: 'https://discord.com/'
        },
        emailURL: {
            defaultValue: 'https://mail.google.com/mail/'
        }
    }
};

export default meta;

const Template: Story<ProfileUserCardComponentProps> = (args) => <ProfileUserCardComponent {...args}></ProfileUserCardComponent>
export const Default = Template.bind({});