/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'

import React, { useEffect, useState } from 'react'
import RecentViewed from "@/Components/Pages/Home/RecentViewed";
import Newsletter from "@/Components/Pages/Home/Newsletter";
import OrderCard from "@/app/shop/checkout/OrderCard";
import { useSelector } from 'react-redux';
import { api } from '@/Components/instance/api';

const Page = () => {
    const { currentUser } = useSelector(state => state.User)
    const [address, setAddress] = useState({})
    const [allAddress, setAllAddress] = useState([])
    console.log(address)
    useEffect(() => {
        (
            async () => {
                const res = await api.get(`/api/address/by/${currentUser?.email}`)

                setAllAddress(res.data)
            }
        )()
    }, [currentUser])
    return (
        <section>
            <div className={"container mx-auto grid grid-cols-10 mt-10 gap-10"}>
                <div className={"col-span-7 "}>
                    <div className={"flex justify-between items-center"}>
                        <h2 className="text-black text-3xl font-semibold ">Shipping Details</h2>
                        <select onChange={(e) => {
                            if (e.target.value) {
                                setAddress(JSON.parse(e.target.value))
                            }
                            else{
                                setAddress({})
                            }
                        }} className="select select-sm w-full max-w-xs">
                            <option value={JSON.stringify({})}>Choose form address book</option>
                            {
                                allAddress?.map((addr, index) => (
                                    <option
                                        key={addr._id}
                                        value={JSON.stringify(addr)}>
                                        <button
                                            className="hover:text-primary"
                                            onClick={() => console.log(addr)}
                                        >
                                            Address Template {index + 1}
                                        </button>
                                    </option>
                                ))
                            }
                            <option value={JSON.stringify({})}>Cancel</option>
                        </select>
                    </div>
                    <form action="" className={"grid grid-cols-2 mt-8 gap-x-10 gap-y-5"}>
                        <TextInput value={address?.name} label={"Full Name"} name={"name"} />
                        <TextInput disabled={true} value={currentUser?.email} label={"Email Address"} name={"email"} />
                        <TextInput value={address?.phone} label={"Mobile Number"} name={"phone"} />
                        <TextInput  value={address?.address} label={"Address"} name={"address"} />
                        <TextInput value={address?.country} label={"Country"} name={"country"} />
                        <TextInput value={address?.postcode} label={"Postcode/ZIP"} name={"postcode"} />
                        <TextInput value={address?.district} label={"City/Town"} name={"city"} />
                        <div className={"w-full col-span-2"}>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">{"Note"}</span>
                                </div>
                                <textarea name={"note"} className="textarea col-span-2 textarea-bordered"
                                    placeholder="Note"></textarea>
                            </label>
                        </div>
                    </form>
                </div>
                <div className={"col-span-3"}>
                    <div className="w-[100%] h-auto bg-white rounded-xl border border-neutral-300 px-5 py-10">
                        <h1 className="text-black text-xl font-semibold mb-8">My Orders</h1>
                        <OrderCard />
                        <OrderCard />
                        <hr className={"mt-7"} />
                        <div className={"flex items-center mt-8 justify-between"}>
                            <h1
                                className="w-[263px] text-neutral-500 text-[16px] font-normal  leading-relaxed">Subtotal
                            </h1>
                            <div className="text-right text-stone-900 text-lg font-semibold ">$1,952.66
                            </div>
                        </div>
                        <div className={"flex items-center mt-3 justify-between"}>
                            <h1
                                className="text-neutral-500 text-[16px] font-normal  leading-relaxed">Shipping
                            </h1>
                            <div className={"flex items-center"}>

                                <div className="text-right text-neutral-400 text-sm font-normal mr-2">Free
                                    Shipping
                                </div>
                                <div className="text-right text-stone-900 text-lg font-semibold ">$0</div>
                            </div>
                        </div>
                        <div className={"flex items-center mt-3 justify-between"}>
                            <h1
                                className="text-neutral-500 text-[16px] font-normal  leading-relaxed">Tax
                            </h1>
                            <div className={"flex items-center"}>

                                <div className="text-right text-stone-900 text-lg font-semibold ">$4.00</div>
                            </div>
                        </div>
                        <hr className={"mt-7"} />
                        <div className={"flex justify-between items-center mt-5"}>
                            <div className="text-black text-lg font-medium ">Order Total</div>
                            <h1
                                className="text-right text-orange-500 text-[28px] font-semibold ">$1,956.66
                            </h1>
                        </div>
                        <hr className={"mt-7"} />
                        <div className="text-black text-xl font-semibold mt-7 ">Payment</div>

                        <div className={"mt-10"}>
                            <div className="flex items-center start">
                                <input type="checkbox" className="checkbox" />
                                <h2 className="text-black text-lg font-normal ml-10">Direct Bank Transfer</h2>
                            </div>
                            <div className="flex items-center start mt-5">
                                <input type="checkbox" className="checkbox" />
                                <h2 className="text-black text-lg font-normal ml-10">Mobile Banking</h2>
                            </div>
                            <div className="flex items-center start mt-5">
                                <input type="checkbox" className="checkbox" />
                                <div className="text-black text-lg font-normal ml-10">Cash On Delivery</div>
                            </div>
                        </div>
                        <button className={"btn btn-primary w-full mt-14"}>
                            Place Order
                        </button>
                        <div
                            className=" text-[15px] text-center font-normal mt-5">Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore e
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

const TextInput = ({ label, name, value , disabled }) => {
    return <div className={"w-full"}>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input disabled={disabled} name={name} type="text" defaultValue={value}
                className="input input-bordered w-full" />
        </label>
    </div>
}
