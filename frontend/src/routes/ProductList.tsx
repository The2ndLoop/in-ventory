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
import { product } from "../schemas/product";

type ProductData = z.infer<typeof product>;

const ProductList = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  useEffect(() => {
    http
      .get("/products")
      .then((res) => {
        setProductData(res.data);
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
        プロダクトリスト
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
            {productData.map((product) => (
              <Tr>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ProductList;
