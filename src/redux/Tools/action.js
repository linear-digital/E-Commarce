import { DEVICETYPE, NOTIFICATION, REPATCH } from "./constants";

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
