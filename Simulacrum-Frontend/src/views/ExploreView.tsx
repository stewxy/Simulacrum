import {
  Center,
  Stack,
  Box,
  Text,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import CardComponent from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import SpinnerComponent from "../components/SpinnerComponent";
import { Project } from "../types/Project";
import { APIResponse } from "../types/responses/APIResponse";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

function ExploreView() {
  const [response, setResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/UserMatchedProjects"
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      });
  }, []);

  return (
    <>
      <HeaderComponent headerName={"Explore"}></HeaderComponent>
      <Center>
        <Box
          w="90%"
          textAlign={"center"}
          boxShadow="xl"
          borderRadius={20}
          mt="30px"
        >
          <Center>

            <Button
              w="100%"
              h="50px"
              onClick={() => {
                navigate("/search");
              }}
              disabled={response.loading}
              leftIcon={<IoSearch size={25} />}
              colorScheme="red"
              fontSize="18px"
              fontWeight="bold"
              color="white"
              bg="#0cd5e8"
              borderRadius="20"
              borderRightRadius="0"
              boxShadow="inner"
              variant="solid"
              _hover={{
                bg: "#dcf4f6",
              }}
            >
              Search
            </Button>
            <Button
              w="100%"
              h="50px"
              onClick={() => {
                navigate("/createprojectstep1");
              }}
              disabled={response.loading}
              leftIcon={<AiOutlinePlusCircle size={25} />}
              colorScheme="red"
              fontSize="18px"
              fontWeight="bold"
              color="white"
              bg="#0cd5e8"
              borderRadius="20"
              borderLeftRadius="0"
              boxShadow="inner"
              variant="solid"
              _hover={{
                bg: "#dcf4f6",
              }}
            >
              Create
            </Button>
          </Center>
        </Box>
      </Center>

      <Center>
        <Box
          w="90%"
          textAlign={"right"}
          boxShadow="xl"
          borderRadius={20}
          mt="20px"
          pb="25px"
        >
          <Stack spacing={10} textAlign={"left"}>
            <Heading as="h2" m={"10px"}>
              Recommended for you
            </Heading>

            {response.loading ? (
              <SpinnerComponent></SpinnerComponent>
            ) : (
              response.data?.map((proj, i) => {
                return <CardComponent {...proj}></CardComponent>;
              })
            )}
          </Stack>
        </Box>
      </Center>
      <Box mb="250px"></Box>
    </>
  );
}

export default ExploreView;
