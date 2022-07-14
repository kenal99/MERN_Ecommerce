import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const { id } = useParams();
  const userId = id;
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setname(user.name);
        setemail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
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
      <Link to="/admin/userlist">
        <Button
          my={5}
          leftIcon={<ArrowBackIcon />}
          colorScheme="facebook"
          variant="link"
        >
          Go Back
        </Button>
      </Link>
      <Box
        d="flex"
        mt={10}
        mb={10}
        backgroundColor="white"
        boxShadow="dark-lg"
        maxW={{ base: "90%", md: "90%", lg: "60%" }}
      >
        <Box d="flex" flexDir="column" alignItems="center" p={30}>
          <Text fontSize="2xl" fontWeight="medium" textAlign="center">
            Edit User
          </Text>
          <Divider mt={2} width={100} orientation="horizontal" />
          {loadingUpdate && (
            <Text mt={1} color="blue">
              Loading...
            </Text>
          )}
          {errorUpdate && (
            <Text mt={1} color="red">
              {errorUpdate}
            </Text>
          )}
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
            <FormControl mt={5} w={300}>
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
              <Box d="flex" flexDir="row">
                <Checkbox
                  id="isAdmin"
                  isChecked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <FormLabel htmlFor="isAdmin">&nbsp;Is Admin?</FormLabel>
              </Box>
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
      </Box>
    </Box>
  );
};

export default UserEditScreen;
