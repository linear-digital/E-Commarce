/*
 * Copyright (c) 10.1.2024.Tamiz
 */
'use client'

import React, {useState} from 'react'
import {Delete, Love, Minus, Plus} from "@/assets/icons";

const CartCard = ({markAll}) => {
    const [number , setNumber] = useState(1)
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
    return (
        <tr className={"flex items-center py-5 w-full"}>
            <th>
                <label>
                    <input type="checkbox" onChange={(e)=> {
                        setChecked(e.target.checked)
                    }}
                           checked={checked && markAll} className="checkbox"/>
                </label>
            </th>
            <td className={"flex items-center w-full"}>
                <div className="min-w-[132px] max-w-w-[132px] h-[113px] bg-stone-300 rounded-[14px]"/>
                <div className={"ml-5 w-full"}>
                    <div className={"flex justify-between items-center w-full"}>
                        <h1 className="text-black text-base font-semibold ">LED Monitor With High Quality In
                            The World
                        </h1>
                        <h5 className="text-neutral-600 text-sm font-normal ">SKU 12314124124</h5>
                    </div>
                    <div className={"flex justify-between items-center mt-3"}>
                        <div>
                            <h2 className="text-orange-500 text-xl mt-3 font-semibold ">$976.33</h2>
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
