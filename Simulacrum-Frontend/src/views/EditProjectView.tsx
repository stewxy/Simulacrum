import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
    Text,
    Center,
    Flex,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import {useParams } from "react-router-dom";
  import HeaderComponent from "../components/HeaderComponent";
  import { isLoggedIn } from "../utils";
  import { useNavigate } from "react-router-dom";
  import { LeadResponse } from '../types/responses/LeadResponse';
  import { APIResponse } from '../types/responses/APIResponse';
  import { ViewProjectResponse } from "../types/responses/ViewProjectResponse";
  import {EditProjectRequest} from "../types/requests/EditProjectRequest";
  import SpinnerComponent from "../components/SpinnerComponent";

  function EditProjectView() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [gitHubLink, setGitHubLink] = useState<string>('');
    const [driveLink, setDriveLink] = useState<string>('');
    const [discordLink, setDiscordLink] = useState<string>('');
    const [jiraLink, setJiraLink] = useState<string>('');
    const [leadResponse, setLeadResponse] = useState<APIResponse<LeadResponse>>({
        loading: true,
        error: false,
        data: null
    });
      
    const [response, setResponse] = useState<APIResponse<ViewProjectResponse>>({
        loading: true,
        error: false,
        data: null,
    });
    
    const { id } = useParams();

    function cancel() {
        navigate(`/viewproject/${id}`);
    }

    function save() {
        axios.post<EditProjectRequest>(`https://simulacrum-api.azurewebsites.net/api/Projects/EditProject?id=${id}`, req)
        .then((res) => {
          navigate(`/viewproject/${id}`);
        })
        .catch((res) => {
            console.log(req);
            console.log(res.data);
        });
    }

    let req: EditProjectRequest = {
        name: projectName,
        googleDriveURL: driveLink,
        gitHubRepoURL: gitHubLink,
        jiraURL: jiraLink,
        discordURL: discordLink,
        description: description
      };
      
    useEffect(() => {
        axios
          .get<ViewProjectResponse>(`https://simulacrum-api.azurewebsites.net/api/Projects/SearchProjectsById/${id}`)
          .then((res) => {
            setResponse({ loading: false, error: false, data: res.data });
            setProjectName(res.data.name);
            setDescription(res.data.description);
            setGitHubLink(res.data.gitHubRepoURL);
            setDiscordLink(res.data.discordURL);
            setJiraLink(res.data.jiraURL);
          })
          .catch(() => {
            setResponse({ loading: false, error: true, data: null });
            navigate("/myprofile")
          });
          
        if (isLoggedIn()) {
            axios.get<LeadResponse>(`https://simulacrum-api.azurewebsites.net/api/Projects/IsProjectLead?id=${id}`)
              .then((res) => {
                setLeadResponse({ loading: false, error: false, data: res.data });
                if (!res.data.isLead){
                    navigate(`/viewproject/${id}`);
                }
              })
              .catch(() => {
                setLeadResponse({ loading: false, error: true, data: null });
            });
        }
        else{
            navigate('/login');
        }
    }, []);

    if (leadResponse.data?.isLead && response.data!=null){
        return (
            <>
      <HeaderComponent headerName={"Edit project"}></HeaderComponent>
      <Center mt='30px' >
        <Box
          w='95%'
          h='100px'
          bg='white'
          boxShadow='base'
          borderTopRadius='20px'
        ></Box>
      </Center>
      <Center>
        <Box mt='-65px' p={5} w='95%' h='100%' pb='30px' borderRadius='20' boxShadow='base' bg='white'>
          <Stack spacing={3} marginLeft={5} marginRight={5}>
            <FormControl>
              <FormLabel>Project name</FormLabel>
              <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter new project name"/>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter new project description"/>
            </FormControl>
            <FormControl>
                <FormLabel>Github URL</FormLabel>
                <Input
                  value={gitHubLink} onChange={(e) => setGitHubLink(e.target.value)}
                  placeholder="Enter new GitHub URL"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Discord URL</FormLabel>
                <Input
                  value={discordLink} onChange={(e) => setDiscordLink(e.target.value)}
                  placeholder="Enter new Discord URL"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Google Drive URL</FormLabel>
                <Input
                  disabled={response.loading}
                  value={driveLink} onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="Enter new Google Drive URL"
                />
              </FormControl>
            <FormControl>
                <FormLabel>Jira URL</FormLabel>
                <Input
                  value={jiraLink} onChange={(e) => setJiraLink(e.target.value)}
                  placeholder="Enter new Jira URL"
                />
            </FormControl>
          </Stack>
        </Box>
      </Center>
      <Center>
        <Box
          zIndex='-1'
          bg='white'
          w='95%'
          mt='-30px'
          pt='35px'
          pb='55px'
          boxShadow='xl'
          borderBottomRadius='20'
        >
        </Box>
      </Center>
      <Center pb='20px'>
        <Flex w='95%' h='fit-content' mt='-65px'>
          <Button
            onClick={cancel}
            fontSize='24px'
            fontWeight="bold"
            color="black"
            w='50%'
            bg='white'
          >
            <Text>
              Cancel
            </Text>
          </Button>
          <Button
            onClick={save}
            disabled={response.loading}
            fontSize='24px'
            fontWeight="bold"
            color="white"
            w='50%'
            bg='#00a4fe'
            mt='5px'
            boxShadow='inner'
            borderRightRadius='20'
            pb='5px'
            mr='5px'
          >
            <Text>
              Save
            </Text>
          </Button>
        </Flex>
      </Center>
      <Box mb='250px'></Box>
    </>
        )
    }
    return (
        <>
        <HeaderComponent headerName={"Edit project"}></HeaderComponent>
        <SpinnerComponent></SpinnerComponent>
        <Box mb='250px'></Box>
      </>
    )

}
   
  
  export default EditProjectView;
  