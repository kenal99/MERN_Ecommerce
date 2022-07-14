import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const productId = id;
  const [search] = useSearchParams();
  const qty = search.get("qty");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };
  return (
    <main>
      <Box d="flex" pt={20}>
        <div className="container">
          <Box d="flex" flexDir="column">
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
              mt={5}
              letterSpacing={2}
            >
              Shopping Cart
            </Text>
            {cartItems.length === 0 ? (
              <Text>
                Your cart is empty. <Link to="/"> Go Back</Link>
              </Text>
            ) : (
              <Box d="flex" justifyContent="center" alignItems="center">
                <SimpleGrid columns={{ md: 1, lg: 2 }} spacing={10}>
                  <Box
                    mt={10}
                    d="flex"
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {cartItems.map((item) => (
                      <Box
                        key={item.product}
                        marginTop={1}
                        borderBottom="1px"
                        borderColor="gray"
                        width="max-content"
                        overflow="hidden"
                        py={2}
                        px={3}
                      >
                        <Stack direction={["column", "row"]} spacing="24px">
                          <Box maxWidth={20}>
                            <Image src={item.image} alt={item.name} />
                          </Box>
                          <Box maxW={150}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Box>
                          <Box maxW={20}>
                            <i class="fa-solid fa-indian-rupee-sign"></i>
                            {item.price}
                          </Box>
                          <Box>
                            <FormControl>
                              <Select
                                id="country"
                                placeholder="qty"
                                maxW={20}
                                value={item.qty}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value)
                                    )
                                  )
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <DeleteIcon
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            />
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    border="1px"
                    height="max-content"
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    mt={10}
                    flexDir="column"
                    overflowY="auto"
                  >
                    <Text fontSize="2xl" fontWeight="semibold">
                      SUBTOTAL (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      ITEMS
                    </Text>
                    <Text>
                      <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Text>
                    <Button
                      my={1}
                      colorScheme="facebook"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </Box>
                </SimpleGrid>
              </Box>
            )}
          </Box>
        </div>
      </Box>
    </main>
  );
};

export default CartScreen;
