/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'
import React, { useEffect, useState } from 'react'
import CartCard from "@/app/cart/CartCard";
import { Minus, Plus, RightCH, Taka, Wallet } from "@/assets/icons";
import RecentViewed from "@/Components/Pages/Home/RecentViewed";
import Newsletter from "@/Components/Pages/Home/Newsletter";
import Link from "next/link";
import { api } from "@/Components/instance/api";
import { useDispatch, useSelector } from "react-redux";
import { setCheckOut } from "@/redux/Cart/action";
import Skeleton from 'react-loading-skeleton';

const Page = () => {
    const dispatch = useDispatch()
    const { repatch } = useSelector(state => state.Tools)
    const { cartItems } = useSelector(state => state.Cart)

    const [show, setShow] = useState(false)
    const [markAll, setMark] = useState(false)
    const [markded, setMarked] = useState([])
    const { checkOut } = useSelector(state => state.Cart)
    const { currentUser } = useSelector(state => state.User)
    
    const [carts, setCarts] = useState([])
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        if (cartItems) {
            setCarts(cartItems)
            setLoading(false)
        }
    }, [repatch , currentUser , cartItems])


    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let pr = 0
        checkOut.map((item) => {
            pr = pr + item.price_total
            setTotalPrice(pr)
        })
    }, [checkOut]);

    const updatePlus = (item, type) => {
        if (type === "plus") {
            if (item.quantity >= 1) {
                const quan = item.quantity + 1
                for (let i = 0; i < checkOut.length; i++) {
                    if (checkOut[i].product_id === item.product_id) {
                        checkOut[i]["quantity"] = quan
                        checkOut[i]["price_total"] = quan * item.price
                        dispatch(setCheckOut([...checkOut]))
                        break; // Stop the loop once the object is found and updated
                    }
                }
            }
        }
        else {
            if (item.quantity > 1) {
                const quan = item.quantity - 1
                for (let i = 0; i < checkOut.length; i++) {
                    if (checkOut[i].product_id === item.product_id) {
                        checkOut[i]["quantity"] = quan
                        checkOut[i]["price_total"] = quan * item.price
                        dispatch(setCheckOut([...checkOut]))
                        break; // Stop the loop once the object is found and updated
                    }
                }
            }
        }
    }
    console.log(currentUser);
    return (
        <section>
            <div className={"container mx-auto "}>
                <div className={"grid grid-cols-10 w-full mt-10 gap-10"}>
                    <div className={"col-span-6"}>
                        {/*Cart Box */}
                        <div className="overflow-x-auto">
                            {
                                loading ? <CartLoader /> : 
                                <table className="table">
                                <tbody>
                                    {
                                        carts?.length === 0 ?
                                        <td className='text-center text-primary font-semibold text-3xl pt-10'>
                                            <Link  href={'/categories'}>Continue Shopping</Link>
                                        </td>
                                        :
                                        carts?.map((car , index) => (
                                            <CartCard
                                                setMarked={setMarked}
                                                marked={markded}
                                                cart={car} key={car._id} markAll={markAll}
                                                setMark={setMark}
                                                setTotalPrice={setTotalPrice}
                                                totalPrice={totalPrice}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
                    <div className={"col-span-4"}>
                        <div
                            className="w-[100%] relative h-[80px] px-5 bg-red-50 rounded-xl justify-between cursor-pointer border border-orange-500 flex items-center">
                            <div className={"flex items-center"}>
                                <Wallet />
                                <div className="text-orange-500 text-lg font-semibold ml-5" onClick={() => setShow(!show)}>I Have promo code
                                </div>
                            </div>
                            <span onClick={() => setShow(!show)}>
                                <RightCH />
                            </span>

                            {
                                show && <div
                                    className={"absolute bottom-[-75px] py-2 bg-white shadow-xl w-[100%] right-0 rounded-lg"}>
                                    <div
                                        className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
                                        <input type={"text"} className={"w-full h-[40px] border-none outline-none "}
                                            placeholder={"Enter Your Promo Code"} />
                                        <button
                                            className="bg-orange-600 btn-primary text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none btn btn-sm">Apply
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="w-[100%] mt-10 min-h-[314px] bg-white rounded-xl p-10 border border-neutral-300">
                            <h1 className="text-black text-xl font-semibold ">Shopping Summary</h1>
                            <div className={"mt-3"}>
                                {
                                    checkOut.map((item, index) => (
                                        <div key={index} className={"flex flex-col  justify-start pb-2"}>
                                            <div className={"flex items-center justify-between"}>
                                                <h4 className={"text-[15px]"}>
                                                    {item.product_name} ({item.variant})
                                                </h4>
                                                <h3 className={"font-semibold text-primary ml-2"}>
                                                    <Taka /> {item.price}
                                                </h3>
                                                <h3 className={" text-primary ml-2"}>
                                                    <strong>
                                                        Total :
                                                    </strong>  <Taka /> {item.price_total}
                                                </h3>
                                            </div>
                                            <div className="text-primary mt-3 flex items-center">
                                                <h2 className='mr-3 font-medium'> Quantity <span className='font-semibold'>:</span></h2>
                                                <div className="flex items-center  py-2 px-4 rounded-md shadow justify-center">
                                                <button
                                                    onClick={() => updatePlus(item, 'minus')}
                                                >
                                                    <Minus />
                                                </button>

                                                <h2 className={"mx-3 w-[30px] justify-center text-base font-semibold bg-orange-100 h-[30px] flex items-center rounded"}>
                                                    {item.quantity}
                                                </h2>
                                                <button
                                                    onClick={() => updatePlus(item, 'plus')}
                                                    className='text-base'>
                                                    <Plus />
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={"mt-10 flex justify-between items-center"}>
                                <h3 className="text-black text-lg font-medium">Total</h3>
                                <div
                                    className="text-right text-orange-500 text-[28px] font-semibold"><Taka /> {totalPrice}
                                </div>
                            </div>
                            <Link href={checkOut.length > 0 ? "/checkout" : "/cart"} className={"btn btn-primary w-full mt-10"}>Checkout</Link>
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


const CartLoader = () => {
    return (
        <div className="mt-5">
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
        </div>
    )
}