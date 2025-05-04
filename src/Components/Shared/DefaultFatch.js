"use client";

import { setAllProducts, setDeviceType } from "@/redux/Tools/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { api } from "@/Components/instance/api";
import { setCurrentUser } from "@/redux/User/action";
import { setCartItems } from "@/redux/Cart/action";

const DefaultFatch = () => {
  const { repatch, device } = useSelector(state => state.Tools
  )
  const { currentUser } = useSelector(state => state.User)
  const dispatch = useDispatch();
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
  const [user, setUser] = useState(null)
  useEffect(() => {
    (
      async () => {
        if (token) {
          const decoded = decodeToken(token)
          if (decoded) {
            try {
              const user = await api.get(`/api/users/${decoded.email}`)
              dispatch(setCurrentUser(user.data))
              setUser(user.data)

            }
            catch (error) {
              dispatch(setCurrentUser(null))
            }
          }

        }
      }
    )()
  }, [token, repatch]);

  useEffect(() => {
    (
      async () => {

        if (device || currentUser) {
          const deviceCart = await api.get(`/api/cart/device/${device}`)

          if (currentUser) {
            const res = await api.get(`/api/cart/email/${currentUser?.email}`)
            dispatch(setCartItems(res.data))
            api.put(`/api/cart/transfer/${device}`, {
              email: user?.email
            })
          }
          else {
            dispatch(setCartItems(deviceCart.data))
          }
        }

      }
    )()
  }, [repatch, device, currentUser]);

  useEffect(() => {
    const apiKey = "AIzaSyBUDmkMGZD5mIPpiGRVQov8aPztKKB5B2c"

    if ("geolocation" in navigator) {

      // Get the current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              // Extract the relevant location information from the response
              const address = data.results[0]
              const newVisitor = {
                visitor: address ? address : {
                  place: "Unknown",
                },
                place_id: address?.place_id || "Unknown",
              }
              try {
                api.post('/api/visitors', newVisitor)
              } catch (error) {
                console.log(error)
              }
            })
            .catch(error => console.error('Error fetching location data:', error));
          // You can use the latitude and longitude values as needed
        },
        function (error) {
          console.error("Error getting location: ", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }

  }, [])


  return;
};

export default DefaultFatch;

