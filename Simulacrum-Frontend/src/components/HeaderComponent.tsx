import { Box, Text, Flex } from '@chakra-ui/react';
import { HeaderComponentProps } from '../types/props/HeaderComponentProps';
import borderImage from "../images/header_image.png";

function HeaderComponent(props: HeaderComponentProps) {
    return (
        <>
        <Box backgroundImage={borderImage} w='100%' h='50px'></Box>
        <Box bg='white' boxShadow='2xl'>
            <Flex pt='12.5px' pb='12.5px'>
                <Text color='black' fontWeight='bold' fontSize='36px' ml="50px"> {props.headerName} </Text>
            </Flex>
        </Box>
        </>
    )
}

export default HeaderComponent;