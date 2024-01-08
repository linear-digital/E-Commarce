import { DEVICETYPE } from "./constants";


const initialState = {
  currentUser: null,
  token: null,
};

const Tools = (state = initialState, action) => {
  switch (action.type) {
    case DEVICETYPE:
      return {
        ...state,
        deviceType: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Tools;
