import { Box, Center, Stack, Circle, Flex, Spacer } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { useState } from "react";
import { APIResponse } from "../types/responses/APIResponse";
import { Image } from '@chakra-ui/react'
import HeaderComponent from "../components/HeaderComponent";
import { UploadProfilePictureResponse } from "../types/responses/UploadProfilePictureResponse";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function UploadProfilePictureView() {
    const [response, setResponse] = useState<APIResponse<UploadProfilePictureResponse>>({
        loading: false,
        error: false,
        data: null
    });

    const [file, setFile] = useState<FileList | null>();

    const navigate = useNavigate();

    function uploadProfilePicture() {
        setResponse({ ...response, loading: true });
        let formData = new FormData();
        formData.append('ProfilePicture', file![0]);

        axios.post<UploadProfilePictureResponse>('https://simulacrum-api.azurewebsites.net/api/Profile/UploadProfilePicture', formData)
            .then((res) => {
                setResponse({
                    loading: false,
                    error: false,
                    data: res.data
                });
            });
    }

    return (
        <>
            <HeaderComponent headerName={"Upload Profile Picture"} />
            <Center mt='30px' >
                <Box
                    w='95%'
                    h='100px'
                    bg='white'
                    boxShadow='base'
                    borderTopRadius='20px'
                ></Box>
            </Center>
            <Center mt='-80px' mb='85px'>
                <Box>
                    <Flex gap='3'>
                        <Box
                            w='55px'
                            h='7px'
                            bg='#00a4fe'
                            borderRadius='20'
                            boxShadow='base'
                        ></Box>
                        <Spacer />
                        <Box
                            w='55px'
                            h='7px'
                            bg='#00a4fe'
                            borderRadius='20'
                            boxShadow='inner'
                        ></Box>
                        <Spacer />
                        <Box
                            w='55px'
                            h='7px'
                            bg='#00a4fe'
                            borderRadius='20'
                            boxShadow='inner'
                        ></Box>
                        <Spacer />
                        <Box
                            w='55px'
                            h='7px'
                            bg='#00a4fe'
                            borderRadius='20'
                            boxShadow='inner'
                        ></Box>
                    </Flex>
                </Box>
            </Center>
            <Center>

                <Box
                    mt='-65px'
                    p={5}
                    w='95%'
                    h='100%'
                    pb='30px'
                    borderRadius='20'

                    boxShadow='base'
                    bg='white'
                >
                    <Stack>
                        <Center>
                            {response.data === null ? (
                                <Circle
                                    size={'200px'}
                                    bg={'white'}
                                    borderWidth='2px'
                                    borderColor='gray'
                                    mb='10px'

                                ></Circle>
                            ) : (
                                <Circle
                                    size={'200px'}
                                    bg={'white'}
                                    borderWidth='2px'
                                    borderColor='gray'
                                    backgroundImage={response.data.profilePictureURL}
                                    bgPosition='center'
                                    bgSize='cover'
                                ></Circle>
                            )}
                        </Center>
                        <Stack>
                            <Input placeholder='Upload image' type='file' accept="image/*" pt='5px' mb='-10px' onChange={(e) => setFile(e.target.files)} />
                            <Button
                                disabled={response.loading}
                                onClick={uploadProfilePicture}
                                colorScheme='blue'
                                boxShadow='base'
                                borderRadius='20'
                                borderTopRadius='0'

                            >
                                {response.loading ? (
                                    <p>Uploading...</p>
                                ) : (
                                    <p>Upload</p>
                                )}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
            <Center>

            </Center>


            <Center pb='20px'>
                <Flex w='95%' h='20px' mt='30px'>
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
                        onClick={() => navigate("/registerSkills")}
                        disabled={response.loading}
                    >
                        <Text>
                            Previous
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
                        disabled={response.loading}
                        onClick={() => navigate("/profile")}
                    >
                        <Text>
                            Finish
                        </Text>
                    </Button>
                </Flex>
            </Center>
            <Box mb='250px'></Box>
        </>
    )
}

export default UploadProfilePictureView;


