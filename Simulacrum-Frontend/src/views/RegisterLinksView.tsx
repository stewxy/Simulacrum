import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import { APIResponse } from "../types/responses/APIResponse";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../utils";
import HeaderComponent from "../components/HeaderComponent";
import { RegisterLinksRequest } from "../types/requests/RegisterLinksRequest";
import { ProfileResponse } from "../types/responses/ProfileResponse";
import { UpdateProfileRequest } from "../types/requests/UpdateProfileRequest";

function RegisterLinksView() {
  const [response, setResponse] = useState<APIResponse<ProfileResponse>>({
    loading: false,
    error: false,
    data: null,
  });

  const navigate = useNavigate();

  const [discordURL, setDiscordURL] = useState<string>("");
  const [gitHubURL, setGitHubURL] = useState<string>("");

  function registerLinks() {
    let req: UpdateProfileRequest = {
      firstName: null,
      lastName: null,
      email: null,
      skills: null,
      discordURL: discordURL,
      gitHubURL: gitHubURL,
    };

    setResponse({ ...response, loading: true });
    axios
      .post<ProfileResponse>("https://simulacrum-api.azurewebsites.net/api/profile/updateprofile", req)
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
        navigate("/registerSkills?registerStep=true");
      })
      .catch((res) => {
        alert("An error occurred");
      });
  }

  return (
    <>
      <HeaderComponent headerName={"Register Links"}></HeaderComponent>
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
              borderRadius='20'
              boxShadow='inner'
            ></Box>
             <Spacer />
            <Box
              w='55px'
              h='7px'
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
          <Stack spacing={3} ml={5} mr={5}>
            <FormControl>
              <FormLabel>Discord URL</FormLabel>
              <Input
                value={discordURL}
                disabled={response.loading}
                onChange={(e) => {
                  setDiscordURL(e.currentTarget.value);
                }}
                placeholder="Discord URL"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Github URL</FormLabel>
              <Input
                value={gitHubURL}
                disabled={response.loading}
                onChange={(e) => {
                  setGitHubURL(e.currentTarget.value);
                }}
                placeholder="GitHub URL"
              />
            </FormControl>
          </Stack>
        </Box>
      </Center>
      <Center pb='20px'>
        <Flex w='95%' h='20px' mt='10px'>
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
            onClick={() => navigate("/register")}
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
            onClick = { registerLinks }
            disabled = { response.loading }
          >
            <Text>
              Next
            </Text>
          </Button>
        </Flex>
      </Center>
      <Box mb="250px"></Box>
    </>
  );
}


export default RegisterLinksView;

