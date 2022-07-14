import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      console.log(order);
      navigate(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    console.log(order);
  };
  return (
    <Box className="container" w="100%" pt={20} d="flex" flexDir="column">
      <CheckoutSteps step1 step2 step3 step4 />

      <Box
        d="flex"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-evenly"
        mt={10}
      >
        <Box d="flex" flexDir="column">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray">
              SHIPPING
            </Text>
            <Text fontFamily="sans-serif" my={2}>
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city} - {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </Text>
          </Box>
          <hr />
          <Box mt={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray">
              PAYMENT METHOD
            </Text>
            <Text fontFamily="sans-serif" my={2}>
              <strong>Method:</strong> {cart.paymentMethod}
            </Text>
          </Box>
          <hr />
          <Box mt={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray">
              ORDER ITEMS
            </Text>
            {cart.cartItems.length === 0 ? (
              <Text textAlign="center" fontWeight="medium">
                Cart is Empty
              </Text>
            ) : (
              cart.cartItems.map((item) => (
                <Box
                  key={item.product}
                  marginTop={1}
                  borderBottom="1px"
                  borderColor="gray.300"
                  width="100%"
                  overflow="hidden"
                  py={2}
                  px={3}
                >
                  <Box d="flex" justifyContent="space-between" width="100%">
                    <Box d="flex">
                      <Box maxWidth={20}>
                        <Image src={item.image} alt={item.name} />
                      </Box>
                      <Box maxW={200} ml={10}>
                        <Link to={`/product/${item.product}`}>
                          <strong>{item.name}</strong>
                        </Link>
                      </Box>
                    </Box>
                    <Box>
                      {item.qty} x <i class="fa-solid fa-indian-rupee-sign"></i>
                      {item.price} ={" "}
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                      {Number(item.qty) * Number(item.price)}
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box
          d="flex"
          border="1px"
          borderColor="gray"
          height="max-content"
          borderRadius={5}
        >
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan={2}>
                    <Text fontSize="2xl" fontWeight="bold" color="gray" my={2}>
                      ORDER SUMMARY
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Items</Td>
                  <Td>
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {cart.itemsPrice}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Shipping</Td>
                  <Td>
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {cart.shippingPrice}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tax</Td>
                  <Td>
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {cart.taxPrice}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Total</Td>
                  <Td>
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {cart.totalPrice}
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={2}>
                    <Box d="flex" justifyContent="center">
                      <Button
                        backgroundColor="black"
                        color="white"
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    </Box>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box>{error && <Text color="red">{error}</Text>}</Box>
    </Box>
  );
};

export default PlaceOrderScreen;
