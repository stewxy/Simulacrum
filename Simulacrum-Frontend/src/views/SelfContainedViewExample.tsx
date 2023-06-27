import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    HStack,
    RadioGroup,
    Radio,
    VStack,
    Box,
} from '@chakra-ui/react'

import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

function SelfContainedViewExample() {
    return (
        <>
            <VStack spacing={4}>
                <Text fontSize='4xl'>Self contained view</Text>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder='First name' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder='First name' />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl as='fieldset'>
                    <FormLabel as='legend'>Favourite lecturer</FormLabel>
                    <RadioGroup defaultValue='Rnario'>
                        <HStack spacing='24px'>
                            <Radio value='Mano'>Mano</Radio>
                            <Radio value='Rnario'>Rnario</Radio>
                            <Radio value='Sathiamoorthy Manoharan'>Sathiamoorthy Manoharan</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
            </VStack>
            <Box mb='250px'></Box>
        </>
    )
}

export default SelfContainedViewExample;