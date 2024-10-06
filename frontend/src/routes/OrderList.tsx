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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { http } from "../libs/api";
import { z } from "zod";
import { customer } from "../schemas/customer";
import { product } from "../schemas/product";

type CustomerData = z.infer<typeof customer>;
type ProductData = z.infer<typeof product>;

const OrderList = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [productOrder, setProductOrder] = useState([""]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const addProduct = () => {
    setProductOrder([...productOrder, ""]);
  };
  const removeProduct = () => {
    if (productOrder.length === 1) return;
    const newProductOrder = productOrder.slice(0, -1);
    setProductOrder(newProductOrder);
  };
  useEffect(() => {
    http
      .get("/customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch(() => {
        console.log("error");
      });
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
      <Flex w={"80%"} justifyContent={"space-between"} alignItems={"center"}>
        <Heading textAlign={"center"} my={6}>
          発注表
        </Heading>
        <Button colorScheme="blue" size="lg" onClick={onOpen}>
          発注を追加
        </Button>
      </Flex>

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}></form>
            <FormControl>
              <Select placeholder="クライアント">
                {customerData.map((customer) => (
                  <option value={customer.id}>{customer.name}</option>
                ))}
              </Select>
            </FormControl>

            {productOrder.map((order) => (
              <FormControl mt={4} key={order}>
                <Select placeholder="プロダクト">
                  {productData.map((product) => (
                    <option value={product.id}>{product.name}</option>
                  ))}
                </Select>
                <NumberInput defaultValue={1} min={1} max={100} mt={2}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            <Flex>
              <Button mr={3} onClick={removeProduct}>
                -
              </Button>
              <Button colorScheme="blue" onClick={addProduct}>
                +
              </Button>
            </Flex>
            <Flex>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OrderList;
