import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
  Text,
  Center,
  Flex,
  Spacer
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HeaderComponent from '../components/HeaderComponent';
import { useNavigate } from "react-router-dom";
import { CreateStep1 } from "../types/steps/CreateStep1";

function CreateProjectView() {
  const [projectName, setProjectName] = useState<string>('');
  const [memberLimit, setMemberLimit] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  function nextStep() {
    let cs1: CreateStep1 = {
      projectName: projectName,
      memberLimit: Number(memberLimit),
      description: description
    };

    localStorage.setItem('createstep1', JSON.stringify(cs1));
    navigate('/createprojectstep2');
  }

  function cancel() {
    localStorage.removeItem('createstep1');
    localStorage.removeItem('createstep2');
    localStorage.removeItem('createstep3');
    navigate('/')
  }

  useEffect(() => {
    if (localStorage.getItem('createstep1') !== null) {
      let cs1: CreateStep1 = JSON.parse(localStorage.getItem('createstep1')!);
      setProjectName(cs1.projectName);
      setMemberLimit(cs1.memberLimit.toString());
      setDescription(cs1.description);
    }
  }, [])

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

              borderRadius='20'
              boxShadow='inner'
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
          <Stack spacing={3} marginLeft={5} marginRight={5}>
            <FormControl isRequired>
              <FormLabel>Project name</FormLabel>
              <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter project description" />
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel>Member limit</FormLabel>
              <NumberInput defaultValue={5} min={1}>
                <NumberInputField value={memberLimit} onChange={(e) => setMemberLimit(e.target.value)} />
              </NumberInput>
            </FormControl> */}
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
}

export default CreateProjectView;
