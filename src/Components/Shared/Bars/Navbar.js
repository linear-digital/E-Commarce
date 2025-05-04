"use client";
import React, { useEffect, useState } from "react";
import MiddleBar from "./MiddleBar";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);



  const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 400);
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`z-[237] top-0 left-0 right-0  ${
        isSticky ? "fixed animate__fadeInDown" : ""
      }`}
    >
      <MiddleBar isSticky={isSticky} setShow={setShow} active={show}/>
      <Sidebar setShow={setShow} show={show} />
    </div>
  );
};

export default Navbar;
