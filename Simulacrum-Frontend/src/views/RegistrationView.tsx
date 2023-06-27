import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import logo_register from "../images/logo_register.png";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { APIResponse } from "../types/responses/APIResponse";
import { LoginResponse } from "../types/responses/LoginResponse";
import { RegisterRequest } from "../types/requests/RegisterRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../utils";
import HeaderComponent from "../components/HeaderComponent";

function RegistrationView() {
  const [response, setResponse] = useState<APIResponse<LoginResponse>>({
    loading: false,
    error: false,
    data: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (response.data !== null) {
      login(response.data);
      console.log(response.data.userId);
      navigate('/registerLinks');
    }
  }, [response.data]);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  function register() {
    if (password !== password2) {
      alert('Passwords don\'t match!');
      return;
    }

    let req: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    };

    setResponse({ ...response, loading: true });
    axios.post<LoginResponse>('https://simulacrum-api.azurewebsites.net/api/Auth/Register', req)
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      }).catch((res) => {
        alert('An error occurred');
      })
  }

  return (
    <>
      <HeaderComponent headerName={"Register"}></HeaderComponent>
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
            {/* First Name */}
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input value={firstName} disabled={response.loading} onChange={(e) => { setFirstName(e.currentTarget.value) }} placeholder="First name" />
            </FormControl>
            {/* Last Name */}
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input value={lastName} disabled={response.loading} onChange={(e) => { setLastName(e.currentTarget.value) }} placeholder="Last name" />
            </FormControl>
            {/* User Name */}
            <FormControl isRequired>
              <FormLabel>User name</FormLabel>
              <Input value={username} disabled={response.loading} onChange={(e) => { setUserName(e.currentTarget.value) }} placeholder="User name" />
            </FormControl>
            {/* Email */}
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input value={email} disabled={response.loading} onChange={(e) => { setEmail(e.currentTarget.value) }} type="email" placeholder="Email" />
              <FormHelperText>We'll share your email.</FormHelperText>
            </FormControl>
            {/* Password 1 */}
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  value={password}
                  disabled={response.loading}
                  onChange={(e) => { setPassword(e.currentTarget.value) }}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Password 2 */}
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  value={password2}
                  disabled={response.loading}
                  onChange={(e) => { setPassword2(e.currentTarget.value) }}
                  pr="4.5rem"
                  type={show1 ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick1}>
                    {show1 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
            onClick={() => navigate("/login")}
            disabled={response.loading}
          >
            <Text>
              Login
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
            onClick={register}
            disabled={response.loading}
          >
            <Text>
              Next
            </Text>
          </Button>
        </Flex>
      </Center>
      <Box mb='250px'></Box>
    </>
  );
}

export default RegistrationView;
