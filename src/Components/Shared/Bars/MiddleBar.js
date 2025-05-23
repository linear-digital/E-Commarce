"use client";

import React, { useState } from "react";
import Logo from "../Logo";
import { Avater, Cart, Cross, MenuIcon } from "@/assets/icons";
import Manubar from "./Manubar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setRepatch, setShowNotification } from "@/redux/Tools/action";
import Notification from "@/Components/Notification";
import { api, localURL } from "@/Components/instance/api";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { setCurrentUser } from "@/redux/User/action";
import LoginForm2 from "@/app/login/LoginForm2";

const MiddleBar = ({ isSticky, setShow, active }) =>
{
  const [show, setShow1] = useState(false);
  const { currentUser } = useSelector(state => state.User)
  const { cartItems } = useSelector(state => state.Cart)
  const { showNotification } = useSelector(state => state.Tools)
  const dispatch = useDispatch()
  const [searchResult, setSearchResult] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const SearchProduct = async (e) =>
  {
    e.preventDefault()
    const res = await api.post('/api/products/search', { search: e.target.product_name.value })
    setShowResult(true)
    setSearchResult(res.data)
  }


  return (
    <main className="shadow  shadow-gray-100 bg-white  px-2 pb-2 lg:pb-0 lg:px-4">
      <section className="container mx-auto lg:h-[90px] h-[50px] flex items-center justify-between pt-2">
        <span className="lg:block hidden">
          <Logo />
        </span>

        <div className="flex lg:hidden justify-between items-center w-full px-5">
          <button
            onClick={() => setShow(true)}
          >
            <MenuIcon active={active} />
          </button>

          <Logo />
          <div className="flex items-center">
            <button
              style={{ display: currentUser ? "block" : "none" }}
              onClick={() =>
              {
                dispatch(setShowNotification(true))
              }}
              className=" text-primary relative mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
              </svg>
            </button>
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
        </div>

        {show && (
          <div className="w-full absolute top-[50px] p-2 left-0 right-0 bg-gray-200 rounded-md z-[543] max-w-screen">
            <form onSubmit={SearchProduct} className="w-full lg:h-[60px] h-[40px] overflow-hidden rounded-lg relative">
              <input
                onChange={(e) => setSearch(e.target.value)}
                name="product_name"
                className="lg:text-[17px] text-[14px] outline-none border-none w-full h-full bg-white px-5 text-gray-700 font-light"
                type="text"
                placeholder="Search What You Want"
              />
              <button className="absolute z-50 lg:top-[20px] top-[10px] right-7">
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
              </button>
            </form>
          </div>
        )}
        {
          showModal && <div className="w-full h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">

            <LoginForm2 setShow={setShowModal} />

          </div>
        }

        {/* Searchbar  */}
        <form onSubmit={SearchProduct} className="max-w-[796px] w-full lg:h-[55px] h-[40px] overflow-hidden rounded-lg relative mx-2 lg:block hidden">
          <input
            className="text-sm outline-none border-none outline-white w-full h-full bg-[#F1F1F1] px-5 "
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search What You Want"
            name="product_name"
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
        </form>
        {/* right Side  */}
        <div className="hidden lg:flex items-center">
          <button
            className={`${!isSticky && "hidden"}`}
            onClick={() => setShow(true)}
          >
            <MenuIcon />
          </button>
          <button
            style={{ display: currentUser ? "block" : "none" }}
            onClick={() =>
            {
              dispatch(setShowNotification(true))
            }}
            className="ml-5 text-primary relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
              <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <Link href={'/cart'} className="ml-7 relative">
            <Cart />
            <div className="w-[25px] h-[25px] bg-[#e30613] rounded-full border-2 border-white absolute top-[-13px] right-[-10px] flex items-center justify-center text-sm font-semibold text-white" >
              {cartItems?.length}
            </div>
          </Link>
          <details className="dropdown">
            <summary
              onClick={() =>
              {
                !currentUser && setShowModal("login")
              }}
              className="btn btn-primary shadow-md  ml-14">
              <Avater />
              <span>
                {
                  currentUser ?
                    currentUser?.name
                    :
                    "Account"
                }
              </span>
            </summary>
            {
              currentUser && <ul className="p-2 shadow menu dropdown-content z-[103] bg-base-100 rounded-box w-52 right-0 ">
                {
                  currentUser?.role === "admin" &&
                  <li>
                    <Link href={'/admin/dashboard'}>
                      Dashboard
                    </Link>
                  </li>
                }

                <li>
                  <Link href={'/me/profile'}>
                    Profile
                  </Link>
                </li>
                <li className="mt-1">
                  <Link href={'/me/orders'}>
                    Orders
                  </Link>
                </li>
                <li className="mt-1">
                  <Link href={'/me/orders'}>
                    Address Book
                  </Link>
                </li>
                <li>
                  <button className="btn btn-sm btn-danger mt-2"
                    onClick={() =>
                    {
                      Cookies.remove("auth_token")
                      toast.success("Logout Success")
                      window.location.reload()
                    }}
                  >Sign Out</button>
                </li>
              </ul>
            }
          </details>

        </div>
      </section>
      {!isSticky && <Manubar />}
      {
        showNotification &&
        <Notification />
      }
      {
        showResult && searchResult && search && <div className="absolute lg:top-[130px] top[100px] w-full h-[800px]  bg-white z-[3435] flex flex-col items-center left-0 right-0">
          <div className="lg:w-[800px] w-full flex justify-between items-center px-3">
            <h2 className="text-xl font-semibold">Products</h2>
            <button
              onClick={() =>
              {
                setShowResult(false)
                setSearchResult([])
              }}
              className="text-red-500 p-2">
              <Cross />
            </button>

          </div>
          <div className="lg:w-[800px] w-full px-3 h-full overflow-y-auto rounded-lg mt-3">

            {
              searchResult?.map((data, index) => (
                <Link
                  onClick={() =>
                  {
                    setShow1(false)
                    setShowResult(false)
                    setSearchResult([])
                  }}
                  href={`/products/${data?._id}`} key={index} className="w-full border h-[60px] shadow-md mb-2 rounded-lg flex items-center p-5 hover:bg-gray-100">
                  <Image
                    className="max-h-[50px] max-w-[50px] rounded"
                    width={50} height={50} src={data?.cover} alt="" />
                  <h2 className="ml-5 text-xs"> {data.name}</h2>
                </Link>
              ))
            }
          </div>
        </div>
      }

    </main>
  );
};

export default MiddleBar;
