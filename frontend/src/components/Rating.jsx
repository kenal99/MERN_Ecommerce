import { Text } from "@chakra-ui/react";
import React from "react";

const Rating = ({ rating, reviews }) => {
  return (
    <Text fontSize="md" fontWeight="light">
      <span>
        {console.log(rating >= 1)}
        <span>
          <i
            className={
              rating >= 1
                ? "fa-solid fa-star"
                : rating >= 0.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            style={{ color: "#f2de29" }}
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? "fa-solid fa-star"
                : rating >= 1.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            style={{ color: "#f2de29" }}
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? "fa-solid fa-star"
                : rating >= 2.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            style={{ color: "#f2de29" }}
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? "fa-solid fa-star"
                : rating >= 3.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            style={{ color: "#f2de29" }}
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? "fa-solid fa-star"
                : rating >= 4.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            style={{ color: "#f2de29" }}
          ></i>
        </span>
      </span>{" "}
      {reviews} reviews
    </Text>
  );
};

export default Rating;
