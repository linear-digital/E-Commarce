import { CARTITEMS, CHECKOUT, CONFIRM, PAYMENT, TOTAL_PRICE } from "./constants";

export const setCartItems = (type) => ({
  type: CARTITEMS,
  payload: type,
});
export const setCheckOut = (type) => ({
  type: CHECKOUT,
  payload: type,
});
export const setToatalPrice = (price) => ({
  type: TOTAL_PRICE,
  payload: type,
});
export const setConfirmOrder = (data) => ({
  type: CONFIRM,
  payload: data,
});
export const setPaymentInfo = (data) => ({
  type: PAYMENT,
  payload: data,
});
