
import { CURRENTUSER, TOKEN } from "./constants";

const initialState = {
  currentUser: null,
  token: null,
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case CURRENTUSER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return { ...state };
  }
};

export default User;
