import { Flex, Heading } from "@chakra-ui/react";

const InternalServerError = () => {
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="blue.50"
    >
      <Heading textAlign={"center"} mb={6}>
        Internal Server Error
      </Heading>
    </Flex>
  );
};

export default InternalServerError;
