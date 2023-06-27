import { HStack, Stack, Box, Text, background, Button, Center, Heading } from '@chakra-ui/react'
import HeaderComponent from '../components/HeaderComponent';
import SearchResultComponent from '../components/SearchResultComponent';
import SearchButtonComponent from '../components/SearchButtonComponent';
import CreateProjectButtonComponent from '../components/CreateProjectButtonComponent';
import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { APIResponse } from "../types/responses/APIResponse";
import CardComponent from '../components/CardComponent';
import SpinnerComponent from '../components/SpinnerComponent';

function HomeView() {
  const [recentProjResponse, setRecentProjResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });

  const [featuredProjResponse, setFeaturedProjResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });


  let recentProjects: React.ReactElement[] = [];
  let featuredProjects: React.ReactElement[] = [];

  useEffect(() => {
    setFeaturedProjResponse({ ...featuredProjResponse, loading: true });
    axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/GetFeaturedProjects"
      )
      .then((res) => {
        setFeaturedProjResponse({ loading: false, error: false, data: res.data });
      });

    setRecentProjResponse({ ...recentProjResponse, loading: true });
    axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/GetRecentlyCreatedProjects"
      )
      .then((res) => {
        setRecentProjResponse({ loading: false, error: false, data: res.data });
      });
  }, []);

  if (featuredProjResponse.data != null) {
    //change max value for i to display more projects
    for (let i = 0; i < 3; i++) {
      featuredProjects.push(
        <Box display={"inline-block"} width={"100%"} height={"fit-content"} margin={"20px"}>
          <CardComponent
            {...featuredProjResponse.data[i]}
          ></CardComponent>
        </Box>

      )
    }
  }

  if (recentProjResponse.data != null) {
    //change max value for i to display more projects
    for (let i = 0; i < 3; i++) {
      recentProjects.push(
        <CardComponent
          {...recentProjResponse.data[i]}
        ></CardComponent>
      )
    }
  }

  return (
    <>
      <HeaderComponent headerName={"Home"}></HeaderComponent>

      <Center>
        <Stack>
          <Box
            w="370px"
            textAlign={"left"}
            boxShadow="xl"
            borderRadius={20}
            mt="20px"
            pb="25px"
          >
            <Heading as="h2" m={"10px"}>
              Featured Projects
            </Heading>
            <HStack spacing={10} overflowX={"scroll"} overflowY={"hidden"} height={"fit-content"}>{featuredProjResponse.data !== null ? featuredProjects : <SpinnerComponent />}</HStack>
          </Box>

          <Box
            w="370px"
            textAlign={"left"}
            boxShadow="xl"
            borderRadius={20}
            mt="20px"
            pb="50px"
          >
            <Heading as="h2" m={"10px"}>
              Recently created Projects
            </Heading>
            <Stack spacing={10}>{recentProjResponse.data !== null ? recentProjects : <SpinnerComponent />}</Stack>
          </Box>
        </Stack>
      </Center>
      <Box mb='250px'></Box>
    </>
  )
}

export default HomeView;