import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  Flex,
  Text
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { APIResponse } from "../types/responses/APIResponse";
import { LoginResponse } from "../types/responses/LoginResponse";
import { LoginRequest } from "../types/requests/LoginRequest";
import axios from "axios";
import { login } from "../utils";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function LogInView() {
  const toast = useToast();
  const toastId = 'error-toast'
  let error = null;
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<APIResponse<LoginResponse>>({
    loading: false,
    error: false,
    data: null,
  });

  useEffect(() => {
    if (response.data !== null) {
      login(response.data);
      navigate("/");
    }
  }, [response]);

  function loginReq() {
    setResponse({ ...response, loading: true });
    let req: LoginRequest = {
      username: username,
      password: password,
    };


    axios
      .post<LoginResponse>(
        "https://simulacrum-api.azurewebsites.net/api/Auth/Login",
        req
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      })
      .catch(() => {
        setResponse({ loading: false, error: true, data: null });
      });
  }
  if (response.error == true) {
    if (!toast.isActive(toastId)) {
      error = toast({
        position: 'top',
        id: toastId,
        description: "Invalid user name or password",
        status: "error",
        duration: 5000
      });
    }
  }

  return (
    <>
      <HeaderComponent headerName={"Log in"}></HeaderComponent>
      <Center>
        <Box
          mt='65px'
          p={5}
          w='95%'
          h='100%'
          pb='30px'
          borderRadius='20'
          boxShadow='base'
          bg='white'
        >
          <Stack spacing={3} ml={5} mr={5}>
            {/* User Name */}
            <FormControl isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                value={username}
                disabled={response.loading}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
                placeholder="User name"
              />
            </FormControl>
            {/* Password 1 */}
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  disabled={response.loading}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>{" "}
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
          >
            <Text>
              Register
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
            onClick={loginReq}
          >
            <Text>
              Login
            </Text>
          </Button>
        </Flex>
      </Center>
      <Box mb='250px'></Box>

    </>
  );
}

export default LogInView;
