import {
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { http } from "../libs/api";
import { z } from "zod";
import { customer } from "../schemas/customer";

type CustomerData = z.infer<typeof customer>;

const OrderList = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  useEffect(() => {
    http
      .get("/customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="blue.50"
      direction={"column"}
    >
      <Heading textAlign={"center"} my={6}>
        顧客リスト
      </Heading>

      <TableContainer
        maxWidth="80%"
        whiteSpace="normal"
        overflowY="scroll"
        my={12}
      >
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerData.map((customer) => (
              <Tr>
                <Td>{customer.name}</Td>
                <Td>{customer.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default OrderList;
