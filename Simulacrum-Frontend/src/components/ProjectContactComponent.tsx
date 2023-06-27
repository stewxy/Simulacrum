import { useEffect, useState } from 'react';
import { Box, Text, Button, Center, Flex, Stack } from '@chakra-ui/react'
import { ProjectContactComponentProps } from '../types/props/ProjectContactComponentProps';
import { isLoggedIn } from '../utils';
import axios from 'axios';
import { APIResponse } from '../types/responses/APIResponse';
import { ViewProjectResponse } from '../types/responses/ViewProjectResponse';


function ProjectContactComponent(props: ProjectContactComponentProps) {
    const [response, setResponse] = useState<APIResponse<ViewProjectResponse>>({
        loading: true,
        error: false,
        data: null
    });

    const [assigned, setAssigned] = useState<boolean>(props.isAssigned);

    const assignProject = () => {
        setResponse({ ...response, loading: true });
        axios.post<number>(`https://simulacrum-api.azurewebsites.net/api/Projects/AssignToUser/${props.projectId}`).then((res) => {
            setResponse({ loading: false, error: false, data: null });
            setAssigned(true);
        }).catch(() => {
            console.log("Error");
        })
    }

    return (
        <>
            <Text fontSize='24px' color='#727272'>Contact</Text>


            <Center>


                <Box
                    w='370px'
                    h='85px'
                    bg='white'
                    boxShadow='xl'
                    borderColor='#727272'
                    borderRadius='20'
                >

                    <Flex>
                        <Box flex='5' mt='14px' ml='20px'>
                            By: {props.projectLead}
                            <br></br>
                            Created: {props.date}
                        </Box>


                        <Box flex='1'>
                            <Stack>
                                <Box>
                                    <Button
                                        onClick={() => { window.open('mailto:' + props.email + '?subject=Subject&body=Body%20goes%20here') }}
                                        fontSize='19px'
                                        fontWeight="bold"
                                        color='white'
                                        bg='#00a4fe'
                                        w='100px'

                                        boxShadow='inner'
                                        borderColor='#727272'

                                        borderTopRightRadius='20'
                                        borderBottomLeftRadius='0'
                                        borderTopLeftRadius='0'
                                        borderBottomRightRadius='0'
                                    >
                                        <b>EMAIL</b>
                                    </Button>

                                    <Button
                                        disabled={!isLoggedIn() || assigned}
                                        onClick={assignProject}
                                        fontSize='19px'
                                        fontWeight="bold"
                                        color='white'
                                        bg='#0dffd1'
                                        w='100px'
                                        height='45px'
                                        boxShadow='inner'
                                        borderColor='#727272'

                                        borderTopRightRadius='0'
                                        borderBottomLeftRadius='0'
                                        borderTopLeftRadius='0'
                                        borderBottomRightRadius='20'
                                    >
                                        {assigned == true ? (
                                            <b>JOINED</b>
                                        ) : (
                                            <b>JOIN</b>
                                        )}
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Flex>



                </Box>
            </Center>
        </>
    )
}

export default ProjectContactComponent;