import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { SearchResponse } from "../types/responses/SearchResponse";
import { APIResponse } from "../types/responses/APIResponse";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResultComponent from "../components/SearchResultComponent";
import { IoAddCircleOutline, IoMagnetOutline, IoSearch } from "react-icons/io5";
import SpinnerComponent from "../components/SpinnerComponent";
import CardComponent from "../components/CardComponent";
import { FiLogOut } from "react-icons/fi";

function SearchView() {
  const toast = useToast();
  const toastId = "error-toast";
  const [projectName, setProjectName] = useState<string>("");
  let noResultsError = 0;

  const [response, setResponse] = useState<APIResponse<SearchResponse[]>>({
    loading: false,
    error: false,
    data: null,
  });

  function searchRequest() {
    setResponse({ ...response, loading: true });
    axios
      .post<SearchResponse[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/SearchProjectsByString/" +
        projectName
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
        console.log(res.data.length);
        noResultsError = 1;
      })
      .catch(() => {
        setResponse({ loading: false, error: true, data: null });
      });
  }

  useEffect(() => {
    if (!response.loading) {
      if (response.data?.length == 0 || (response.error && response.data == null)) {
        if (response.error) {
          if (!toast.isActive(toastId)) {
            response.error = false;
            toast({
              position: "top",
              id: toastId,
              description: "Your input is invalid",
              status: "error",
              duration: 5000,
            });
          }
        }
        else if (response.data?.length == 0) {
          if (noResultsError = 1) {
            noResultsError = 0;
            if (!toast.isActive(toastId)) {
              toast({
                position: "top",
                id: toastId,
                description: "There are no search results for your current query",
                status: "info",
                duration: 5000,
              });
            }
          }

        }
      }
    }
  }, [response]);

  return (
    <>
      <HeaderComponent headerName={"Search"}></HeaderComponent>
      <Center>
        <Box
          mt="30px"
          p={5}
          w="95%"
          h="100%"
          borderRadius="20"
          borderBottomRadius="0"
          boxShadow="xl"
        >
          {/* Search Box */}
          <FormControl isRequired>
            <Input
              value={projectName}
              disabled={response.loading}
              onChange={(e) => {
                setProjectName(e.currentTarget.value);
              }}
              placeholder="Project name"
            />
          </FormControl>
        </Box>
      </Center>
      <Center pb="10%">
        <Flex w="95%" h="20px" boxShadow="xl">
          <Button
            onClick={searchRequest}
            disabled={response.loading}
            leftIcon={<FiLogOut size={30} />}
            colorScheme="red"
            fontSize="18px"
            fontWeight="bold"
            color="white"
            w="100%"
            bg="#0cd5e8"
            borderTopRightRadius="0"
            borderLeftRadius="0"
            borderBottomRightRadius="20"
            borderBottomLeftRadius="20"
            boxShadow="inner"
            variant="solid"
            _hover={{
              bg: "#dcf4f6",
            }}
          >
            Search
          </Button>
        </Flex>
      </Center>

      {response.data != null ? (
        <Center>
          <Box
            w="90%"
            textAlign={"right"}
            boxShadow="xl"
            borderRadius={20}
            mt="60px"
            pb="25px"
          >
            <Stack spacing={10} textAlign={"left"}>
              <Heading as="h2" m={"10px"}>
                Results by Title
              </Heading>
              {response.loading ? (
                <SpinnerComponent></SpinnerComponent>
              ) : (
                response.data?.map((proj, i) => {
                  return (
                    <CardComponent
                      {...proj}
                      onLikeChange={searchRequest}
                    ></CardComponent>
                  );
                })
              )}
            </Stack>
          </Box>
        </Center>
      ) : (
        <Center>
          <Box
            w="90%"
            textAlign={"right"}
            boxShadow="xl"
            borderRadius={20}
            mt="60px"
            pb="25px"
          >
            <Stack spacing={10} textAlign={"center"}>
              <Text>Search by Project Title or Required Skills</Text>
            </Stack>
          </Box>
        </Center>
      )}

      <Box mb="250px"></Box>
    </>
  );
}

export default SearchView;
