import { Meta, Story } from '@storybook/react';
import HomeView from '../views/HomeView';

const meta: Meta = {
    title: 'Views/HomeView view',
    component: HomeView
};
export default meta;

const Template: Story = () => <HomeView></HomeView>
export const Default = Template.bind({});