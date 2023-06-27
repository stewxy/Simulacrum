import axios from "axios";
import { Image, Box, Circle, Divider, Text, Input, Button, Center, Flex } from '@chakra-ui/react'
import { TagsInput } from "react-tag-input-component";
import { FormLabel, Stack, IconButton, FormControl } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md'

import react, { useEffect, useState } from 'react';
import { APIResponse } from "../types/responses/APIResponse";
import { ProfileResponse } from "../types/responses/ProfileResponse";
import { useNavigate } from 'react-router-dom';
import { UpdateProfileComponentProps } from '../types/props/UpdateProfileComponentProps';
import { UpdateProfileRequest } from '../types/requests/UpdateProfileRequest';

function UpdateProfileComponent(props: UpdateProfileComponentProps) {
    const navigate = useNavigate();

    // const [response, setResponse] = useState<APIResponse<ProfileResponse>>({
    //     loading: true,
    //     error: false,
    //     data: null,
    // });

    const [loading, setLoading] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string | undefined>(props.firstName);
    const [lastName, setLastName] = useState<string | undefined>(props.lastName);
    const [originalEmail, setOriginalEmail] = useState<string>(props.email);
    const [email, setEmail] = useState<string | undefined>(props.email);
    const [skills, setSkills] = useState<string[] | undefined>();
    const [discordURL, setDiscordURL] = useState<string | undefined>(props.discordURL);
    const [gitHubURL, setGitHubURL] = useState<string | undefined>(props.gitHubURL);
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    function validateEmail(email: string) {
        return expression.test(email);
    }

    function updateProfile() {
        if (email != undefined && !validateEmail(email)) {
            alert("Not a valid email");
            setEmail(undefined);
            return;
        }

        let request: UpdateProfileRequest = {
            firstName: (firstName == undefined || '' ? null : firstName),
            lastName: (lastName == undefined || '' ? null : lastName),
            email: (email == undefined || '' || originalEmail === email ? null : email),
            skills: (skills == undefined ? null : skills),
            discordURL: (discordURL == undefined || '' ? null : discordURL),
            gitHubURL: (gitHubURL == undefined || '' ? null : gitHubURL)

        }

        setLoading(true);

        axios.post<UpdateProfileRequest>('https://simulacrum-api.azurewebsites.net/api/Profile/UpdateProfile', request)
            .then((res) => {
                alert('Profile updated!');
                navigate('/profile');
            }).catch((res) => {
                console.log(JSON.stringify(request));

                alert('An error occurred');
            })
        setLoading(false);
    }

    return (
        <>
            <Center>
                <Box
                    mt='40px'
                    p={5}
                    w='95%'
                    h='100%'
                    pb='30px'
                    borderRadius='20'
                    boxShadow='base'
                    bg='white'
                >
                    <Box mt='20px'>
                        <Center>
                            <Box>
                                <Circle
                                    size={'150px'}
                                    bg={'white'}
                                    zIndex='-1'
                                    boxShadow='sm'
                                    mt='-60px'

                                    onClick={() => navigate('/uploadprofilepicture')}

                                    bgImage={props.userProfilePic}
                                    bgPosition='center'
                                    bgSize='cover'
                                ></Circle>
                                <Circle
                                    overflow={'hidden'}
                                    size='30px'
                                    boxShadow='base'
                                    ml='105px'
                                    mt='-30px'
                                >
                                    <IconButton
                                        bg='white'
                                        icon={<MdOutlineEdit size={17} />}
                                        aria-label='Edit'
                                        onClick={() => navigate('/uploadprofilepicture')}
                                        variant='fill'
                                    ></IconButton>
                                </Circle>
                            </Box>
                        </Center>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input value={firstName} disabled={loading} onChange={(e) => { setFirstName(e.currentTarget.value) }} placeholder={props.firstName} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input value={lastName} disabled={loading} onChange={(e) => { setLastName(e.currentTarget.value) }} placeholder={props.lastName} />
                        </FormControl>


                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input value={email} disabled={loading} onChange={(e) => { setEmail(e.currentTarget.value) }} type="email" placeholder={props.email} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Discord URL</FormLabel>
                            <Input value={discordURL} disabled={loading} onChange={(e) => { setDiscordURL(e.currentTarget.value) }} placeholder={props.discordURL} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Github URL</FormLabel>
                            <Input value={gitHubURL} disabled={loading} onChange={(e) => { setGitHubURL(e.currentTarget.value) }} placeholder={props.gitHubURL} />
                        </FormControl>
                    </Box>
                </Box>
            </Center>
            <Center pb='20px'>
                <Flex w='80%' h='20px' mt='10px'>
                    <Button
                        fontSize='24px'
                        fontWeight="bold"
                        color="black"
                        w='50%'


                        pb='5px'
                        mr='5px'


                        bg='white'
                        boxShadow='base'
                        borderRadius='20'
                        borderRightRadius='0'
                        onClick={() => navigate("/myprofile")}
                        disabled={loading}
                    >
                        <Text>
                            Cancel
                        </Text>
                    </Button>
                    <Button
                        fontSize='24px'
                        fontWeight="bold"
                        color="#00a4fe"
                        w='50%'


                        pb='5px'
                        mr='5px'


                        bg='white'
                        boxShadow='base'
                        borderLeftRadius='0'
                        borderRadius='20'
                        onClick={updateProfile}
                        disabled={loading}
                    >
                        <Text>
                            Submit
                        </Text>
                    </Button>
                </Flex>
            </Center>
        </>
    )
}

export default UpdateProfileComponent;