import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
  Center,
  Flex,
  Spacer,
  Text
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import HeaderComponent from '../components/HeaderComponent';
import { CreateProjectResponse } from "../types/responses/CreateProjectResponse";
import { APIResponse } from "../types/responses/APIResponse";
import { CreateProjectRequest } from "../types/requests/CreateProjectRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tagCleanse } from "../utils";
import { CreateStep1 } from "../types/steps/CreateStep1";
import { CreateStep2 } from "../types/steps/CreateStep2";
import { CreateStep3 } from "../types/steps/CreateStep3";
import { Step2Skill } from "../types/steps/Step2Skill";
import { ProjectSkill } from "../types/ProjectSkill";

function CreateProjectView() {
  const [gitHubLink, setGitHubLink] = useState<string>('');
  const [driveLink, setDriveLink] = useState<string>('');
  const [discordLink, setDiscordLink] = useState<string>('');
  const [jiraLink, setJiraLink] = useState<string>('');

  const [response, setResponse] = useState<APIResponse<CreateProjectResponse>>({
    loading: false, error: false, data: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('createstep3') !== null) {
      let cs3: CreateStep3 = JSON.parse(localStorage.getItem('createstep3')!);
      setGitHubLink(cs3.gitHubLink);
      setDriveLink(cs3.driveLink);
      setDiscordLink(cs3.discordLink);
      setJiraLink(cs3.jiraLink);
    }
  }, []);

  function saveState() {
    let cs3: CreateStep3 = {
      gitHubLink: gitHubLink,
      driveLink: driveLink,
      discordLink: discordLink,
      jiraLink: jiraLink
    };

    localStorage.setItem('createstep3', JSON.stringify(cs3));
    navigate('/createprojectstep2');
  }

  function submitForm() {
    setResponse({ ...response, loading: true });

    let cs1: CreateStep1 = JSON.parse(localStorage.getItem('createstep1')!);
    let cs2: CreateStep2 = JSON.parse(localStorage.getItem('createstep2')!);

    let desiredSkills: ProjectSkill[] = [];

    console.log(desiredSkills)

    let req: CreateProjectRequest = {
      projectName: cs1.projectName,
      description: cs1.description,
      desiredSkills: cs2.desiredSkills.map((skill) => {
        return { name: skill.name, weight: skill.weight }
      }),
      gitHubRepoURL: gitHubLink,
      googleDriveURL: driveLink,
      discordURL: discordLink,
      jiraURL: jiraLink
    }

    axios.post<CreateProjectResponse>('https://simulacrum-api.azurewebsites.net/api/Projects/Create', req)
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
        localStorage.removeItem('createstep1');
        localStorage.removeItem('createstep2');
        localStorage.removeItem('createstep3');
        navigate(`/viewproject/${res.data.id}`);
      })
      .catch(() => {
        setResponse({ loading: false, error: true, data: null })
      });
  }


  return (
    <>
      <HeaderComponent headerName={"Create project"}></HeaderComponent>
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
              w='85px'
              h='7px'
              bg='#00a4fe'
              borderRadius='20'
              boxShadow='base'
            ></Box>
            <Spacer />
            <Box
              w='85px'
              h='7px'
              bg='#00a4fe'
              borderRadius='20'
              boxShadow='base'
            ></Box>
            <Spacer />
            <Box
              w='85px'
              h='7px'
              bg='#00a4fe'
              borderRadius='20'
              boxShadow='base'
            ></Box>
          </Flex>
        </Box>
      </Center>
      <Center>
        <Box mt='-65px' p={5} w='95%' h='100%' pb='30px' borderRadius='20' boxShadow='base' bg='white'>
          <Stack spacing={3} marginLeft={5} marginRight={5}>
            <FormLabel>Additional Project Links</FormLabel>
            <Stack spacing={3} marginLeft={5} marginRight={5}>
              {/* Github */}
              <FormControl>
                <FormLabel>Github</FormLabel>
                <Input
                  disabled={response.loading}
                  value={gitHubLink} onChange={(e) => setGitHubLink(e.target.value)}
                  placeholder="Enter URL"
                />
              </FormControl>
              {/* Discord */}
              <FormControl>
                <FormLabel>Discord</FormLabel>
                <Input
                  disabled={response.loading}
                  value={discordLink} onChange={(e) => setDiscordLink(e.target.value)}
                  placeholder="Enter URL"
                />
              </FormControl>
              {/* Google Drive */}
              <FormControl>
                <FormLabel>Google Drive</FormLabel>
                <Input
                  disabled={response.loading}
                  value={driveLink} onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="Enter URL"
                />
              </FormControl>
              {/* Jira */}
              <FormControl>
                <FormLabel>Jira</FormLabel>
                <Input
                  disabled={response.loading}
                  value={jiraLink} onChange={(e) => setJiraLink(e.target.value)}
                  placeholder="Enter URL"
                />
              </FormControl>
            </Stack>
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
        <Flex w='95%' h='20px' mt='-95px'>
          <Button
            onClick={() => { saveState() }}
            fontSize='24px'
            fontWeight="bold"
            color="black"
            w='50%'
            bg='white'
          >
            <Text>
              Previous
            </Text>
          </Button>
          <Button

            onClick={submitForm}
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
              Complete
            </Text>
          </Button>
        </Flex>
      </Center>
      <Box mb='250px'></Box>
    </>
  );
}

export default CreateProjectView;
