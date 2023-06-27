import { Box, Center, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import SpinnerComponent from "../components/SpinnerComponent";
import { Project } from "../types/Project";
import { APIResponse } from "../types/responses/APIResponse";

function AssignedProjectsView() {
  const [response, setResponse] = useState<APIResponse<Project[]>>({
    loading: true,
    error: false,
    data: null,
  });

  useEffect(() => {
    axios
      .get<Project[]>(
        "https://simulacrum-api.azurewebsites.net/api/Projects/MyProjects"
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      });
  }, []);

  return (
    <>
      <HeaderComponent headerName={"Assigned projects"}></HeaderComponent>
      <Center>
        <Box
          mt="30px"
          mb="30px"
          p={5}
          w="95%"
          h="100%"
        >
          <Stack spacing={10}>
            {response.loading ? (
              <SpinnerComponent></SpinnerComponent>
            ) : (
              response.data?.map((proj, i) => {
                return (
                  <CardComponent
                  {...proj}
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

export default AssignedProjectsView;
