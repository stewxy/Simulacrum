import {
  Box, Button, Center, FormLabel, Stack, Text, Spacer, Flex, Table, TableContainer, Tbody, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CheckboxGroup
} from "@chakra-ui/react";
import { TagsInput } from "react-tag-input-component";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { APIResponse } from "../types/responses/APIResponse";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BiAddToQueue } from "react-icons/bi";
import { Skill } from "../types/Skill";
import SpinnerComponent from "../components/SpinnerComponent";
import { UpdateUserSkillsRequest } from "../types/requests/UpdateUserSkillsRequest";
import { ProfileResponse } from "../types/responses/ProfileResponse";


function RegisterSkillsView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const [response, setResponse] = useState<APIResponse<Skill[]>>({
    loading: false,
    error: false,
    data: null
  });

  const [skills, setSkills] = useState<APIResponse<Skill[]>>({
    loading: true,
    error: false,
    data: null
  });

  const [mySkills, setMySkills] = useState<APIResponse<Skill[]>>({
    loading: true,
    error: false,
    data: null
  });

  const [categories, setCategories] = useState<Set<string>>(new Set<string>);

  useEffect(() => {
    axios.get<Skill[]>('https://simulacrum-api.azurewebsites.net/api/Skills/Skills')
      .then((res) => {
        setSkills({ loading: false, error: false, data: res.data });
        let skills: Skill[] = res.data;
        let cat: Set<string> = new Set<string>();
        skills.forEach((skill) => {
          if (!cat.has(skill.category))
            cat.add(skill.category);
        });
        setCategories(cat);
      })

    axios.get<Skill[]>('https://simulacrum-api.azurewebsites.net/api/Profile/MySkills')
      .then((res) => {
        setMySkills({ loading: false, error: false, data: res.data });
        setSelected(res.data.map((s) => { return s.name }));
      })
  }, []);

  function registerSkills() {
    setResponse({ ...response, loading: true });
    let registerStep: boolean = searchParams.get('registerStep') !== null;
    if (registerStep) {
      axios.post<Skill[]>('https://simulacrum-api.azurewebsites.net/api/Profile/AssignSkillsToUser', selected)
        .then((res) => {
          setResponse({ loading: false, error: false, data: res.data });
          navigate("/uploadprofilepicture");
        }).catch((res) => {
          alert('An error occurred');
        })
    } else {
      axios.post<ProfileResponse>('https://simulacrum-api.azurewebsites.net/api/Profile/UpdateProfile', {
        skills: selected
      }).then((res) => {
        setResponse({ loading: false, error: false, data: res.data.skills });
        navigate('/profile');
      })
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>, skillName: string) {
    if (e.target.checked)
      setSelected(selected => [...selected, skillName]);
    else
      setSelected(selected.filter((skill) => skill != skillName));
  }

  if (skills.loading || mySkills.loading) {
    return <SpinnerComponent />
  }

  return (
    <>
      <HeaderComponent headerName={"Add Skills"}></HeaderComponent>
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
              bg='#00a4fe'
              borderRadius='20'
              boxShadow='inner'
            ></Box>
            <Spacer />
            <Box
              w='55px'
              h='7px'
              bg='#00a4fe'
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
      <Center mt='30px' >
        <Box
          mt='-65px'
          p={5}
          w='95%'
          h='100%'
          pb='30px'
          borderRadius='20'
          boxShadow='base'
          bg='white'
        ></Box>
      </Center>
      {searchParams.get('registerStep') ? (
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
                borderRadius='20'
                boxShadow='inner'
              ></Box>
            </Flex>
          </Box>
        </Center>
      ) : <></>}

      <Center>
        <Stack w='95%'>
          <Box bg='white' boxShadow="base" mt='-65px' mb='-20px' borderRadius='20' p='10px' pb='40px'>
            <Stack spacing={3} marginLeft={5} marginRight={5}>
              <Text>
                Add skills to your profile so we can match you to the best projects for
                you.
              </Text>
              <Text>
                Add skills here:
              </Text>
              <Accordion allowToggle allowMultiple>
                {Array.from(categories).map((category) => {
                  return (
                    <AccordionItem boxShadow='xs'>
                      <AccordionButton
                        bg="white"

                        _expanded={{
                          bg: "#00a4fe",
                          color: "white",
                          fontWeight: "bold",
                          borderTopRadius: "10"
                        }}
                      >
                        <Box textAlign="left" textTransform={'capitalize'}>
                          {category}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel bg="white">
                        <TableContainer>
                          <Table variant='simple'>
                            <Tbody>
                              {skills.data?.filter(skill => skill.category == category).map((skill) => {
                                return (
                                  <Stack
                                    p='3'
                                    boxShadow='sm'
                                    borderLeft='None'
                                    borderRight='None'
                                    borderTop='None'
                                    cursor={'pointer'}>
                                    <Checkbox
                                      icon={<BiAddToQueue />}
                                      defaultChecked={mySkills.data?.some((s) => s.name == skill.name)}
                                      onChange={(e) => onChange(e, skill.name)}
                                      disabled={response.loading}
                                    >
                                      {skill.name}
                                    </Checkbox>
                                  </Stack>
                                )
                              })}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </Stack>
          </Box>
        </Stack>
      </Center >
      <Center pb='20px'>
        <Flex w='95%' h='20px' mt='30px'>
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
            onClick={() => navigate("/registerLinks")}
            disabled={response.loading}
          >
            <Text>
              Previous
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
            disabled={response.loading}
            onClick={registerSkills}
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

export default RegisterSkillsView;
