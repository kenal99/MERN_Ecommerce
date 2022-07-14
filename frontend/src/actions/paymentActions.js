import axios from "axios";
import {
  MAKE_PAYMENT_FAIL,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
} from "../constants/paymentConstants";

export const performPayment =
  (order_id, userData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MAKE_PAYMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/payment/${order_id}`,
        userData,
        config
      );
      console.log(data);

      dispatch({
        type: MAKE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MAKE_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
