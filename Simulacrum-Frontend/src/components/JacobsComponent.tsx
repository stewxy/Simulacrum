import react from 'react';
import { JacobsComponentProps } from '../types/props/JacobsComponentProps';

function JacobsComponent(props: JacobsComponentProps){
    return(
        <>
            <p>Name: {props.name}</p>
            <p>Cool Skills: {props.coolSkills}</p>
            <p>Give me cash ${props.expectedSalary}</p>
        </>
    )
}

export default JacobsComponent;