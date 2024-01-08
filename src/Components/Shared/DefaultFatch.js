"use client";

import { setDeviceType } from "@/redux/Tools/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const DefaultFatch = () => {
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
  return;
};

export default DefaultFatch;
