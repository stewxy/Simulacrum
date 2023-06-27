import { ProfileUserCardComponentProps } from "../types/props/ProfileUserCardComponentProps";
import {
  Box,
  Tag,
  Circle,
  Image,
  Center,
  Text,
  IconButton,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils";
import { FiLogOut } from "react-icons/fi";

function ProfileUserCardComponent(props: ProfileUserCardComponentProps) {
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <Box
          w="90%"
          textAlign={"right"}
          boxShadow="xl"
          borderRadius={20}
          mt="60px"
          pb="10px"
        >
          <Box margin={"0px 10px"} padding={3}>
            <Flex>
              <Box>
                <Circle
                  size={"100px"}
                  bg={"white"}
                  zIndex="-1"
                  boxShadow="base"
                  mt="-60px"
                  onClick={() => navigate("/uploadprofilepicture")}
                  bgImage={props.userProfilePic}
                  bgPosition="center"
                  bgSize="cover"
                ></Circle>
                <Circle
                  overflow={"hidden"}
                  size="30px"
                  boxShadow="base"
                  ml="70px"
                  mt="-30px"
                >
                  {props.ownProfile ? (
                    <IconButton
                      bg="white"
                      icon={<MdOutlineEdit size={17} />}
                      aria-label="Edit"
                      onClick={() => navigate("/uploadprofilepicture")}
                      variant="fill"
                    ></IconButton>
                  ) : <></>}
                </Circle>
              </Box>
            </Flex>
            <Text
              mt="-30px"
              fontWeight={"bold"}
              textOverflow={"ellipsis"}
              noOfLines={1}
              fontSize={18}
            >
              {props.firstName} {props.lastName}
            </Text>
            <Divider
              w="60%"
              margin={"10px 0px 10px 40%"}
              borderColor={"gray"}
            ></Divider>
          </Box>
          <Box
            mt="-15px"
            textAlign={"left"}
            boxShadow="2xl"
            borderColor="#727272"
            borderRadius="20px"
          >
            <Box p="3">
              <Text fontSize={18} ml="10px" mb="5px" fontWeight={"bold"}>
                Interests
              </Text>
              <Circle
                overflow={"hidden"}
                size="20px"
                boxShadow="base"
                borderWidth="1px"
                ml="90px"
                mt="-28px"
              >
                {props.ownProfile ? (
                  <IconButton
                    bg="white"
                    icon={<MdOutlineEdit size={12} />}
                    aria-label="Edit"
                    onClick={() => navigate("/registerSkills")}
                    variant="fill"
                  ></IconButton>
                ) : <></>}
              </Circle>
              {props.interestTags.map((tag, i) => {
                return (
                  <Tag
                    fontSize="10px"
                    ml="5px"
                    mt="1.5px"
                    color="black"
                    boxShadow="sm"
                    size="sm"
                    key="sm"
                    borderRadius="full"
                    variant="unstyled"
                    borderColor="#727272"
                  >
                    {tag.name}
                  </Tag>
                );
              })}
            </Box>
            <Box
              borderWidth="1px"
              borderColor="#727272"
              borderLeftWidth="0px"
              borderRightWidth="0px"
              pt="25px"
              pb="25px"
            >
              <Center textAlign={"center"}>
                <Box w={"100%"}>
                  <Text fontWeight="extrabold" fontSize="36px">
                    {props.projectsJoined}
                  </Text>
                  <Text>Joined</Text>
                </Box>
                <Box
                  w="5px"
                  h="100px"
                  bg="#545454"
                  borderRadius="20px"
                  borderWidth="1px"
                  borderColor="#545454"
                ></Box>
                <Box w={"100%"}>
                  <Text fontWeight="extrabold" fontSize="36px">
                    {props.projectsCreated}
                  </Text>
                  <Text>Created</Text>
                </Box>
              </Center>
            </Box>
            <Box
              borderWidth="1px"
              borderBottomLeftRadius="20"
              borderBottomRightRadius="20"
              borderLeftWidth="0px"
              borderRightWidth="0px"
              pb="10px"
            >
              <Flex>
                <Center flex="1">
                  <Box p="3">
                    <IconButton
                      color="black"
                      colorScheme="black"
                      aria-label="Github"
                      onClick={() => {
                        window.open(props.githubURL, "_blank");
                      }}
                      fontSize="40px"
                      icon={<AiFillGithub />}
                    />
                    <p style={{ fontSize: 12, textAlign: "center" }}>GitHub</p>
                  </Box>
                </Center>
                <Box
                  w="3px"
                  h="50px"
                  bg="#545454"
                  mt="5%"
                  borderRadius="20px"
                  borderWidth="1px"
                  borderColor="#545454"
                ></Box>
                <Center flex="1">
                  <Box p="3">
                    <IconButton
                      color="black"
                      colorScheme="black"
                      onClick={() => {
                        window.open(props.discordURL, "_blank");
                      }}
                      aria-label="Discord"
                      fontSize="35px"
                      icon={<BsDiscord />}
                    />
                    <p style={{ fontSize: 12, textAlign: "center" }}>Discord</p>
                  </Box>
                </Center>
                <Box
                  w="3px"
                  h="50px"
                  bg="#545454"
                  mt="5%"
                  borderRadius="20px"
                  borderWidth="1px"
                  borderColor="#545454"
                ></Box>
                <Center flex="1">
                  <Box p="3">
                    <IconButton
                      color="black"
                      colorScheme="black"
                      aria-label="Email"
                      onClick={() => {
                        window.open(props.emailURL, "_blank");
                      }}
                      fontSize="50px"
                      icon={<MdEmail size={45} />}
                    />
                    <p style={{ fontSize: 12, textAlign: "center" }}>Email</p>
                  </Box>
                </Center>
              </Flex>
            </Box>
          </Box>
          <Center paddingTop="10px">
            <Flex w="90%">
              {props.ownProfile ? (
                <>
                  <Button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    leftIcon={<FiLogOut size={20} />}
                    fontSize="18px"
                    fontWeight="bold"
                    color="white"

                    bg="#e00b0b"
                    borderRadius="20"
                    borderTopRightRadius="0"
                    borderBottomRightRadius="0"
                    boxShadow="inner"
                    variant="solid"
                    width="80%"
                    _hover={{
                      bg: "#dcf4f6",
                    }}
                  >
                    Logout
                  </Button>

                  <Button
                    onClick={() => navigate("/updateprofile")}
                    leftIcon={<MdOutlineEdit size={20} />}
                    fontSize="18px"
                    fontWeight="bold"
                    color="white"

                    bg="#0cd5e8"
                    borderRadius="20"
                    borderBottomLeftRadius="0"
                    borderTopLeftRadius="0"
                    boxShadow="inner"
                    variant="solid"
                    width="80%"
                    _hover={{
                      bg: "#dcf4f6",
                    }}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : <></>}
            </Flex>
          </Center>
        </Box>
      </Center>
    </>
  );
}

export default ProfileUserCardComponent;
