import react from "react";
import { Box, Text, Center, Button, Flex, Divider } from "@chakra-ui/react";
import { SearchResultComponentProps } from "../types/props/SearchResultComponentProps";
import { useNavigate } from "react-router-dom";
import cardImage from "../images/card_image.png";

function SearchResultComponent(props: SearchResultComponentProps) {
  const navigate = useNavigate();

  return (
    <>
      

      <Center>
            <Box p={5} w='320px' h='250px' bg='#dcf4f6' borderRadius='20' boxShadow='xl'>
                <Box backgroundImage={cardImage} w='320px' h='50px' ml='-20px' mt='-20px' borderTopLeftRadius='20' borderTopRightRadius='20' boxShadow='base'></Box>
          <Flex w="320px" h="30px" ml="-20px" mt="180px">
            <Button
              fontSize="18px"
              fontWeight="extrabold"
              w="100%"
              bg="#00a4fe"
              borderRightRadius="0"
              borderBottomLeftRadius="20"
              borderBottomRightRadius="20"
              boxShadow="inner"
              variant="solid"
              onClick={() => {
                navigate("/viewproject/" + props.id);
              }}
              _hover={{ bg: "#dcf4f6" }}
            >
              Open Project
            </Button>
          </Flex>
          <Box bg="white" w="0px" h="40px" mt="-245px" borderRadius="50"></Box>

          <Text fontSize="24px"> {props.title} </Text>
          <Divider borderBottomWidth="1px" borderBottomColor="#8b9192" />
          <Flex>
            <Text fontSize="12px" mr="15px">
              {" "}
              {props.description}{" "}
            </Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default SearchResultComponent;
