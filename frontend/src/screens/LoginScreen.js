import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Box
      w="100%"
      pt={20}
      id="about"
      d="flex"
      flexDir="column"
      alignItems="center"
      px={{ md: "5" }}
    >
      <Box
        d="flex"
        mt={10}
        mb={10}
        backgroundColor="white"
        boxShadow="dark-lg"
        maxW={{ base: "90%", md: "90%", lg: "60%" }}
      >
        <SimpleGrid columns={{ base: "1", md: "2" }} spacing={10}>
          <Box
            d="flex"
            alignItems="center"
            justifyContent="center"
            maxBlockSize={{ base: "xs", md: "sm" }}
            mx="auto"
            mt={10}
            p={30}
          >
            <Image src="/images/login_img.png" />
          </Box>

          <Box d="flex" flexDir="column" alignItems="center" p={30}>
            <Text fontSize="2xl" fontWeight="medium" textAlign="center">
              Sign In
            </Text>
            <Divider mt={2} width={100} orientation="horizontal" />
            {loading && (
              <Text mt={1} color="blue">
                Loading...
              </Text>
            )}
            {error && (
              <Text mt={1} color="red">
                {error}
              </Text>
            )}
            <form>
              <FormControl mt={5}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>

                <FormLabel htmlFor="name">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  mt={5}
                  colorScheme="blue"
                  variant="solid"
                  onClick={submitHandler}
                >
                  <i class="fa-solid fa-paper-plane" />
                  &nbsp;Sign In
                </Button>
                <Box mt={3} d="flex" flexDir="row">
                  <Text color="gray" mr={1}>
                    New User?{" "}
                  </Text>
                  <Text fontWeight="bold">
                    <Link to={"/register"}>Register</Link>
                  </Text>
                </Box>
              </FormControl>
            </form>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default LoginScreen;
