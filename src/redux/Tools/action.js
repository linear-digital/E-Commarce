import { DEVICETYPE } from "./constants";

export const setDeviceType = (type) => ({
  type: DEVICETYPE,
  payload: type,
});
