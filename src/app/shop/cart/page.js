/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'
import React, {useState} from 'react'
import CartCard from "@/app/shop/cart/CartCard";
import {RightCH, Wallet} from "@/assets/icons";
import RecentViewed from "@/Components/Pages/Home/RecentViewed";
import Newsletter from "@/Components/Pages/Home/Newsletter";
import Link from "next/link";

const Page = () => {
    const [show , setShow] = useState(false)
    const [markAll , setMark] = useState(false)
    const [markded , setMarked] = useState([])
    const onMark =(e) => {

    }
    return (
        <section>
            <div className={"container mx-auto "}>
                <div className={"grid grid-cols-10 w-full mt-10 gap-10"}>
                    <div className={"col-span-7"}>
                        <div className={"flex justify-between  border px-4 h-[80px] items-center rounded-lg"}>
                            <div className={"flex items-center"} onClick={()=> setMark(!markAll)}>
                                <input onChange={(e)=> setMark(e.target.checked)
                                } type="checkbox"  className="checkbox"/>
                                <h3 className={"ml-4"}>
                                    Select All
                                </h3>
                            </div>
                            <div className={"flex items-center"}>
                                <button className={"uppercase text-primary text-[16px]"}>Update Cart</button>
                                <div className="w-0.5 h-7 mx-4 bg-gray-200 rounded-lg"/>
                                <button className={"uppercase text-red-600 text-[16px]"}>Remove</button>
                            </div>
                        </div>
                        {/*Cart Box */}
                        <div className="overflow-x-auto">
                            <table className="table">
                                <tbody>
                                <CartCard markAll={markAll}/>
                                <CartCard markAll={markAll}/>
                                <CartCard markAll={markAll}/>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={"col-span-3"}>
                        <div

                            className="w-[100%] relative h-[80px] px-5 bg-red-50 rounded-xl justify-between cursor-pointer border border-orange-500 flex items-center">
                            <div className={"flex items-center"}>
                                <Wallet/>
                                <div className="text-orange-500 text-lg font-semibold ml-5"  onClick={()=> setShow(!show )}>I Have promo code
                                </div>
                            </div>
                            <span onClick={()=> setShow(!show )}>
                                <RightCH/>
                            </span>

                            {
                             show &&   <div
                                    className={"absolute bottom-[-75px] py-2 bg-white shadow-xl w-[100%] right-0 rounded-lg"}>
                                    <div
                                        className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
                                        <input type={"text"} className={"w-full h-[40px] border-none outline-none "}
                                               placeholder={"Enter Your Promo Code"}/>
                                        <button
                                            className="bg-orange-600 btn-primary text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none btn btn-sm">Apply
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="w-[100%] mt-10 h-[314px] bg-white rounded-xl p-10 border border-neutral-300">
                            <h1 className="text-black text-xl font-semibold ">Shopping Summary</h1>
                            <div className={"mt-10 flex justify-between items-center"}>
                                <h3 className="text-black text-lg font-medium">Total</h3>
                                <div
                                    className="text-right text-orange-500 text-[28px] font-semibold">$1,952.66
                                </div>
                            </div>
                            <Link href={'/checkout'} className={"btn btn-primary w-full mt-10"}>Checkout</Link>
                            <Link href={"/categories"} className="text-orange-500 text-center flex justify-center w-full mt-5 text-base font-bold">Back to Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
            <RecentViewed />
            <Newsletter />
        </section>
    )
}
export default Page
