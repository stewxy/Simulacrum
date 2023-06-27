import { Box, Center, Heading, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import SpinnerComponent from "../components/SpinnerComponent";
import { Project } from "../types/Project";
import { APIResponse } from "../types/responses/APIResponse";

function FavouritesView() {
  const [response, setResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });

  const [assigned_projects_response, setAssignedProjectsResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setResponse({loading: true, error: false, data: null});
    setAssignedProjectsResponse({loading: true, error: false, data: null});
    axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Profile/GetLikedProjects"
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      });
    
      axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/MyProjects"
      )
      .then((res) => {
        setAssignedProjectsResponse({ loading: false, error: false, data: res.data });
      });
  }

  return (
    <>
      <HeaderComponent headerName={"Favourites"}></HeaderComponent>
      
      
      <Center>
      <Box w='90%' textAlign={'right'} boxShadow='xl' borderRadius={20} mt='60px' pb='25px'>
          <Stack spacing={10} textAlign={"left"}>
          <Heading as='h2' m={"10px"}>Liked Projects</Heading>
            {response.data == null || response.loading ? (
              <SpinnerComponent></SpinnerComponent>
            ) : (
              response.data.map((proj, i) => {
                return (
                  <CardComponent
                  onLikeChange={refresh}
                  {...proj}
                  ></CardComponent>
                );
              })
            )}
          </Stack>
        </Box>
      </Center>

      <Center>
      <Box w='90%' textAlign={'right'} boxShadow='xl' borderRadius={20} mt='60px' pb='25px'>
          <Stack spacing={10} textAlign={"left"}>
            <Heading as='h2' m={"10px"}>Joined Projects</Heading>
            {assigned_projects_response.loading ? (
              <SpinnerComponent></SpinnerComponent>
            ) : (
              assigned_projects_response.data?.map((proj, i) => {
                return (
                  <CardComponent
                  {...proj}
                  onLikeChange={refresh}
                  ></CardComponent>
                );
              })
            )}
          </Stack>
        </Box>
      </Center>

      <Box mb='250px'></Box>
    </>
  );
}

export default FavouritesView;
