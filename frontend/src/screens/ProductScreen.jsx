import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import "../style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const toast = useToast();

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, successProductReview, id]);
  // const product = products.find((p) => p._id === id);

  const addToCartHandler = () => {
    if (qty > 0) {
      navigate(`/cart/${id}?qty=${qty}`);
    } else {
      toast({
        title: "Select Quantity",
        description: "To proceed further select quantity",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <main>
      {console.log(id)}
      {console.log(product.name)}
      <Box pt={20}>
        <div className="container">
          <Link to="/">
            <Button
              my={5}
              leftIcon={<ArrowBackIcon />}
              colorScheme="facebook"
              variant="link"
            >
              Go Back
            </Button>
          </Link>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: "1", md: "2" }} spacing={10}>
              <Box d="flex" flexDir="column">
                <Image src={product.image} />
                <Button
                  onClick={addToCartHandler}
                  colorScheme="facebook"
                  my={5}
                  disabled={product.countInStock > 0 ? false : true}
                >
                  Add To Cart
                </Button>
              </Box>
              <Box
                d="flex"
                flexDir="column"
                mx={3}
                maxH={{ md: "80vh" }}
                overflowY="auto"
              >
                <Text fontSize="3xl" fontWeight="extrabold" textAlign="center">
                  {product.name}
                </Text>
                <Box
                  d="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box mt={2}>
                    <Rating
                      rating={product.rating}
                      reviews={product.numReviews}
                    />
                  </Box>

                  <TableContainer
                    mt={4}
                    border="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                  >
                    <Table variant="simple">
                      <Tbody>
                        <Tr>
                          <Td>Price:</Td>
                          <Td>
                            <i class="fa-solid fa-indian-rupee-sign"></i>
                            {product.price}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Status:</Td>
                          <Td>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
                          </Td>
                        </Tr>
                        {product.countInStock > 0 && (
                          <Tr>
                            <Td>Qty:</Td>
                            <Td>
                              <FormControl>
                                <Select
                                  id="country"
                                  placeholder="Select Quantity"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Box mt={2} mx={10}>
                    <Text fontSize="md" textAlign="justify">
                      <b>Description:</b> {product.description}
                    </Text>
                  </Box>

                  <Box mt={3} mx={10}>
                    <Text fontSize="2xl" fontWeight="semibold" textAlign="left">
                      WRITE A CUSTOMER REVIEW
                    </Text>
                    {errorProductReview && (
                      <Text color="red">{errorProductReview}</Text>
                    )}
                    {userInfo ? (
                      <>
                        <FormControl>
                          <FormLabel htmlFor="rating">Rating</FormLabel>
                          <Select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                          >
                            <option value="5" defaultChecked>
                              5 - Excellent
                            </option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Fair</option>
                            <option value="2">2 - Bad</option>
                            <option value="1">1 - Worst</option>
                          </Select>
                          <FormLabel htmlFor="comment">Comment</FormLabel>
                          <Input
                            id="comment"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment"
                          />
                          <Button
                            my={2}
                            color="whitesmoke"
                            backgroundColor="black"
                            onClick={submitHandler}
                          >
                            Submit
                          </Button>
                        </FormControl>
                      </>
                    ) : (
                      <Text
                        textAlign="center"
                        w="100%"
                        p={2}
                        backgroundColor="blue.100"
                        my={3}
                      >
                        Please{" "}
                        <Link to="/login">
                          <b>sign in</b>
                        </Link>{" "}
                        to Write a Review
                      </Text>
                    )}
                  </Box>

                  <Box
                    mt={3}
                    mx={10}
                    justifyContent="center"
                    alignItems="center"
                    d="flex"
                    flexDir="column"
                  >
                    <Text fontSize="2xl" fontWeight="semibold" textAlign="left">
                      REVIEWS
                    </Text>
                    <Box d="flex" flexDir="column">
                      {product.reviews.length === 0 && (
                        <Text
                          textAlign="center"
                          w="100%"
                          p={2}
                          backgroundColor="blue.100"
                          my={3}
                        >
                          No Reviews
                        </Text>
                      )}
                      {product.reviews.map((review) => {
                        return (
                          <Box d="flex" flexDir="column">
                            <Box d="flex">
                              <Text fontWeight="bold" mr={5}>
                                {review.name}
                              </Text>

                              <Rating value={review.rating} />
                            </Box>
                            <p>{review.comment}</p>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SimpleGrid>
          )}
        </div>
      </Box>
    </main>
  );
};

export default ProductScreen;
