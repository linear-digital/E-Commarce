/*
 * Copyright (c) 10.1.2024.Tamiz
 */
"use client";

import React, { useEffect, useState } from "react";
import { Delete, Love, Minus, Plus, Taka } from "@/assets/icons";
import Image from "next/image";
import { api, localURL } from "@/Components/instance/api";
import { useDispatch, useSelector } from "react-redux";
import { setCheckOut } from "@/redux/Cart/action";
import { toast } from "react-hot-toast";
import { setRepatch } from "@/redux/Tools/action";
import Link from "next/link";
import { Popconfirm } from "antd";

const CartCard = ({ markAll, cart, marked, setMarked, setMark, setTotalPrice, totalPrice }) =>
{
  const dispatch = useDispatch();
  const { checkOut } = useSelector((state) => state.Cart);
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0);
  const updateNumber = (type) =>
  {
    if (type === "plus") {
      if (number >= 1) {
        setNumber(number + 1);
      }
    } else {
      if (number > 1) {
        setNumber(number - 1);
      }
    }
  };

  const deleteCart = async () =>
  {
    try {
      const res = await api.delete(`/api/cart/${cart._id}`)
      toast.success("Item Delete Success")
      dispatch(setRepatch(res))
      dispatch(setCheckOut([]))
    }
    catch (e) {
      toast.error('Something went wrong')
    }
  }

  return (
    <tr className={"flex items-center py-5 w-full"}

    >
      <td className={"lg:flex items-center w-full hidden"} >
        <Link href={`/products/${cart?.product_id}`} className="lg:min-w-[132px] lg:max-w-[142px] lg:max-h-[153px] w-[] border bg-stone-300 rounded-[14px] bordered overflow-hidden">
          <Image
            src={cart?.image}
            alt={cart?.product_name}
            width={480}
            height={320}
          />
        </Link>
        <div className={"ml-5 w-full"}>
          <div className={"flex justify-between items-center w-full"}>
            <h2 className="text-black text-base font-semibold ">
              {cart?.product_name}
            </h2>
            <h5 className="text-neutral-600 text-sm font-normal ">
              SKU {cart?.product_code}
            </h5>
          </div>
          <div className={"flex justify-between items-center mt-3"}>
            <div>
              <h2 className={"text-sm font-bold"}>{cart?.variant}</h2>
              <h2 className="text-[#e30613] text-xl mt-3 font-semibold ">
                <Taka /> {cart.price}
              </h2>
              <div className="text-zinc-400 mt-2 text-sm font-semibold ">
                +Add note
              </div>
            </div>
            <div className={"flex items-center mt-5"}>

              <div className={"flex ml-3"}>
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={deleteCart}
                  okText="Yes"
                  cancelText="No"
                >
                  <button
                  className={"btn bg-red-500 text-white min-h-[46px] max-h-[46px] hover:bg-red-500 mr-3"}
                >
                  Delete
                </button>
                </Popconfirm>
                <button className={"text-red-500 "}>
                  <Love />
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className={"lg:hidden items-center w-full p-0"} >
        <div className="flex items-center justify-start">
          <Link href={`/products/${cart?.product_id}`} className="max-w-[80px] border bg-stone-300 rounded-[14px] bordered overflow-hidden">
            <Image
              className="max-w-[80px] min-w-[70px] "
              src={cart?.image}
              alt={cart?.product_name}
              width={480}
              height={320}
            />
          </Link>
          <div className={"flex flex-col h-full ml-3"}>
            <h2 className="text-black text-sm font-semibold ">
              {cart?.product_name.slice(0, 30)}...
            </h2>
            <div className="flex items-center mt-3 justify-between">
              <h5 className="text-neutral-600 text-xs font-normal ">
                SKU {cart?.product_code}
              </h5>
              <h2 className={"text-sm font-bold mr-3"}>{cart?.variant}</h2>
            </div>
          </div>
        </div>
        <div className={"w-full"}>
          <div className={"flex justify-between items-center"}>
            <div>
              <h2 className="text-[#e30613] text-base mt-3 font-semibold ">
                <Taka /> {cart.price}
              </h2>
              <div className="text-zinc-400 mt-2 text-xs font-semibold ">
                +Add note
              </div>
            </div>
            <div className={"flex items-center justify-between mt-5"}>
              <div className={"flex ml-3"}>
                <button
                  onClick={deleteCart}
                  className={"btn bg-red-500 text-white min-h-[46px] max-h-[46px] hover:bg-red-500 mr-3"}
                >
                  Delete
                </button>
                <button className={"text-red-500 "}>
                  <Love />
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default CartCard;
