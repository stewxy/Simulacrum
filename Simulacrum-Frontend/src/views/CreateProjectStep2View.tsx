import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  Stack,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from "@chakra-ui/react";
import HeaderComponent from '../components/HeaderComponent';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIResponse } from "../types/responses/APIResponse";
import { SkillsResponse } from "../types/responses/SkillsResponse";
import axios from "axios";
import { CreateStep2 } from "../types/steps/CreateStep2";
import { object } from "prop-types";
import { Step2Skill } from "../types/steps/Step2Skill";

function CreateProjectView() {
  const navigate = useNavigate();
  let skillsCategoryDict = new Map<string, string[]>();
  let skillIdDict = new Map<string, string>();
  let skillWeight = new Map<number, string[]>();

  let components1: React.ReactElement[] = [];
  let components2: React.ReactElement[] = [];
  let components3: React.ReactElement[] = [];
  let [selected, setSelected] = useState<string[]>([]);
  const [response, setResponse] = useState<APIResponse<SkillsResponse[]>>({
    loading: true,
    error: false,
    data: null,
  });


  function nextStep() {
    let cs2: CreateStep2 = {
      desiredSkills: []
    }
    skillWeight.forEach((item, weight) => {
      item.forEach(skill => {
        skillIdDict.forEach((name, id) => {
          if (name == skill) {
            let step2Skill: Step2Skill = {
              id: id,
              name: name,
              weight: weight
            };
            // let skillJson = `{"id": "${id}", "name" : "${skill}", "weight" : ${weight}}`;
            cs2.desiredSkills.push(step2Skill);
          }
        });
      });
    });
    localStorage.setItem('createstep2', JSON.stringify(cs2));
    //console.log(localStorage.getItem('createstep2'));
    navigate('/createprojectstep3');
  }


  useEffect(() => {
    setResponse({ ...response, loading: true });
    axios
      .get<SkillsResponse[]>(
        "https://simulacrum-api.azurewebsites.net/api/Skills/Skills"
      )
      .then((res) => {
        setResponse({ loading: false, error: false, data: res.data });
      });
  }, []);

  function isSelected(skill: string) {
    return selected.includes(skill);
  }

  function checkBox(skill: string, tab: number) {
    let skillList = document.getElementsByClassName(skill);
    if (isSelected(skill)) {
      selected = selected.filter(s => s != skill);
      if (skillIdDict.get(skill) != undefined) {
        skillWeight.set(tab, skillWeight.get(tab)!.filter(s => s != skillIdDict.get(skill)));
      }
      if (skillList != null && skill != '') {
        let allTabs = document.querySelectorAll(`.${skill}`) as NodeListOf<HTMLButtonElement>;
        allTabs.forEach(element => {
          element.disabled = false;
          element.style.backgroundColor = "";
        });
      }
    }

    else {
      selected.push(skill);
      if (!skillWeight.has(tab)) {
        skillWeight.set(tab, []);
      }
      skillWeight.get(tab)?.push(skillIdDict.get(skill)!);

      if (skillList != null) {
        let current = skillList[3 - tab];
        if (skillList != null && skill != '') {
          let allTabs = document.querySelectorAll(`.${skill}`) as NodeListOf<HTMLButtonElement>;
          allTabs.forEach(element => {
            if (element.id != current.id) {
              element.style.backgroundColor = "";
              element.disabled = true;
              element.style.backgroundColor = "#D2D2CF";
            }
            else {
              element.style.backgroundColor = "#D2D2CF";
            }
          });
        }
      }
    }
  }


  if (response.data != null) {
    response.data.forEach(element => {
      if (!skillsCategoryDict.has(element.category)) {
        skillsCategoryDict.set(element.category, []);
      }
      skillsCategoryDict.get(element.category)?.push(element.id.toString());
      skillIdDict.set(`_${element.id.toString()}`, element.name);
    });

    skillsCategoryDict.forEach((item, key) => {
      let children1: React.ReactElement[] = [];
      let children2: React.ReactElement[] = [];
      let children3: React.ReactElement[] = [];

      item.forEach(skill => {
        skill = `_${skill}`;
        children1.push(
          <Button borderRadius={0} variant='ghost' fontWeight={"normal"} textAlign={"left"} width={"100%"} onClick={() => checkBox(skill, 3)} id={"3"} className={skill}>{skillIdDict.get(`${skill}`)}</Button>
        );

        children2.push(
          <Button borderRadius={0} variant='ghost' fontWeight={"normal"} width={"100%"} onClick={() => checkBox(skill, 2)} id={"2"} className={skill}>{skillIdDict.get(`${skill}`)}</Button>
        );

        children3.push(
          <Button borderRadius={0} variant='ghost' fontWeight={"normal"} width={"100%"} onClick={() => checkBox(skill, 1)} id={"1"} className={skill}>{skillIdDict.get(`${skill}`)}</Button>
        );
      });

      components1.push(
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                fontWeight="bold"
                textTransform={"uppercase"}
                _expanded={{
                  bg: "#00a4fe",
                  color: "white"
                }}>
                <Box
                  flex='1'
                  textAlign='left'>
                  {key}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {children1}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      components2.push(
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                fontWeight="bold"
                textTransform={"uppercase"}
                _expanded={{
                  bg: "#00a4fe",
                  color: "white"
                }}>
                <Box
                  flex='1'
                  textAlign='left'>
                  {key}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {children2}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      components3.push(
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem
          >
            <h2>
              <AccordionButton
                fontWeight="bold"
                textTransform={"uppercase"}
                _expanded={{
                  bg: "#00a4fe",
                  color: "white"
                }}>
                <Box
                  flex='1'
                  textAlign='left'>
                  {key}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} >
              {children3}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );
    });
  }
  checkBox('', 3);


  if (response.data != null) {
    if (localStorage.getItem('createstep2') != null) {
      (JSON.parse(localStorage.getItem('createstep2')!).desiredSkills).forEach((skill: Step2Skill) => {
        if (!selected.includes(skill.id)) {
          checkBox(skill.id, skill.weight);
        }
      });
    }
    return (
      <>
        <HeaderComponent headerName={"Create project"}></HeaderComponent>
        <Center mt='30px'>
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
                borderRadius='20'
                boxShadow='inner'
              ></Box>
            </Flex>
          </Box>
        </Center>
        <Center>
          <Box mt='-65px' p={5} w='95%' h='100%' pb='30px' borderRadius='20' boxShadow='base' bg='white'>


            <Box h='fit-content'>
              <Tabs>
                <TabList>
                  <Tab>Most desirable</Tab>
                  <Tab>Desirable</Tab>
                  <Tab>Good to know</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>

                    <Stack>
                      {components1}
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack>
                      {components2}
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack>
                      {components3}
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>



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
              onClick={() => navigate('/createprojectstep1')}
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
              onClick={() => { nextStep() }}
              fontSize='24px'
              fontWeight="bold"
              color="#00a4fe"
              w='50%'
              bg='white'

              mt='5px'
              boxShadow='inner'
              borderRightRadius='20'
              pb='5px'
              mr='5px'
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
  } else {
    return <></>
  }
}


export default CreateProjectView;
