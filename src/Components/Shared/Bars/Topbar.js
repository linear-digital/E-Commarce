import React from "react";
import "./Bars.css";
import Image from "next/image";
const Topbar = () => {
  return (
    <div className="h-[53px] w-full bg-primary">
      <section className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <button className="flex items-center">
            <Image src={"/images/call.svg"} width={18} height={20} />
            <span className="text-white ml-2 text-[15px]">+91-9999999999</span>
          </button>
          <button className="flex items-center ml-[65px]">
            <Image src={"/images/envelope.svg"} width={18} height={18} />
            <span className="text-white ml-2 text-[15px]">
              support@support.com
            </span>
          </button>
        </div>
        {/* Topbar Left Side end here   */}
        {/* Topbar Right Side start Here  */}
        <div className="flex items-center">
          <button className="flex items-center ml-[65px]">
            <Image src={"/images/localtion.svg"} width={17} height={21} />
            <span className="text-white ml-2 text-[15px]">Store Location</span>
          </button>
          <button className="flex items-center ml-[55px]">
            <Image src={"/images/track.svg"} width={20} height={20} />
            <span className="text-white ml-2 text-[15px]">
              Track Your Order
            </span>
          </button>
          <div className="h-[30px] w-[2px] shadow-xl rounded-lg bg-gray-300 ml-10" />
          <div className="flex items-center ml-10">
            {/* Currencyes */}
            <select className="select select-primary bg-transparent text-white font-semibold w-[100px]">
              <option>৳ BDT</option>
            </select>
          </div>
          <div className="flex items-center ml-5">
            {/* Currencyes */}
            <select className="select select-primary bg-transparent text-white font-semibold w-[100px]">
              <option>EN</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topbar;
