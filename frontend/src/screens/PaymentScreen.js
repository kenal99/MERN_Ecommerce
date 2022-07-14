import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setpaymentMethod] = useState("googlePay");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
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
      <CheckoutSteps step1 step2 step3 />
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
            PAYMENT METHOD
          </Text>
          <Divider mt={2} width={100} orientation="horizontal" />
          <Text fontSize="xl" fontWeight="medium" textAlign="center" mt={2}>
            Select Payment method
          </Text>
          <RadioGroup onChange={setpaymentMethod} value={paymentMethod}>
            <Stack direction="column">
              <Radio value="GooglePay">GooglePay</Radio>
            </Stack>
          </RadioGroup>
          <form>
            <FormControl mt={5}>
              <Button
                mt={5}
                backgroundColor="black"
                color="white"
                variant="solid"
                onClick={submitHandler}
              >
                Continue
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentScreen;
