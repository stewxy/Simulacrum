import { Meta, Story } from '@storybook/react';
import SearchResultComponent from '../components/SearchResultComponent';
import { SearchResultComponentProps } from '../types/props/SearchResultComponentProps';

const meta: Meta = {
    title: 'Search/Search Result Component',
    component: SearchResultComponent,
    argTypes: {
        id: {
            defaultValue: 1
        },
        title: {
            defaultValue: "Ecological Project"
        },
        description: {
            defaultValue: "The department that inestigates the biological evolution history of Terre and its interaction with Terra's environment."
        }
    }
};


export default meta;


const Template: Story<SearchResultComponentProps> = (args) => <SearchResultComponent {...args}></SearchResultComponent>
export const Default = Template.bind({});

