import { Box, Text } from "@chakra-ui/react";
import React from "react";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Box d="flex" justifyContent="space-evenly" w="100%" pt={5}>
      <Box>
        {step1 ? (
          <Text className="nav-link active" fontSize="medium" fontWeight="bold">
            Sign In
          </Text>
        ) : (
          <Text
            className="nav-link disabled"
            fontSize="medium"
            fontWeight="bold"
          >
            Sign In
          </Text>
        )}
      </Box>
      <Box>
        {step2 ? (
          <Text className="nav-link active" fontSize="medium" fontWeight="bold">
            Shipping
          </Text>
        ) : (
          <Text
            className="nav-link disabled"
            fontSize="medium"
            fontWeight="bold"
          >
            Shipping
          </Text>
        )}
      </Box>
      <Box>
        {step3 ? (
          <Text className="nav-link active" fontSize="medium" fontWeight="bold">
            Payment
          </Text>
        ) : (
          <Text
            className="nav-link disabled"
            fontSize="medium"
            fontWeight="bold"
          >
            Payment
          </Text>
        )}
      </Box>

      <Box>
        {step4 ? (
          <Text className="nav-link active" fontSize="medium" fontWeight="bold">
            Place Order
          </Text>
        ) : (
          <Text
            className="nav-link disabled"
            fontSize="medium"
            fontWeight="bold"
          >
            Place Order
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CheckoutSteps;
