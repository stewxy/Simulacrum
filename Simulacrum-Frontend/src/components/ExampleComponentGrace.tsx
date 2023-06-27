import react from 'react';
import { ExampleComponentPropsGrace } from '../types/props/ExampleComponentPropsGrace';

function ExampleComponentGrace(props: ExampleComponentPropsGrace) {
    return (
        <>
            <p>First name: {props.firstName}</p>
            <p>Last name: {props.lastName}</p>
            <p>Description: {props.description}</p>
        </>
    )
}

export default ExampleComponentGrace;