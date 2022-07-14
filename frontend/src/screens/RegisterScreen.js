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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const toast = useToast();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast({
        title: "Confirm Password not matching Password",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(register(name, email, password));
    }
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
              Sign Up
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>

                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
                <Input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={cpassword}
                  onChange={(e) => setcpassword(e.target.value)}
                />

                <Button
                  mt={5}
                  colorScheme="blue"
                  variant="solid"
                  onClick={submitHandler}
                >
                  <i class="fa-solid fa-paper-plane" />
                  &nbsp;Register
                </Button>
                <Box mt={3} d="flex" flexDir="row">
                  <Text color="gray" mr={1}>
                    Have an Account?{" "}
                  </Text>
                  <Text fontWeight="bold">
                    <Link to={"/login"}>Login</Link>
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

export default RegisterScreen;
