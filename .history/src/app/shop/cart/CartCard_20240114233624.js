/*
 * Copyright (c) 10.1.2024.Tamiz
 */
"use client";

import React, { useEffect, useState } from "react";
import { Delete, Love, Minus, Plus, Taka } from "@/assets/icons";
import Image from "next/image";
import {api, localURL} from "@/Components/instance/api";
import { useDispatch, useSelector } from "react-redux";
import {setCheckOut} from "@/redux/Cart/action";
import {toast} from "react-hot-toast";
import {setRepatch} from "@/redux/Tools/action";

const CartCard = ({ markAll, cart, marked, setMarked , setMark,setTotalPrice,totalPrice }) => {
  const dispatch = useDispatch();
  const { checkOut } = useSelector((state) => state.Cart);
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0);
  const updateNumber = (type) => {
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
  const [checked, setChecked] = useState(false);
  const setCheckOutHandler = (type) => {
    const order = {
      product_id: cart?.product?._id,
      price: cart.price,
      product_name: cart?.product?.name,
      image: cart?.product?.cover,
      quantity: 1,
      price_total: cart.price
    }
    const isExist = checkOut?.filter(item=> item.product_id === order.product_id).length < 0

    if (type && !isExist){
        dispatch(setCheckOut([...checkOut, order]))
    }
    else{
      const newData = checkOut?.filter(item=> item.product_id !== order.product_id)
      dispatch(setCheckOut(newData))
    }

  };
  const deleteCart = async () => {
      try {
        const res = await api.delete(`/api/cart/${cart._id}`)
        toast.success("Item Delete Success")
        dispatch(setRepatch(res))
        
      }
      catch (e) {
        toast.error('Something went wrong')
      }
  }
  return (
    <tr className={"flex items-center py-5 w-full"}>
      <th>
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              setCheckOutHandler(e.target.checked)
              setChecked(e.target.checked)
            }}
            checked={checked}
            className="checkbox"
          />
        </label>
      </th>
      <td className={"flex items-center w-full"} >
        <div className="min-w-[132px] max-w-[142px] max-h-[153px] border bg-stone-300 rounded-[14px] bordered overflow-hidden">
          <Image
            src={localURL + cart?.product?.cover}
            alt={"product Image"}
            width={480}
            height={320}
          />
        </div>
        <div className={"ml-5 w-full"}>
          <div className={"flex justify-between items-center w-full"}>
            <h2 className="text-black text-base font-semibold ">
              {cart?.product?.name}
            </h2>
            <h5 className="text-neutral-600 text-sm font-normal ">
              SKU {cart?.product?.code}
            </h5>
          </div>
          <div className={"flex justify-between items-center mt-3"}>
            <div>
              <h2 className={"text-sm font-bold"}>{cart?.variant}</h2>
              <h2 className="text-orange-500 text-xl mt-3 font-semibold ">
                <Taka /> {cart.price}
              </h2>
              <div className="text-zinc-400 mt-2 text-sm font-semibold ">
                +Add note
              </div>
            </div>
            <div className={"flex items-center mt-5"}>

              <div className={"flex ml-3"}>
                <button
                    onClick={deleteCart}
                  className={"text-red-500 btn btn-ghost min-h-[56px] mr-3"}
                >
                  <Delete />
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
