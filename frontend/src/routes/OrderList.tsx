import { Flex, Heading } from "@chakra-ui/react";

const OrderList = () => {
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="blue.50"
    >
      <Heading textAlign={"center"} mb={6}>
        発注表
      </Heading>
    </Flex>
  );
};

export default OrderList;
