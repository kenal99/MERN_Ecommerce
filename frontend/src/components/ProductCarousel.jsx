import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Text my={2} color="blue">
      Loading...
    </Text>
  ) : error ? (
    <Text my={2} color="red">
      {error}
    </Text>
  ) : (
    <>
      {console.log(products)}
      {products[0] && (
        <div
          id="carouselExampleCaptions"
          class="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={products[0].image}
                class="d-block w-100"
                alt={products[0].name}
              />
              <div class="carousel-caption d-none d-md-block">
                <Link to={`/product/${products[0]._id}`}>
                  <h5>{products[0].name}</h5>
                </Link>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src={products[1].image}
                class="d-block w-100"
                alt={products[1].name}
              />
              <div class="carousel-caption d-none d-md-block">
                <Link to={`/product/${products[1]._id}`}>
                  <h5>{products[1].name}</h5>
                </Link>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src={products[2].image}
                class="d-block w-100"
                alt={products[2].name}
              />
              <div class="carousel-caption d-none d-md-block">
                <Link to={`/product/${products[2]._id}`}>
                  <h5>{products[2].name}</h5>
                </Link>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
