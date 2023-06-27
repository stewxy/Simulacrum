import { Meta, Story } from '@storybook/react';
import ProfileView from '../views/ProfileView';

const meta: Meta = {
    title: 'Grace/Profile view',
    component: ProfileView
};
export default meta;

const Template: Story = () => <ProfileView></ProfileView>
export const Default = Template.bind({});