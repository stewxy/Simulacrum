import react from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { ProjectTitleComponentProps } from "../types/props/ProjectTitleComponentProps";
import cardImage from "../images/card_image.png";

function ProjectTitleComponent(props: ProjectTitleComponentProps) {
  return (
    <Center>
      <Box
        backgroundImage={cardImage}
        bgRepeat='round'
        mt="30px"
        p='4'
        w="100%"
        h="100%"
        color='white'
        fontSize='24px'
        fontWeight='bold'
        borderRadius="20"
        borderLeftRadius="20"
        borderRightRadius="20"
        boxShadow="xl"
      >
        <Text noOfLines={3}>{props.title}</Text>
      </Box>
    </Center>
  );
}

export default ProjectTitleComponent;
