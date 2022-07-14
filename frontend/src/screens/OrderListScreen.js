import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

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
        Orders
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
                  <Th>USER</Th>
                  <Th>TOTAL</Th>
                  <Th>PAID</Th>
                  <Th>DELIVERED</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => {
                  return (
                    <Tr key={order._id}>
                      <Td>{order._id}</Td>
                      <Td>{order.user && order.user.name}</Td>
                      <Td>{order.totalPrice}</Td>
                      <Td>
                        {order.isPaid ? (
                          <CheckIcon color="green" />
                        ) : (
                          <CloseIcon color="red" />
                        )}
                      </Td>
                      <Td>
                        {order.isDelivered ? (
                          <CheckIcon color="green" />
                        ) : (
                          <CloseIcon color="red" />
                        )}
                      </Td>
                      <Td>
                        <Link to={`/orders/${order._id}`}>
                          <Button>Details</Button>
                        </Link>
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

export default OrderListScreen;
