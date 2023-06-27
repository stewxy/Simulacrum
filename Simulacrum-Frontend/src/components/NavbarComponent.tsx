import React from 'react';
import { ExampleStyledComponentProps } from '../types/props/ExampleStyledComponentProps';
import { Box, Flex, Icon, Spacer, Square } from '@chakra-ui/react'
import { IconButton, createIcon } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineCompass, AiOutlineStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils';


function NavbarComponent() {
    const navigate = useNavigate();

    return (
        <>
            <Box boxShadow="dark-lg" bg='white' w='100%' p={1} position='fixed' bottom='0'>
                <Flex alignItems='center' gap='2' pt='5px' pb='15px'>
                    <Square flex='1'>
                        <Box boxShadow="base" p='10px' borderRadius={20}>
                            <IconButton
                                bg='white'
                                aria-label='Home'
                                icon={<AiOutlineHome size={35} />}
                                onClick={() => navigate('/')}
                            />
                        </Box>
                    </Square >
                    <Square flex='1' >
                        <Box boxShadow="base" p='10px' borderRadius={20}>
                            <IconButton
                                bg='white'
                                aria-label='Explore'
                                icon={<AiOutlineCompass size={35} />}
                                onClick={() => navigate(isLoggedIn() ? '/explore' : '/login')}
                            />
                        </Box>
                    </Square >

                    <Square flex='1'>
                        <Box boxShadow="base" p='10px' borderRadius={20}>
                            <IconButton
                                bg='white'
                                aria-label='Favourites'
                                icon={<AiOutlineStar size={35} />}
                                onClick={() => navigate(isLoggedIn() ? '/favourites' : '/login')}
                            />
                        </Box>
                    </Square >

                    <Square flex='1'>
                        <Box boxShadow="base" p='10px' borderRadius={20}>
                            <IconButton
                                bg='white'
                                aria-label='Profile'
                                icon={<CgProfile size={35} />}
                                onClick={() => navigate(isLoggedIn() ? '/myprofile' : '/login')}
                            />
                        </Box>
                    </Square >
                </Flex>
            </Box>
        </>
    );
}

export default NavbarComponent;
