import { Button } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CreateProjectButtonProps } from "../types/props/CreateProjectButtonProps";
import { isLoggedIn } from "../utils";

function CreateProjectButtonComponent(props: CreateProjectButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            color='white'
            fontSize={props.fontSize}
            w={props.width}
            h={props.height}
            leftIcon={<IoAddCircleOutline size={20} />}
            onClick={() => { isLoggedIn() ? navigate('/createprojectstep1') : navigate('/login') }}
            borderRadius='20'
            variant='outline'>
            Project
        </Button>
    );
}

export default CreateProjectButtonComponent;