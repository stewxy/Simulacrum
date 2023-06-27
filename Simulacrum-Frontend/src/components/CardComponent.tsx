import { Box, Button, Center, Stack, Divider, Text, Flex, Image, Circle, Tag, IconButton } from '@chakra-ui/react'
import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { CardComponentProps } from '../types/props/CardComponentProps';
import { APIResponse } from '../types/responses/APIResponse';
import { ViewProjectResponse } from '../types/responses/ViewProjectResponse';
import cardImage from "../images/card_image.png";
import { getUserId, isLoggedIn } from "../utils";
import { useNavigate } from "react-router-dom";
import { AssignedResponse } from '../types/responses/AssignedResponse';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function CardComponent(props: CardComponentProps) {
    const [likedUpdateResponse, setLikedUpdateResponse] = useState<APIResponse<null>>({
        loading: false,
        error: false,
        data: null
    });

    const [isLiked, setIsLiked] = useState<boolean>(props.isInLiked);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(!isLoggedIn());
    const [buttonText, setButtonText] = useState<string>('JOIN');

    const navigate = useNavigate();

    const assignProject = () => {
        setButtonText('Joining...');
        setButtonDisabled(true);
        axios.post<number>(`https://simulacrum-api.azurewebsites.net/api/Projects/AssignToUser/${props.id}`).then((res) => {
            navigate(`/viewproject/${props.id}`);
        }).catch(() => {
            setButtonDisabled(false);
            setButtonText('Join');
        })
    }

    const updateLikedStatus = () => {
        setLikedUpdateResponse({ ...likedUpdateResponse, loading: true });
        let url: string = isLiked
            ? `https://simulacrum-api.azurewebsites.net/api/Profile/RemoveLikedProjectFromUser?id=${props.id}`
            : `https://simulacrum-api.azurewebsites.net/api/Profile/AddToLikedProjects?id=${props.id}`
        axios.post(url)
            .then(() => {
                setIsLiked(!isLiked);
                setLikedUpdateResponse({ ...likedUpdateResponse, loading: false });
                if (props.onLikeChange !== undefined) {
                    props.onLikeChange();
                }
            });
    }

    var myWidth = "320px"
    var joinbButton;
    if (isLoggedIn() && props.isAssigned) {
        joinbButton = <Button
            color='#00a4fe'
            fontSize='18px'
            fontWeight="extrabold"
            w='100%'
            bg='white'
            borderLeftRadius='0'
            borderBottomRightRadius='20'
            borderTopRightRadius='0'
            boxShadow='sm'
            variant='unstyled'
            disabled={true}
            _hover={{
                bg: '#dcf4f6'
            }}>
            JOINED
        </Button>
    } else {
        joinbButton = <Button
            color='#00a4fe'
            fontSize='18px'
            fontWeight="extrabold"
            w='100%'
            bg='white'
            borderLeftRadius='0'
            borderBottomRightRadius='20'
            borderTopRightRadius='0'
            boxShadow='sm'
            variant='unstyled'
            disabled={buttonDisabled}
            onClick={assignProject}
            _hover={{
                bg: '#dcf4f6'
            }}>
            {buttonText}
        </Button>
    }

    return (
        <Center>
            <>
                <Stack>
                    <Box>
                        <Box
                            backgroundImage={cardImage}
                            w={myWidth}
                            h='50px'
                            boxShadow="lg"
                            borderTopLeftRadius='20'
                            borderTopRightRadius='20'>
                        </Box>
                        <Box p={5} w={myWidth} boxShadow='sm' pb='100px'>
                            <Flex>
                                <Circle
                                    size={'75px'}
                                    bg={'white'}
                                    boxShadow="base"
                                    mt='-60px'
                                    bgImage={props.projectLead.profilePictureURL}
                                    bgPosition='center'
                                    bgSize='cover'
                                    onClick={() => {
                                        if (isLoggedIn() && props.projectLead.id === getUserId()) {
                                            navigate('/myprofile');
                                        } else {
                                            navigate(`/profile/${props.projectLead.id}`);
                                        }
                                    }}
                                ></Circle>
                                {(() => {
                                    if (isLoggedIn()) {
                                        return (
                                            <IconButton
                                                aria-label='star project'

                                                icon={isLiked ? <AiFillStar size="30" color="#ffcb10" /> : <AiOutlineStar size="30" color="#ffcb10" />}
                                                onClick={updateLikedStatus}
                                                disabled={likedUpdateResponse.loading}
                                                boxShadow='base'
                                                variant='ghost'
                                                m='-15px -215px 0px 175px'
                                            />
                                        )
                                    } else {
                                        return (
                                            <Box h='25px'></Box>
                                        )
                                    }
                                })()}
                                <Box mt='-20px'>
                                    <Text
                                        fontSize='12px'
                                        ml='5px'
                                        onClick={() => {
                                            if (isLoggedIn() && props.projectLead.id === getUserId()) {
                                                navigate('/myprofile');
                                            } else {
                                                navigate(`/profile/${props.projectLead.id}`);
                                            }
                                        }}>
                                        {props.projectLead.username} </Text>
                                    <Text fontSize='9px' ml='5px' mb='5px' textAlign='left'> {new Date(props.dateCreated).toLocaleDateString("en-UK")} </Text>
                                </Box>
                            </Flex>
                            <Text
                                mt='-15px'
                                mb='10px'
                                fontSize='24px'
                                fontWeight='semibold'
                                textAlign='left'
                                noOfLines={1}
                                overflow="hidden"
                                textOverflow={"ellipsis"}
                                w="285px"
                            >
                                {props.name}
                            </Text>
                        </Box>
                        <Box
                            p={5}
                            mt='-105px'
                            w={myWidth}
                            boxShadow='md'
                            borderRadius='20'
                            bg='white'
                            pb='50px'
                        >
                            <Flex mt='-10px' >
                                <Text flex='4' fontSize='12px' noOfLines={[6]} textAlign='left' h='110px'> {props.description} </Text>
                                <Box flex='2' >
                                    <Box p={1}
                                        overflow='scroll'
                                        overflowX='hidden'
                                        h='105px'
                                        bg='white'
                                        boxShadow='base'
                                        borderRadius='15'
                                        color='#4d4d4d'
                                        textAlign='left'
                                    >
                                        {props.requiredSkills.map((tag, i) => {
                                            return (
                                                <Tag
                                                    fontSize='7px'
                                                    ml='2.5px'
                                                    color='black'
                                                    size='sm'
                                                    key='sm'
                                                    borderRadius='full'
                                                    boxShadow='base'
                                                    variant='unstyled'
                                                >
                                                    {tag}
                                                </Tag>
                                            )
                                        })}
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                        <Flex w={myWidth} h='30px' mt='-40px'>
                            <Button
                                color='black'
                                fontSize='18px'
                                fontWeight="extrabold"
                                w='100%'
                                bg='white'
                                borderRightRadius='0'
                                borderBottomLeftRadius='20'
                                borderTopLeftRadius='0'
                                boxShadow='sm'
                                variant='unstyled'
                                onClick={() => { navigate(`/viewproject/${props.id}`) }}
                                _hover={{ bg: '#dcf4f6' }}>
                                VIEW MORE
                            </Button>
                            {joinbButton}
                        </Flex>
                    </Box>
                </Stack>
            </>
        </Center>
    );
}

export default CardComponent;