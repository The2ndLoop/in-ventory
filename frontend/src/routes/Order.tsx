import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { http } from "../libs/api";
import { loginFormSchema } from "../schemas/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginData = z.infer<typeof loginFormSchema>;

const Order = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginData) => {
    setErr("");
    setIsLoading(true);
    http
      .get("/sanctum/csrf-cookie")
      .then(() => {
        http
          .post("/sessions", data)
          .then((res) => {
            console.log(res);

            if (res.status === 201) navigate("/orders");
          })
          .catch((err) => {
            setErr(err.response.data.message);
            if (err.status === 401) {
              navigate("/login");
            } else {
              navigate("/500");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        navigate("/500");
      });
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="blue.50"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading textAlign={"center"} mb={6}>
          いんべんとり
        </Heading>
        <Flex direction="column" bgColor="gray.50" padding={12} rounded={6}>
          <Input
            placeholder="Email"
            variant="filled"
            mb={1}
            type="email"
            {...register("email")}
          />
          <Box mb={6} pl={2} fontSize={"xs"} color={"orange.500"}>
            {errors.email?.message?.toString()}
          </Box>
          <Input
            placeholder="Password"
            variant="filled"
            mb={1}
            type="password"
            {...register("password")}
          />
          <Box mb={9} pl={2} fontSize={"xs"} color={"orange.500"}>
            {errors.password?.message?.toString()}
          </Box>
          {err && (
            <Box mb={9} pl={2} fontSize={"xs"} color={"orange.500"}>
              {err}
            </Box>
          )}

          <Button
            isLoading={isLoading}
            loadingText="ログイン中"
            colorScheme="blue"
            type="submit"
          >
            ログイン
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Order;
