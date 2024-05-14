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

  useEffect(() => {
    (
      async () => {
        const quary = (await api.get('/api/products/quary/bestDeals')).data
        dispatch(setAllProducts({
          deals: quary.bestDeals,
          topTen: quary.topTen,
          popular: quary.popular,
          hotSales: quary.hotSales,
          flashSale: quary.flashSale,
          newArrival: quary.newArrival
        }))
      }
    )()
  }, [repatch]);

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

