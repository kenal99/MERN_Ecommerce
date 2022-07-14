import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import Rating from "./Rating";

const Projuct = ({ product }) => {
  return (
    <>
      <Box
        maxW="sm"
        overflow="hidden"
        bgColor="#292929"
        color="whitesmoke"
        boxShadow="lg"
        mx="auto"
        borderRadius={10}
      >
        <Link to={`/product/${product._id}`}>
          <Image src={product.image} p={2} />
        </Link>
        <Box px="6" mt={3}>
          <Box>
            <Box
              mt={2}
              fontWeight="bold"
              fontSize="xl"
              className="line-clamp-title"
            >
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </Box>
            <Box className="line-clamp-desc" mt={1}>
              <Text fontSize="md">{product.description}</Text>
            </Box>
            <Box mt={2}>
              <Rating rating={product.rating} reviews={product.numReviews} />
            </Box>
            <Box mt={2} mb={2}>
              <Text fontSize="x-large" fontWeight="extrabold">
                <i class="fa-solid fa-indian-rupee-sign"></i>
                {product.price}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Projuct;
