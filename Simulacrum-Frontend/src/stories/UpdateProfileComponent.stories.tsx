import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import UpdateProfileComponent from '../components/UpdateProfileComponent';
import { UpdateProfileComponentProps } from '../types/props/UpdateProfileComponentProps';

const meta: Meta = {
    title: 'Grace/UpdateProfileComponent',
    component: UpdateProfileComponent,
    argTypes: {
        firstName: {
            defaultValue: 'Bames William'
        },
        lastName: {
            defaultValue: 'Jlair'
        },
        email: {
            defaultValue: 'https://mail.google.com/mail/'
        },
        userProfilePic: {
            defaultValue: 'https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-superJumbo.jpg'
        },
        interestTags: {
            defaultValue: ['Python', 'Typescript', 'yue', 'aws', '.net', 'CSS', 'C', 'React', 'HTML', 'SQL']
        }
    }
};

export default meta;

const Template: Story<UpdateProfileComponentProps> = (args) => <UpdateProfileComponent {...args}></UpdateProfileComponent>
export const Default = Template.bind({});