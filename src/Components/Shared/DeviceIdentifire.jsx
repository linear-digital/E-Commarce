'use client';

import { setDevice } from '@/redux/Tools/action';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DeviceIdentifire = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function getOrCreateDeviceID() {
            let deviceId = getCookie('device_id');
            if (!deviceId) {
                deviceId = generateUUID();
                setCookie('device_id', deviceId, 365);
            }
            return deviceId;
        }

        let deviceId = getOrCreateDeviceID();
        dispatch(setDevice(deviceId))
    }, [])
    return null
};

export default DeviceIdentifire;