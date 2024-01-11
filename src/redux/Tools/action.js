import {DEVICETYPE, REPATCH} from "./constants";

export const setDeviceType = (type) => ({
  type: DEVICETYPE,
  payload: type,
});
export const setRepatch = (data) => ({
  type: REPATCH,
  payload: data,
});
