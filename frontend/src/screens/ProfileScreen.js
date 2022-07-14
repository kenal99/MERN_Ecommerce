import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  const toast = useToast();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setname(user.name);
        setemail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
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
        flexDir={{ base: "column", md: "column", lg: "row" }}
        mt={10}
        mb={10}
      >
        <Box
          d="flex"
          flexDir="column"
          alignItems="center"
          p={30}
          backgroundColor="gray.700"
          textColor="whitesmoke"
        >
          <Text fontSize="2xl" fontWeight="medium" textAlign="center">
            My Profile
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
          {success && (
            <Text mt={1} color="green">
              Profile Updated
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
                &nbsp;Update
              </Button>
            </FormControl>
          </form>
        </Box>

        <Box d="flex" flexDir="column" alignItems="center" p={30}>
          <Text fontSize="2xl" fontWeight="medium" textAlign="center">
            My Orders
          </Text>
          <Divider mt={2} width={100} orientation="horizontal" />
          {loadingOrders ? (
            <Text mt={1} color="blue">
              Loading...
            </Text>
          ) : errorOrders ? (
            <Text mt={1} color="red">
              {error}
            </Text>
          ) : (
            <TableContainer
              mt={10}
              border="1px"
              padding={3}
              borderRadius={5}
              borderColor="gray.300"
              textAlign="center"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>TOTAL</Th>
                    <Th>PAID</Th>
                    <Th>DELIVERED</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <CheckIcon color="green" />
                        ) : (
                          <CloseIcon color="red" />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <CheckIcon color="green" />
                        ) : (
                          <CloseIcon color="red" />
                        )}
                      </td>
                      <td>
                        <Link to={`/orders/${order._id}`}>
                          <Button colorScheme="gray">Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
