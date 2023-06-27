import {
  background, Box, Center, IconButton, Spinner, FormControl, FormLabel, Input, Button,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, PopoverFooter,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import ProjectContactComponent from "../components/ProjectContactComponent";
import ProjectDescriptionComponent from "../components/ProjectDescriptionComponent";
import ProjectTitleComponent from "../components/ProjectTitleComponent";
import ResourcesAndLinksComponent from "../components/ResourcesAndLinksComponent";
import SpinnerComponent from "../components/SpinnerComponent";
import { APIResponse } from "../types/responses/APIResponse";
import { DeleteProjectRequest } from "../types/requests/DeleteProjectRequest";
import { UnassignProjectRequest } from "../types/requests/UnassignProjectRequest";
import { ViewProjectResponse } from "../types/responses/ViewProjectResponse";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { isLoggedIn } from "../utils";
import { LeadResponse } from '../types/responses/LeadResponse';
import { AssignedResponse } from '../types/responses/AssignedResponse';
import { useNavigate } from "react-router-dom";

function ViewProjectView() {
  const navigate = useNavigate();
  const [projName, setProjName] = useState<string>('');

  const [response, setResponse] = useState<APIResponse<ViewProjectResponse>>({
    loading: true,
    error: false,
    data: null,
  });

  const [leadResponse, setLeadResponse] = useState<APIResponse<LeadResponse>>({
    loading: true,
    error: false,
    data: null
  });

  const { id } = useParams();

  let UnassignReq: UnassignProjectRequest = {
    id: Number(id),
    name: projName
  };


  let req: DeleteProjectRequest = {
    id: Number(id),
    name: projName,
  };

  const DeleteProject = () => {
    axios.delete<DeleteProjectRequest>('https://simulacrum-api.azurewebsites.net/api/Projects/Delete', { data: req })
      .then((res) => {
        navigate('/profile'); //navigate after successful delete
      }).catch((res) => {
        alert('An error occurred');
      })
  }

  const UnassignProject = () => {
    axios.post<UnassignProjectRequest>('https://simulacrum-api.azurewebsites.net/api/Projects/UnassignProjectFromUser', UnassignReq)
      .then((res) => {
        navigate('/profile'); //navigate after successful unassign
      }).catch((res) => {
        alert('An error occurred');
      })
  }

  const EditProject = () => {
    navigate(`/editproject/${id}`);
  }

  useEffect(() => {
    setTimeout(() => {
      axios
        .get<ViewProjectResponse>(
          id === undefined
            ? `https://simulacrum-api.azurewebsites.net/api/Projects/SearchProjectsById/1`
            : `https://simulacrum-api.azurewebsites.net/api/Projects/SearchProjectsById/${id}`
        )
        .then((res) => {
          setResponse({ loading: false, error: false, data: res.data });
        })
        .catch(() => {
          setResponse({ loading: false, error: true, data: null });
        });
    }, 500);

    if (isLoggedIn()) {
      axios.get<LeadResponse>(`https://simulacrum-api.azurewebsites.net/api/Projects/IsProjectLead?id=${id}`)
        .then((res) => {
          setLeadResponse({ loading: false, error: false, data: res.data });
        })
        .catch(() => {
          setLeadResponse({ loading: false, error: true, data: null });
        });
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure()
  let leadbuttons = (leadResponse.data?.isLead ? (
    <Box textAlign={"right"} padding={5}>
      <IconButton
        aria-label='Delete Project'
        size='lg'
        icon={<AiOutlineEdit size={35} />}
        boxShadow="base"
        onClick={EditProject}
      />
      <IconButton
        bg={"#ff392e"}
        color={"white"}
        aria-label='Delete Project'
        size='lg'
        icon={<RiDeleteBin5Line size={35} />}
        boxShadow="base"
        margin={"0px 30px"}
        _hover={{ bg: '#ffcac8' }}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete project confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter project name to confirm</FormLabel>
              <Input onChange={(e) => { setProjName(e.currentTarget.value) }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button size={"sm"} bg={"#ff392e"} color={"white"} _hover={{ bg: '#ffcac8' }} onClick={DeleteProject}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <></>
  ))

  let leaveProjButton = (!leadResponse.data?.isLead && response.data?.isAssigned ? (
    <Box textAlign={"right"} padding={5}>

      <Button
        bg={"#ff392e"}
        color={"white"}
        aria-label='Leave Project'
        size='md'
        boxShadow="base"
        margin={"0px 30px"}
        _hover={{ bg: '#ffcac8' }}
        onClick={onOpen}>Leave Project</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to leave?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter project name to confirm leave</FormLabel>
              <Input onChange={(e) => { setProjName(e.currentTarget.value) }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button size={"sm"} bg={"#ff392e"} color={"white"} _hover={{ bg: '#ffcac8' }} onClick={UnassignProject}>Leave</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <></>
  ))


  if (response.error) {
    return <p>Error occurred</p>;
  } else if (response.data != null) {
    return (
      <>
        <HeaderComponent headerName={"View project"}></HeaderComponent>
        <Center>
          <Box w='85%'>
            <ProjectTitleComponent
              title={response.data?.name}
            ></ProjectTitleComponent>
            <ProjectDescriptionComponent
              description={response.data?.description}
              interestTags={response.data?.requiredSkills}
            ></ProjectDescriptionComponent>
            <ResourcesAndLinksComponent
              googleDriveURL={response.data.googleDriveURL}
              jiraURL={response.data.jiraURL}
              githubURL={response.data.gitHubRepoURL}
              discordURL={response.data.discordURL}
            ></ResourcesAndLinksComponent>
            <ProjectContactComponent
              projectLead={response.data.projectLead.username}
              isAssigned={response.data.isAssigned}
              date={new Date(response.data.dateCreated).toLocaleDateString(
                "en-UK"
              )}
              email={response.data.projectLead.email}
              projectId={response.data.id}
            ></ProjectContactComponent>
          </Box>
        </Center>
        {leadbuttons}
        {leaveProjButton}

        <Box mb='250px'></Box>
      </>
    );
  } else {
    return (
      <>
        <HeaderComponent headerName={"View project"}></HeaderComponent>
        <SpinnerComponent></SpinnerComponent>
        <Box mb='250px'></Box>
      </>
    );
  }
}

export default ViewProjectView;
