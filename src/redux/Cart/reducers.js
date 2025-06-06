import { CARTITEMS, CHECKOUT, CONFIRM, PAYMENT, TOTAL_PRICE, } from "./constants";


const initialState = {
  checkOut: [],
  cartItems: null,
  total_price: 0,
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case CARTITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CHECKOUT:
      return {
        ...state,
        checkOut: action.payload
      }
    case TOTAL_PRICE:
      return {
        ...state,
        total_price: action.payload
      }
    case CONFIRM:
      return {
        ...state,
        confirm_order: action.payload
      }
    case PAYMENT:
      return {
        ...state,
        paymentInfo: action.payload
      }
    default:
      return { ...state };
  }
};

export default Cart;
