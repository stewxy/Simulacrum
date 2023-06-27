import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import ProfileDetailsComponent from "../components/ProfileDetailsComponent";
import ProfileUserCardComponent from "../components/ProfileUserCardComponent";
import { APIResponse } from "../types/responses/APIResponse";
import { ProfileResponse } from "../types/responses/ProfileResponse";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { logout } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";

function ProfileView() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [response, setResponse] = useState<APIResponse<ProfileResponse>>({
    loading: true,
    error: false,
    data: null,
  });


  useEffect(() => {
    axios
      .get<ProfileResponse>(
        userId === undefined ?
          'https://simulacrum-api.azurewebsites.net/api/Profile/GetProfileOverview' :
          `https://simulacrum-api.azurewebsites.net/api/Profile/GetProfileOverview/${userId}`
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      })
      .catch(() => {
        setResponse({ loading: false, error: true, data: null });
      });
  }, []);

  if (response.error) {
    return <p>Error occurred</p>;
  } else if (response.data != null) {
    return (
      <>
        <HeaderComponent headerName={"Profile"} />

        <ProfileUserCardComponent
          firstName={response.data.firstName}
          lastName={response.data.lastName}
          userProfilePic={response.data.profilePicFileURL}
          projectsJoined={response.data.assignedProjects.length}
          projectsCreated={response.data.createdProjects.length}
          interestTags={response.data.skills}
          ownProfile={userId === undefined}
          githubURL={response.data.gitHubURL}
          discordURL={response.data.discordURL}
          emailURL={response.data.email}
        ></ProfileUserCardComponent>
        <Box mb="20px">

        </Box>
        <ProfileDetailsComponent
          DetailName="Projects joined"
          Projects={response.data.assignedProjects}
          IconType={
            <Box w={"60px"} h={"20px"} mb="6px">
              <Center>
                <Box
                  borderWidth="1px"
                  borderRadius="20px"
                  pl="20px"
                  pr="20px"
                  pb="1px"
                >
                  <Text fontWeight="extrabold">
                    {" "}
                    {response.data.assignedProjects.length}{" "}
                  </Text>
                </Box>
              </Center>
            </Box>
          }
        ></ProfileDetailsComponent>
        <Box mb="20px"></Box>
        <ProfileDetailsComponent
          DetailName="Projects created"
          Projects={response.data.createdProjects}
          IconType={
            <Box w={"60px"} h={"20px"}>
              <Center>
                <Box
                  borderWidth="1px"
                  borderRadius="20px"
                  pl="20px"
                  pr="20px"
                  pb="1px"
                >
                  <Text fontWeight="extrabold">
                    {" "}
                    {response.data.createdProjects.length}{" "}
                  </Text>
                </Box>
              </Center>
            </Box>
          }
        ></ProfileDetailsComponent>
        <Box mb="250px"></Box>
      </>
    );
  }
  return (
    <>
      <HeaderComponent headerName={"Profile"} />
      <Center>
        <Box
          w="90%"
          textAlign={"right"}
          boxShadow="xl"
          borderRadius={20}
          mt="60px"
          pb="25px"
        >
          <SpinnerComponent></SpinnerComponent>
        </Box>
      </Center>
    </>
  );
}

export default ProfileView;
