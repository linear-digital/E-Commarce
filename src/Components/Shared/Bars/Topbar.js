'use client'
import React from "react";
import "./Bars.css";
import Image from "next/image";
import Link from "next/link";
const Topbar = () =>
{
  return (
    <div className="h-[40px] w-full bg-primary hidden lg:block lg:px-4">
      <section className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm text-white">
            Please Call us to check the Stock before Placing the order!
          </p>

        </div>
        {/* Topbar Left Side end here   */}
        {/* Topbar Right Side start Here  */}
        <div className="flex items-center">
          <a href="tel:+8801867717496" className="flex items-center">
            <Image alt="call icon" src={"/images/call.svg"} width={18} height={20} />
            <span className="text-white ml-2 text-[14px]">+8801867717496</span>
          </a>
          <div className="h-[26px] w-[1.2px] bg-gray-300 mx-5" />
          <a href="https://www.facebook.com/linearhubshop" target="_blank" rel="noreferrer" className="flex items-center">
            <span className="text-white ml-2 text-[14px]">FB Page</span>
          </a>
          <div className="h-[26px] w-[1.2px] bg-gray-300 mx-5" />
          <a href="https://www.facebook.com/linearhubshop" target="_blank" rel="noreferrer" className="flex items-center">
            <span className="text-white ml-2 text-[14px]">FB Group</span>
          </a>
          <div className="h-[26px] w-[1.2px] bg-gray-300 mx-5" />
          <Link href={"/track-order"} className="flex items-center ">
            <Image src={"/images/track.svg"} width={20} height={20} alt="Track" />
            <span className="text-white ml-2 text-[14px]">
              Track Your Order
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Topbar;
