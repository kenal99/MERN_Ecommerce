import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();
  const productId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image);
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.get("file"));
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/upload", formData, config);
      const { filePath } = res.data;
      setImage(filePath);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const postPics = async (pics) => {
    setUploading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      console.log(pics);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Ecommerce");
      data.append("cloud_name", "kenal");

      // console.log(data);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/kenal/image/upload/",
          data
        );
        const url = res.data.url.toString();
        setImage(url);
        setUploading(false);
      } catch (error) {
        console.log(error);
        setUploading(false);
      }
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
      return;
    }
  };

  return (
    <>
      <Box
        w="100%"
        pt={20}
        id="about"
        d="flex"
        flexDir="column"
        alignItems="center"
        px={{ md: "5" }}
      >
        <Link to="/admin/productlist">
          <Button
            my={5}
            leftIcon={<ArrowBackIcon />}
            colorScheme="facebook"
            variant="link"
          >
            Go Back
          </Button>
        </Link>
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
              Edit Product
            </Text>

            <Divider mt={2} width={100} orientation="horizontal" />
            {loadingUpdate && (
              <Text mt={1} color="blue">
                Loading...
              </Text>
            )}
            {errorUpdate && (
              <Text mt={1} color="red">
                {errorUpdate}
              </Text>
            )}
            {loading && (
              <Text mt={1} color="blue">
                Loading...
              </Text>
            )}
            {error && (
              <Text mt={1} color="red">
                {error}
              </Text>
            )}

            <form>
              <FormControl mt={5} width={400}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  id="image"
                  type="text"
                  name="image"
                  placeholder="Enter Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <div className="custom-file mt-1">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={(e) => postPics(e.target.files[0])}
                  />
                </div>
                {uploading && (
                  <Text mt={1} color="blue">
                    Loading...
                  </Text>
                )}

                <FormLabel htmlFor="brand">Brand</FormLabel>
                <Input
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />

                <FormLabel htmlFor="countInStock">Count In Stock</FormLabel>
                <Input
                  id="countInStock"
                  type="text"
                  name="countInStock"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />

                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  type="text"
                  name="category"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button
                  mt={5}
                  colorScheme="blue"
                  variant="solid"
                  onClick={submitHandler}
                >
                  <i class="fa-solid fa-paper-plane" />
                  &nbsp;Update
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductEditScreen;
