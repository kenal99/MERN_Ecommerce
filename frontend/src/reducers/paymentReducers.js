import {
  MAKE_PAYMENT_FAIL,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
} from "../constants/paymentConstants";

export const makePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case MAKE_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        paymentDetails: action.payload,
      };
    case MAKE_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
