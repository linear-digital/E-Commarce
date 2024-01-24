/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'
import React, {useEffect, useState} from 'react'
import CartCard from "@/app/cart/CartCard";
import {Plus, RightCH, Taka, Wallet} from "@/assets/icons";
import RecentViewed from "@/Components/Pages/Home/RecentViewed";
import Newsletter from "@/Components/Pages/Home/Newsletter";
import Link from "next/link";
import {api} from "@/Components/instance/api";
import {useDispatch, useSelector} from "react-redux";
import {setCheckOut} from "@/redux/Cart/action";

const Page = () => {
    const dispatch = useDispatch()
    const {repatch} = useSelector(state => state.Tools)
    const [show , setShow] = useState(false)
    const [markAll , setMark] = useState(false)
    const [markded , setMarked] = useState([])
    const {checkOut} = useSelector(state => state.Cart)
    const updateCart = async  (data) => {
        const cartData = JSON.parse(localStorage.getItem('cart'))
        if (cartData){
            try {
                const res = await  api.post('/api/cart', data)
                if (res.status === 200){
                    localStorage.setItem('cart', JSON.stringify([]))
                }
            }
            catch (e) {
                console.log(e)

            }
        }
    }
    useEffect(()=> {
        const cartData = JSON.parse(localStorage.getItem('cart'))
        if (cartData){
            cartData.map((data)=> {
                updateCart(data)
            })
        }
    },[])
    const [carts , setCarts] = useState([])
    useEffect(()=> {
        (
          async () => {
              const res = await  api.get('/api/cart')
              setCarts(res.data)
          }
        )()
    },[repatch])

    const onMark =(e) => {

    }
    const [totalPrice , setTotalPrice] = useState(0)

    useEffect(() => {
        let pr = 0
        checkOut.map((item)=> {
            pr = pr + item.price * item.quantity
            setTotalPrice(pr)
        })
        console.log(checkOut)

    }, [checkOut]);
    return (
        <section>
            <div className={"container mx-auto "}>
                <div className={"grid grid-cols-10 w-full mt-10 gap-10"}>
                    <div className={"col-span-6"}>
                        <div className={"flex justify-between  border px-4 h-[80px] items-center rounded-lg"}>
                            <div className={"flex items-center"} >
                                <input
                                 type="checkbox" checked={true} className="checkbox"/>
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
                                {
                                    carts?.map((car) => (
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
                        </div>
                    </div>
                    <div className={"col-span-4"}>
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
                        <div className="w-[100%] mt-10 min-h-[314px] bg-white rounded-xl p-10 border border-neutral-300">
                            <h3 className="text-black text-xl font-semibold ">Shopping Summary</h3>
                            <div className={"mt-3"}>
                                {
                                    checkOut.map((item , index) => (
                                        <div className={"flex flex-col  justify-start pb-2"}>
                                            <div className={"flex items-center justify-between"}>
                                                <h4 className={"text-sm"}>
                                                    {item.product_name}
                                                </h4>
                                                <h3 className={"font-semibold text-primary ml-2"}>
                                                    <Taka/> {item.price}
                                                </h3>
                                                <h3 className={" text-primary ml-2"}>
                                                  <strong>
                                                      Total :
                                                  </strong>  <Taka/> {item.price_total}
                                                </h3>
                                            </div>
                                            <div className="text-primary">
                                                <Plus />

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
