import { Button } from "@chakra-ui/react";
import { SearchButtonProps } from "../types/props/SearchButtonProps";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SearchButtonComponent(props: SearchButtonProps) {
    const navigate = useNavigate();
    return (
        <Button 
        color='white'
        fontSize={props.fontSize} 
        w={props.width} 
        h={props.height} 
        leftIcon={<FiSearch size={20}/>}
        borderRadius='20'
        variant='outline'
        onClick={() => {navigate('/search') }}>
            Search
        </Button>
    );
}

export default SearchButtonComponent;