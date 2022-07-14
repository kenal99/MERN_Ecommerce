import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setaddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setcity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setpostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setcountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
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
      <CheckoutSteps step1 step2 />
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
            SHIPPING
          </Text>
          <Divider mt={2} width={100} orientation="horizontal" />

          <form>
            <FormControl mt={5}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="Enter Address"
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />

              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                id="city"
                type="text"
                name="city"
                placeholder="Enter City"
                required
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />

              <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
              <Input
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="Enter Postal Code"
                required
                value={postalCode}
                onChange={(e) => setpostalCode(e.target.value)}
              />

              <FormLabel htmlFor="country">Country</FormLabel>
              <Input
                id="country"
                type="text"
                name="country"
                placeholder="Enter country"
                required
                value={country}
                onChange={(e) => setcountry(e.target.value)}
              />

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

export default ShippingScreen;
