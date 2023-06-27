import react from 'react';
import { ExampleComponentProps } from '../types/props/ExampleComponentProps';

function ExampleComponent(props: ExampleComponentProps) {
    return (
        <>
            <p>Title: {props.title}</p>
            <p>Description: {props.description}</p>
            <p>ID: {props.id}</p>
        </>
    )
}

export default ExampleComponent;