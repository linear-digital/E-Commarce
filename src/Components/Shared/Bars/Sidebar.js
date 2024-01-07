import { Cross, Fire, Mappin } from "@/assets/icons";
import React from "react";
import Logo from "../Logo";
import { navigations } from "./data";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ setShow, show }) => {
  return (
    <div
      className={
        show
          ? "h-screen bg-[#00000083] animate__animated animate__fadeInRight absolute  w-screen right-0 z-[444] top-0"
          : "animate__fadeOutRight animate__animated"
      }
    >
      <div className="h-full w-[350px] bg-white  absolute right-0">
        <button
          className="absolute left-3 top-3"
          onClick={() => {
            setShow(false);
          }}
        >
          <Cross />
        </button>
        <div className="mt-14">
          <div className="flex justify-center">
            <Logo />
          </div>
          <ul className="flex flex-col mt-10">
            {navigations.map((navigation, index) => {
              return (
                <li
                  className="px-5 font-normal capitalize py-2 mb-2"
                  key={index}
                >
                  <Link href={navigation.href}>{navigation.name}</Link>
                </li>
              );
            })}
          </ul>
          <button className="flex items-center justify-center w-full mt-5 btn btn-ghost">
            <Fire />
            <span className="ml-3 font-semibold">HOT DEALS</span>
          </button>
          <button className="btn  btn-primary text-base shadow-md w-full justify-start item-center flex mt-3">
            <Mappin />
            <span className="ml-2">Store Location</span>
          </button>
          <button className="btn  btn-primary text-base shadow-md w-full justify-start item-center flex mt-3">
            {/* <Track w={24} h={20} /> */}
            <Image src={"/images/tracking.png"} width={24} height={20} />
            <span className="ml-2">Track Your Order</span>
          </button>
        </div>
      </div>
      <div className="w-full h-full" onClick={() => setShow(false)}></div>
    </div>
  );
};

export default Sidebar;
