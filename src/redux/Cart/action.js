import {CARTITEMS, CHECKOUT} from "./constants";

export const setCartItems = (type) => ({
  type: CARTITEMS,
  payload: type,
});
export const setCheckOut = (type) => ({
  type: CHECKOUT,
  payload: type,
});