/*
 * Copyright (c) 10.1.2024.Tamiz
 */
'use client'

import React, {useEffect, useState} from 'react'
import {Delete, Love, Minus, Plus, Taka} from "@/assets/icons";
import Image from "next/image";
import {localURL} from "@/Components/instance/api";
import {useDispatch, useSelector} from "react-redux";

const CartCard = ({markAll , cart , marked , setMarked}) => {
    const dispatch = useDispatch()
    const {checkOut} = useSelector(state => state.Cart)
    const [number , setNumber] = useState(1)
    const [price , setPrice] = useState(0)
    const updateNumber = (type) => {
        if (type === "plus"){
            if (number >= 1){
                setNumber(number + 1)
            }
        }
        else {
            if (number > 1){
                setNumber(number - 1)
            }
        }
    }
    const [checked , setChecked] = useState(true)
    const setCheckOut = () => {
        dispatch(setCheckOut([...checkOut, {
            product_id: cart?.product?._id,
            price: price
        }]))
    }
    useEffect(() => {
        setPrice(cart?.price * Number(number))
    }, [number , cart]);
    return (
        <tr className={"flex items-center py-5 w-full"}>
            <th>
                <label>
                    <input  type="checkbox" onChange={(e)=> {
                        setChecked(e.target.checked)
                        setMarked(cart)
                        setCheckOut()
                    }}
                           checked={checked} className="checkbox"/>
                </label>
            </th>
            <td className={"flex items-center w-full"}>
                <div className="min-w-[132px] max-w-w-[132px] h-[113px] bg-stone-300 rounded-[14px] bordered overflow-hidden">
                    <Image src={localURL+cart?.product?.cover} alt={""} width={132} height={113}/>
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
                            <h2 className="text-orange-500 text-xl mt-3 font-semibold "><Taka /> {price}</h2>
                            <div className="text-zinc-400 mt-2 text-sm font-semibold ">+Add note</div>
                        </div>
                        <div className={"flex items-center mt-5"}>
                            <div className="w-[169px] h-14 rounded-xl border border-zinc-300 flex px-3 justify-between">
                                <button disabled={number === 1} onClick={() => updateNumber("minus")} className={"text-primary disabled:text-black"}><Minus/>
                                </button>
                                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} min={1}
                                       className={"w-[100%] text-black text-center text-xl border-none outline-none mx-2"}/>

                                <button onClick={() => updateNumber("plus")} className={"text-primary"}><Plus/></button>
                            </div>
                            <div className={"flex ml-3"}>
                                <button className={"text-red-500 btn btn-ghost min-h-[56px] mr-3"}><Delete /></button>
                                <button className={"text-red-500 "}><Love /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
export default CartCard
