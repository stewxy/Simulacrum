import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";

function SpinnerComponent() {
  return (
    <Stack>
      <Center>
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#00A4FE"
          size="xl"
          mt="30px"
        />
      </Center>
      <Text align="center">
        Please Wait... Your time is very important to us 😂👌💯🔥
      </Text>
    </Stack>
  );
}

export default SpinnerComponent;
