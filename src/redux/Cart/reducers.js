import {CARTITEMS, CHECKOUT,} from "./constants";


const initialState = {

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
    default:
      return { ...state };
  }
};

export default Cart;
