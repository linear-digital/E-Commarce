import { DEVICETYPE, NOTIFICATION, PRODUCTS, REPATCH } from "./constants";

export const setDeviceType = (type) => ({
  type: DEVICETYPE,
  payload: type,
});
export const setRepatch = (data) => ({
  type: REPATCH,
  payload: data,
});
export const setShowNotification = (data) => ({
  type: NOTIFICATION,
  payload: data,
});
export const setAllProducts = (data) => ({
  type: PRODUCTS,
  payload: data,
});
