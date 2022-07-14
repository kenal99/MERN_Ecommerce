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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import GooglePayButton from "@google-pay/button-react";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  });
  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
    }
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, id, paid, successDeliver, successPay]);

  if (!loading) {
    // calculations
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Box mt={20}>
      {loading ? (
        <Text color="blue" textAlign="center">
          Loading...
        </Text>
      ) : error ? (
        <Text color="red" textAlign="center">
          {error}
        </Text>
      ) : (
        <>
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            Order {order._id}
          </Text>
          <Box
            d="flex"
            flexDir={{ base: "column", md: "row" }}
            justifyContent="space-evenly"
            mt={10}
          >
            <Box d="flex" flexDir="column">
              <Box my={2}>
                <Text fontSize="2xl" fontWeight="bold" color="gray">
                  SHIPPING
                </Text>
                <Text fontFamily="sans-serif" my={1}>
                  <strong>Name: </strong>
                  {order.user.name}
                </Text>
                <Text fontFamily="sans-serif" my={1}>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </Text>
                <Text fontFamily="sans-serif" my={1}>
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city} -{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </Text>
                {order.isDelivered ? (
                  <Box width="100%" backgroundColor="blue.100" py="2px">
                    <Text color="blue">Delivered on {order.deliveredAt}</Text>
                  </Box>
                ) : (
                  <Box width="100%" backgroundColor="red.100" py="2px">
                    <Text color="red">Not Delivered</Text>
                  </Box>
                )}
              </Box>
              <hr />
              <Box my={2}>
                <Text fontSize="2xl" fontWeight="bold" color="gray">
                  PAYMENT METHOD
                </Text>
                <Text fontFamily="sans-serif" my={2}>
                  <strong>Method:</strong> {order.paymentMethod}
                </Text>
                {order.isPaid ? (
                  <Box width="100%" backgroundColor="blue.100" py="2px">
                    <Text color="blue">Paid on {order.paidAt}</Text>
                  </Box>
                ) : (
                  <Box width="100%" backgroundColor="red.100" py="2px">
                    <Text color="red">Not Paid</Text>
                  </Box>
                )}
              </Box>
              <hr />
              <Box mt={2}>
                <Text fontSize="2xl" fontWeight="bold" color="gray">
                  ORDER ITEMS
                </Text>
                {order.orderItems.length === 0 ? (
                  <Text textAlign="center" fontWeight="medium">
                    Order is Empty
                  </Text>
                ) : (
                  order.orderItems.map((item) => (
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
                          {item.qty} x{" "}
                          <i class="fa-solid fa-indian-rupee-sign"></i>
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
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="gray"
                          my={2}
                        >
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
                        {order.itemsPrice}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Shipping</Td>
                      <Td>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {order.shippingPrice}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Tax</Td>
                      <Td>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {order.taxPrice}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total</Td>
                      <Td>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {order.totalPrice}
                      </Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th colSpan={2}>
                        <Box d="flex" flexDir="column" justifyContent="center">
                          {/* <Button backgroundColor="black" color="white">
                            Pay Using Paytm
                          </Button> */}
                          {!order.isPaid && (
                            <GooglePayButton
                              environment="TEST"
                              paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                  {
                                    type: "CARD",
                                    parameters: {
                                      allowedAuthMethods: [
                                        "PAN_ONLY",
                                        "CRYPTOGRAM_3DS",
                                      ],
                                      allowedCardNetworks: [
                                        "MASTERCARD",
                                        "VISA",
                                      ],
                                    },
                                    tokenizationSpecification: {
                                      type: "PAYMENT_GATEWAY",
                                      parameters: {
                                        gateway: "example",
                                        gatewayMerchantId: " ",
                                      },
                                    },
                                  },
                                ],
                                merchantInfo: {
                                  merchantId: "12345678901234567890",
                                  merchantName: "Demo Merchant",
                                },
                                transactionInfo: {
                                  totalPriceStatus: "FINAL",
                                  totalPriceLabel: "Total",
                                  totalPrice: "1",
                                  currencyCode: "INR",
                                  countryCode: "IN",
                                },
                                shippingAddressRequired: false,
                                callbackIntents: ["PAYMENT_AUTHORIZATION"],
                              }}
                              onLoadPaymentData={(paymentRequest) => {
                                console.log(
                                  "load payment data",
                                  paymentRequest
                                );
                              }}
                              onPaymentAuthorized={(paymentData) => {
                                console.log(paymentData);
                                setPaid(true);
                                dispatch(payOrder(order._id));
                                // navigate(`/orders/${order._id}`);
                                return { transactionState: "SUCCESS" };
                              }}
                              existingPaymentMethodRequired="false"
                              buttonColor="Black"
                              buttonType="buy"
                            />
                          )}
                          {console.log(order, paid)}
                          {loadingDeliver && (
                            <Text color="blue" textAlign="center">
                              Loading...
                            </Text>
                          )}
                          {userInfo &&
                            userInfo.isAdmin &&
                            order.isPaid &&
                            !order.isDelivered && (
                              <Button
                                backgroundColor="black"
                                color="whitesmoke"
                                onClick={deliverHandler}
                              >
                                Mark as Delivered
                              </Button>
                            )}
                        </Box>
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrderScreen;
