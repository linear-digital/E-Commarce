"use client";

import React, { useState } from "react";
import Logo from "../Logo";
import { Avater, Cart, Cross, MenuIcon } from "@/assets/icons";
import Manubar from "./Manubar";
import Link from "next/link";
import {useSelector} from "react-redux";

const MiddleBar = ({ isSticky, setShow, active }) => {
  const [show, setShow1] = useState(false);
  const {currentUser} = useSelector(state=> state.User)
  const {cartItems} = useSelector(state=> state.Cart)
  console.log(typeof cartItems);
  return (
    <main className="shadow shadow-gray-100 bg-white lg:px-0 px-2 pb-2 lg:pb-0">
      <section className="container mx-auto lg:h-[90px] h-[50px] flex items-center justify-between pt-2">
        <span className="lg:block hidden">
          <Logo />
        </span>
        <div className="flex lg:hidden justify-between items-center w-full px-5">
          <button
            onClick={() => setShow(true)}
          >
            <MenuIcon active={active}/>
          </button>

          <Logo />
          <div className="">
            {show ? (
              <span onClick={() => setShow1(!show)}>
                <Cross />
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => setShow1(!show)}
              >
                <path
                  d="M23.6736 20.7516L18.9998 16.0781C18.7889 15.8672 18.5029 15.75 18.2029 15.75H17.4388C18.7326 14.0953 19.5014 12.0141 19.5014 9.75C19.5014 4.36406 15.137 0 9.75071 0C4.36438 0 0 4.36406 0 9.75C0 15.1359 4.36438 19.5 9.75071 19.5C12.0149 19.5 14.0963 18.7313 15.7512 17.4375V18.2016C15.7512 18.5016 15.8683 18.7875 16.0793 18.9984L20.7531 23.6719C21.1937 24.1125 21.9063 24.1125 22.3423 23.6719L23.6689 22.3453C24.1096 21.9047 24.1096 21.1922 23.6736 20.7516ZM9.75071 15.75C6.43641 15.75 3.75027 13.0688 3.75027 9.75C3.75027 6.43594 6.43172 3.75 9.75071 3.75C13.065 3.75 15.7512 6.43125 15.7512 9.75C15.7512 13.0641 13.0697 15.75 9.75071 15.75Z"
                  fill="#FF7020"
                />
              </svg>
            )}
          </div>
        </div>
        {show && (
          <div className="w-full absolute top-[50px] p-2 left-0 right-0 bg-gray-200 rounded-md z-[543] max-w-screen">
            <div className="w-full lg:h-[60px] h-[40px] overflow-hidden rounded-lg relative">
              <input
                className="lg:text-[17px] text-[14px] outline-none border-none w-full h-full bg-white px-5 text-gray-700 font-light"
                type="text"
                placeholder="Search here"
              />
              <div className="absolute z-50 lg:top-[20px] top-[10px] right-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M23.6736 20.7516L18.9998 16.0781C18.7889 15.8672 18.5029 15.75 18.2029 15.75H17.4388C18.7326 14.0953 19.5014 12.0141 19.5014 9.75C19.5014 4.36406 15.137 0 9.75071 0C4.36438 0 0 4.36406 0 9.75C0 15.1359 4.36438 19.5 9.75071 19.5C12.0149 19.5 14.0963 18.7313 15.7512 17.4375V18.2016C15.7512 18.5016 15.8683 18.7875 16.0793 18.9984L20.7531 23.6719C21.1937 24.1125 21.9063 24.1125 22.3423 23.6719L23.6689 22.3453C24.1096 21.9047 24.1096 21.1922 23.6736 20.7516ZM9.75071 15.75C6.43641 15.75 3.75027 13.0688 3.75027 9.75C3.75027 6.43594 6.43172 3.75 9.75071 3.75C13.065 3.75 15.7512 6.43125 15.7512 9.75C15.7512 13.0641 13.0697 15.75 9.75071 15.75Z"
                    fill="#FF7020"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* Searchbar  */}
        <div className="max-w-[796px] w-full lg:h-[55px] h-[40px] overflow-hidden rounded-lg relative mx-2 lg:block hidden">
          <input
            className="lg:text-[17px] text-[14px] outline-none border-none w-full h-full bg-[#F1F1F1] px-5 text-gray-700 font-light"
            type="text"
            placeholder="Search here"
          />
          <div className="absolute z-50 lg:top-[18px] top-[10px] right-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23.6736 20.7516L18.9998 16.0781C18.7889 15.8672 18.5029 15.75 18.2029 15.75H17.4388C18.7326 14.0953 19.5014 12.0141 19.5014 9.75C19.5014 4.36406 15.137 0 9.75071 0C4.36438 0 0 4.36406 0 9.75C0 15.1359 4.36438 19.5 9.75071 19.5C12.0149 19.5 14.0963 18.7313 15.7512 17.4375V18.2016C15.7512 18.5016 15.8683 18.7875 16.0793 18.9984L20.7531 23.6719C21.1937 24.1125 21.9063 24.1125 22.3423 23.6719L23.6689 22.3453C24.1096 21.9047 24.1096 21.1922 23.6736 20.7516ZM9.75071 15.75C6.43641 15.75 3.75027 13.0688 3.75027 9.75C3.75027 6.43594 6.43172 3.75 9.75071 3.75C13.065 3.75 15.7512 6.43125 15.7512 9.75C15.7512 13.0641 13.0697 15.75 9.75071 15.75Z"
                fill="#FF7020"
              />
            </svg>
          </div>
        </div>
        {/* right Side  */}
        <div className="hidden lg:flex items-center">
          <button
            className={`${!isSticky && "hidden"}`}
            onClick={() => setShow(true)}
          >
            <MenuIcon />
          </button>
          <Link href={'/shop/cart'} className="ml-14 relative">
            <Cart /> 
            <div className="w-[25px] h-[25px] bg-orange-500 rounded-full border-2 border-white absolute top-[-13px] right-[-10px] flex items-center justify-center text-sm font-semibold text-white" >
            {cartItems?.length}
            </div>
          </Link>
          <Link href={'/shop/me'} className="btn btn-primary shadow-md  shadow-orange-500 ml-14">
            <Avater />
            <span>
              {
                currentUser ?
                    currentUser?.name
                    :
                    " My Account"
              }
             </span>
          </Link>
        </div>
      </section>
      {!isSticky && <Manubar />}
    </main>
  );
};

export default MiddleBar;
