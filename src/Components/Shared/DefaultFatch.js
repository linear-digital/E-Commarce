"use client";

import { setDeviceType } from "@/redux/Tools/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { api } from "@/Components/instance/api";
import { setCurrentUser } from "@/redux/User/action";
import { setCartItems } from "@/redux/Cart/action";

const DefaultFatch = () => {
  const { repatch } = useSelector(state => state.Tools
  )
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Update device width on window resize
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch(setDeviceType("mobile"));
      } else if (window.innerWidth <= 1024) {
        dispatch(setDeviceType("tablet"));
      } else {
        dispatch(setDeviceType("desktop"));
      }
    };
    handleResize();
    // Add event listener to update device width on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const token = Cookies.get('auth_token')

  useEffect(() => {
    (
      async () => {
        if (token) {
          const decoded = decodeToken(token)
          if (decoded) {
            try {
              const user = await api.get(`/api/users/${decoded.email}`)
              dispatch(setCurrentUser(user.data))
              const res = await api.get(`/api/cart/email/${user?.data?.email}`)
              dispatch(setCartItems(res.data))
            }
            catch (error) {
              dispatch(setCurrentUser(null))
            }
          }

        }
      }
    )()
  }, [token, repatch]);




  return;
};

export default DefaultFatch;

