import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Pagination from "../components/Pagination";

import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
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
        Products
      </Text>
      <Divider mt={2} width={100} orientation="horizontal" />
      <Button
        my={4}
        backgroundColor="black"
        color="whitesmoke"
        onClick={createProductHandler}
      >
        <AddIcon />
        &nbsp;Add Product
      </Button>
      {loadingDelete && (
        <Text textAlign="center" color="blue" mt={1}>
          Loading...
        </Text>
      )}
      {errorDelete && (
        <Text textAlign="center" color="red" mt={1}>
          {errorDelete}
        </Text>
      )}
      {loadingCreate && (
        <Text textAlign="center" color="blue" mt={1}>
          Loading...
        </Text>
      )}
      {errorCreate && (
        <Text textAlign="center" color="red" mt={1}>
          {errorCreate}
        </Text>
      )}
      {loading ? (
        <Text textAlign="center" color="blue" mt={1}>
          Loading...
        </Text>
      ) : error ? (
        <Text textAlign="center" color="red" mt={1}>
          {error}
        </Text>
      ) : (
        <Box mt={5} width={{ base: "90%", md: "90%", lg: "max-content" }}>
          <TableContainer>
            <Table variant="simple" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>PRICE</Th>
                  <Th>CATEGORY</Th>
                  <Th>BRAND</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => {
                  return (
                    <Tr key={product._id}>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {product.price}
                      </Td>
                      <Td>{product.category}</Td>
                      <Td>{product.brand}</Td>
                      <Td>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <EditIcon />
                        </Link>{" "}
                        <DeleteIcon
                          onClick={() => deleteHandler(product._id)}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box my={3}>
            <Pagination page={page} pages={pages} isAdmin={true} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductListScreen;
