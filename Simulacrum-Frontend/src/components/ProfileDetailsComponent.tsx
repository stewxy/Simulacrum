import { ProfileDetailsComponentProps } from '../types/props/ProfileDetailsComponentProps';
import { Box, Center, Text, Flex, Stack, TableContainer, Table, Tbody } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

function ProfileDetailsComponent(props: ProfileDetailsComponentProps) {
    const navigation = useNavigate();

    return (
        <>
            <Center>
                <Box textAlign={"left"} w='90%'>
                    <Text fontSize='22px' ml='10px' mb='5px' fontWeight={'bold'}> {props.DetailName} </Text>
                    <Box
                        borderRadius='20px'
                        boxShadow='xl'
                        pt='5px'
                        pb='25px'
                    >
                        <Box>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Tbody >
                                        {props.Projects.map((project, i) => {
                                            return (
                                                <Stack>
                                                    <Box
                                                        onClick={() => { navigation('/viewproject/' + project.id) }}
                                                        p='3'
                                                        
                                                        boxShadow='xs'
                                                       

                                                        borderLeft='None'
                                                        borderRight='None'
                                                        borderTop='None'
                                                        
                                                        cursor={'pointer'}
                                                    >
                                                        <Flex textAlign={"left"} justifyContent="space-between">
                                                            
                                                            <Text mt='-3px' mb='-1px' ml='10px' overflow="hidden" textOverflow={"ellipsis"} w="300px" > {project.name} </Text>
                                                            <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                                                        </Flex>
                                                    
                                                    </Box>
                                                </Stack>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Center mt='5px' mb='-13px'>
                            {props.IconType}
                        </Center>
                    </Box>

                </Box>
            </Center>
        </>

    )
}

export default ProfileDetailsComponent;