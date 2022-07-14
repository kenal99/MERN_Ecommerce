import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
const UserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <Box
      pt={20}
      d="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      maxW="100%"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        mt={5}
        letterSpacing={2}
      >
        Users
      </Text>
      <Divider mt={2} width={100} orientation="horizontal" />
      {loading ? (
        <Text textAlign="center" color="blue" mt={1}>
          Loading...
        </Text>
      ) : error ? (
        <Text textAlign="center" color="red" mt={1}>
          {error}
        </Text>
      ) : (
        <Box mt={5} width={{ base: "sm", md: "max-content" }}>
          <TableContainer>
            <Table variant="simple" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>ADMIN</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => {
                  return (
                    <Tr key={user._id}>
                      <Td>{user._id}</Td>
                      <Td>{user.name}</Td>
                      <Td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </Td>
                      <Td>
                        {user.isAdmin ? (
                          <CheckIcon color="green" />
                        ) : (
                          <CloseIcon color="red" />
                        )}
                      </Td>
                      <Td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <EditIcon />
                        </Link>{" "}
                        <DeleteIcon onClick={() => deleteHandler(user._id)} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default UserScreen;
