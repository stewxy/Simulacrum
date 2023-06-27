import react from 'react';

import { DiGoogleDrive } from 'react-icons/di'
import { SiJira } from 'react-icons/si'
import { AiFillGithub } from 'react-icons/ai'
import { BsDiscord } from 'react-icons/bs'

import { Box, Text, IconButton, Flex, Center, } from '@chakra-ui/react'
import { ResourceAndLinksComponentProps } from '../types/props/ResourceAndLinksComponentProps';


function ResourcesAndLinksComponent(props: ResourceAndLinksComponentProps) {
    return (
        <>

            <Text fontSize='24px' color='#727272'>Resources and links</Text>
            <Box h='84px' bg='white' borderRadius='20' mt='5px' boxShadow='xl' borderColor='#727272'>
                <Flex>
                    <Center flex='1'>
                        <Box p='3'>
                            <IconButton
                                color='black'
                                colorScheme='black'
                                aria-label='Google Drive'
                                onClick={() => { window.open(props.googleDriveURL, '_blank') }}
                                fontSize='50px'
                                icon={<DiGoogleDrive />}
                            /><p style={{ fontSize: 12, textAlign: 'center' }} >Drive</p>
                        </Box>
                    </Center>
                    <Text fontSize='40px' color='#545454' pt='4.8px'>|</Text>


                    <Center flex='1'>
                        <Box p='3'>
                            <IconButton
                                color='black'
                                colorScheme='black'
                                aria-label='Jira'
                                onClick={() => { window.open(props.jiraURL, '_blank') }}
                                fontSize='33px'
                                icon={<SiJira />}
                            /><p style={{ fontSize: 12, textAlign: 'center' }}>Jira</p>
                        </Box>
                    </Center>
                    <Text fontSize='40px' color='#545454' pt='4.8px'>|</Text>


                    <Center flex='1'>
                        <Box p='3'>
                            <IconButton
                                color='black'
                                colorScheme='black'
                                aria-label='Github'
                                onClick={() => { window.open(props.githubURL, '_blank') }}
                                fontSize='40px'
                                icon={<AiFillGithub />}
                            /><p style={{ fontSize: 12, textAlign: 'center' }}>GitHub</p>
                        </Box>
                    </Center>
                    <Text fontSize='40px' color='#545454' pt='4.8px'>|</Text>


                    <Center flex='1'>
                        <Box p='3'>
                            <IconButton
                                color='black'
                                colorScheme='black'
                                onClick={() => { window.open(props.discordURL, '_blank') }}
                                aria-label='Discord'
                                fontSize='35px'
                                icon={<BsDiscord />}
                            /><p style={{ fontSize: 12, textAlign: 'center' }}>Discord</p>
                        </Box>
                    </Center>
                </Flex>

            </Box>
        </>
    )


}

export default ResourcesAndLinksComponent;