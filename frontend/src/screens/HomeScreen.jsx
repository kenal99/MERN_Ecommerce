import { Box, Button, Container, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Product from "../components/Projuct";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ProductCarousel from "../components/ProductCarousel";
import { ArrowBackIcon } from "@chakra-ui/icons";

const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // console.log(productList);
  }, [dispatch, keyword, pageNumber]);

  return (
    <main>
      <Box pt={20}>
        {!keyword ? (
          <Container
            my={3}
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ProductCarousel />
          </Container>
        ) : (
          <Container d="flex" justifyContent="center" alignItems="center">
            <Link to="/">
              <Button
                my={3}
                leftIcon={<ArrowBackIcon />}
                colorScheme="facebook"
                variant="link"
              >
                Go Back
              </Button>
            </Link>
          </Container>
        )}
        <div className="container">
          <Box flexDir="column">
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
              mt={5}
              letterSpacing={2}
            >
              LATEST PRODUCTS
            </Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <SimpleGrid
                columns={{ base: "1", md: "2", lg: "3", xl: "4" }}
                spacing={10}
                mt={10}
              >
                {products.map((product) => {
                  return <Product product={product} />;
                })}
              </SimpleGrid>
            )}
          </Box>
        </div>
        <Box my={5}>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Box>
      </Box>
    </main>
  );
};

export default HomeScreen;
