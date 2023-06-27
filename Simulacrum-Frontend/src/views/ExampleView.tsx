import React from 'react';
import ExampleComponent from '../components/ExampleComponent';
import { Text } from '@chakra-ui/react'

function ExampleView() {
    let title: string = 'Default title';
    let description: string = 'Default description';
    let components: React.ReactElement[] = [];

    for (let i = 0; i < 5; i++) {
        components.push(
            <ExampleComponent title={title} description={description} id={i}></ExampleComponent>
        )
    }

    return (
        <>
            <Text fontSize='4xl'>Heading</Text>
            {components}
        </>
    )
}

export default ExampleView;