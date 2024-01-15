import {CARTITEMS, CHECKOUT, CONFIRM, TOTAL_PRICE} from "./constants";

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
