import react from 'react';
import { ExampleStyledComponentProps } from '../types/props/ExampleStyledComponentProps';
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'

function ExampleStyledComponent({boxTitle, backgroundColour, progressValue, badgeName}: ExampleStyledComponentProps) {
    return (
        <>
        <Box bg={backgroundColour} borderRadius='lg' w='100%' p={4} color='white'>
            {boxTitle}
            <CircularProgress value={progressValue} />
            <Badge>{badgeName}</Badge>
        </Box>
        </>
    )
}

export default ExampleStyledComponent;