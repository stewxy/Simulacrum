import react from 'react';
import { ProjectDescriptionComponentProps } from '../types/props/ProjectDescriptionComponent';
import { Box, Text, Tag, Center, Stack } from '@chakra-ui/react'

function ProjectDescriptionComponent(props: ProjectDescriptionComponentProps) {
    return (
        <>
            <Center>
                <Stack w="100%">
                    <Box>
                        <Text mb='5px' fontSize='24px' color='#727272'>Description</Text>
                        <Box boxShadow='xl' borderRadius='20'>
                            <Box p='1' h='100%'>
                                <Text fontSize='12px' mb='20%' mr='30px' mt='10px' ml='10px'> {props.description} </Text>
                            </Box>

                            <Box w="100%" p='1' bg='white' alignItems='left' mt='-0.5rem' boxShadow='base' borderColor='#727272' borderBottomLeftRadius='20' borderBottomRightRadius='20'>
                                {props.interestTags.map((tag, i) => {
                                    return (
                                        <Tag fontSize='9px' ml='5px' color='black' size='sm' key='sm' borderRadius='full' variant='outline' borderColor='#727272'>{tag}</Tag>
                                    )
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Center>
        </>
    )
}

export default ProjectDescriptionComponent;