"use client";
import React, { useEffect, useState } from "react";
import MiddleBar from "./MiddleBar";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: isSticky ? 0.5 : 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 300);
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`z-[237] animate__animated animate__delay-0.5s top-0 left-0 right-0 ${
        isSticky ? "fixed animate__fadeInDown" : ""
      }`}
    >
      <MiddleBar isSticky={isSticky} setShow={setShow} />
      {isSticky && <Sidebar setShow={setShow} show={show} />}
    </motion.div>
  );
};

export default Navbar;
