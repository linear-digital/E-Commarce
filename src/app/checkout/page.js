/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'

import React, { useEffect, useState } from 'react'
import RecentViewed from "@/Components/Pages/Home/RecentViewed";
import Newsletter from "@/Components/Pages/Home/Newsletter";
import OrderCard from "@/app/checkout/OrderCard";
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/Components/instance/api';
import { Spinner, Taka } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { setRepatch } from '@/redux/Tools/action';

const Page = () => {
    const router = useRouter()
    const { checkOut } = useSelector(state => state.Cart)
    const { currentUser } = useSelector(state => state.User)
    const [myaddress, setMyAddress] = useState(null)
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        country: "",
        district: "",
        home_address: "",
        division: "",
        postcode: "",
        message: ""
    })

    const [allAddress, setAllAddress] = useState([])
    useEffect(() => {
        (
            async () => {
                const res = await api.get(`/api/address/by/${currentUser?.email}`)

                setAllAddress(res.data)
            }
        )()
    }, [currentUser])

    useEffect(() => {
        if (checkOut.length === 0) {
            router.push('/cart')
        }
    }, [checkOut])

    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [shipping, setShipping] = useState(100)
    useEffect(() => {
        let sub = 0
        checkOut?.map((item) => {
            sub = sub + item.price_total
            setSubtotal(sub)
        })
    }, [checkOut])
    useEffect(() => {
        setTotal(subtotal + shipping)
    }, [subtotal, shipping])

    const [paymentType, setPaymentType] = useState("cod")
    function generateRandomCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength)).toUpperCase();
        }
        return result;
    }

    const sixDigitRandomText = generateRandomCode(10);
    const dispatch = useDispatch()
    const confirmOrder = () => {
        const submitOrder = async (data) => {
            try {
                const res = await api.post('/api/orders', data)
                if (res.status === 200 || res.status === 201) {
                    toast.success("Order Placed")
                    for (let i = 0; i < checkOut.length; i++) {
                        const id = checkOut[i]._id
                        try {
                            await api.delete(`/api/cart/${id}`)
                            dispatch(setRepatch(res))
                            router.push('/me/orders')
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
            catch (e) {
                toast.error(e.response.data.message)
            }
            // console.log(data);
        }
        const ord = {
            order_id: sixDigitRandomText,
            email: currentUser?.email,
            address: address,
            order: checkOut,
            paymentType: paymentType,
            total: total,
            subtotal: subtotal,
            shipping: shipping,

        }
        if (paymentType === "cod") {
            const newOrder = { ...ord, advance: 200, remaining: total - 200 }
            submitOrder(newOrder)
        }
        else {
            const newOrder = { ...ord, advance: 0, remaining: total }
            submitOrder(newOrder)
        }

    }
    const [loading, setLoading] = useState(false)
    const useCurrentAddress = () => {
        const apiKey = "AIzaSyBUDmkMGZD5mIPpiGRVQov8aPztKKB5B2c"
        if ("geolocation" in navigator) {
            // Get the current location
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    console.log(position);
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            setLoading(false)
                            // Extract the relevant location information from the response
                            const address = data.results[0]
                            setMyAddress(address)
                        })
                        .catch(error => {
                            console.error('Error fetching location data:', error)
                            setLoading(false)
                        });

                    // You can use the latitude and longitude values as needed
                },
                function (error) {
                    console.error("Error getting location: ", error.message);
                }
            );
        } else {
            console.error("Geolocation is not supported by your browser");
        }
    }
    useEffect(() => {
        useCurrentAddress()
    }, [])
    useEffect(() => {
        if (address.division === "Dhaka Division") {
            setShipping(60)
        }
        else {
            setShipping(120)
        }
    }, [address])
    useEffect(() => {
        const newAddress = {
            name: currentUser?.name,
            phone: currentUser?.phone,
            district: myaddress?.address_components[3]?.long_name,
            address: myaddress?.formatted_address,
            division: myaddress?.address_components[4]?.long_name,
            raw_address: myaddress,
            postcode: "",
            message: ""
        }
        setAddress(newAddress)
    }, [myaddress])

    return (
        <section>
            <div className={"container mx-auto grid grid-cols-11 mt-10 gap-10"}>
                <div className={"col-span-7 "}>
                    <div className={"flex justify-between items-center"}>
                        <h2 className="text-black text-3xl font-semibold flex items-center">Shipping Details
                            {
                                loading && <Spinner />
                            }
                        </h2>
                        <select onChange={(e) => {
                            if (e.target.value === "add-address") {
                                router.push('/me/address/add')
                            }
                            else if (e.target.value) {
                                setAddress(JSON.parse(e.target.value))
                            }
                            else {
                                setAddress({})
                            }
                        }} className="select select-sm w-full max-w-xs h-[50px]">
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
                            <option value={"add-address"}>
                                < >
                                    Add an address
                                </>
                            </option>
                        </select>
                    </div>
                    {

                        <form onSubmit={(e) => e.preventDefault()} action="" className={"grid grid-cols-2 mt-8 gap-x-10 gap-y-5"}>
                            <TextInput
                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                value={address?.name} label={"Full Name"} name={"name"} />
                            <TextInput disabled={true} value={currentUser?.email} label={"Email Address"} name={"email"} />

                            <TextInput onChange={(e) => setAddress({ ...address, phone: e.target.value })} value={address?.phone} label={"Mobile Number"} name={"phone"} />

                            <TextInput
                                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                value={address?.address} label={"Address"} name={"address"} />
                            <TextInput value={address?.division} label={"Division"} name={"division"} />
                            <TextInput
                                onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                                value={address?.postcode} label={"Postcode/ZIP"} name={"postcode"} />
                            <TextInput
                                onChange={(e) => setAddress({ ...address, district: e.target.value })}
                                value={address?.district} label={"City/Town"} name={"city"} />
                            <div className={"w-full col-span-2"}>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">{"Message"}</span>
                                    </div>
                                    <textarea
                                        onChange={(e) => setAddress({ ...address, message: e.target.value })}
                                        name={"note"} className="textarea col-span-2 textarea-bordered"
                                        placeholder="Note"></textarea>
                                </label>
                            </div>
                        </form>
                    }

                </div>
                <div className={"col-span-4"}>
                    <div className="w-[100%] h-auto bg-white rounded-xl border border-neutral-300 px-5 py-10">
                        <h1 className="text-black text-xl font-semibold mb-8">My Orders</h1>
                        {
                            checkOut?.map((item, index) => <OrderCard key={index} details={item} />)
                        }
                        <hr className={"mt-7"} />
                        <div className={"flex items-center mt-8 justify-between"}>
                            <h1
                                className="w-[263px] text-neutral-500 text-[16px] font-normal  leading-relaxed">Subtotal
                            </h1>
                            <div className="text-right text-stone-900 text-lg font-semibold "> <Taka /> {subtotal}
                            </div>
                        </div>
                        <div className={"flex items-center mt-3 justify-between"}>
                            <h1
                                className="text-neutral-500 text-[16px] font-normal  leading-relaxed">Shipping
                            </h1>
                            <div className={"flex items-center"}>
                                <div className="text-right text-neutral-400 text-sm font-normal mr-2">
                                </div>
                                <div className="text-right text-stone-900 text-lg font-semibold "><Taka /> {shipping}</div>
                            </div>
                        </div>

                        <hr className={"mt-7"} />
                        <div className={"flex justify-between items-center mt-5"}>
                            <div className="text-black text-lg font-medium ">Order Total</div>
                            <h1
                                className="text-right text-orange-500 text-[28px] font-semibold "> <Taka /> {total}
                            </h1>
                        </div>
                        <hr className={"mt-7"} />
                        <div className="text-black text-xl font-semibold mt-7 ">Payment</div>

                        <div className={"mt-10"}>
                            <div className="flex items-center start">
                                <input checked={paymentType === "dbt"} type="checkbox" className="checkbox" onChange={(e) => setPaymentType("dbt")} />
                                <h2 className="text-black text-lg font-normal ml-10">Direct Bank Transfer</h2>
                            </div>
                            <div className="flex items-center start mt-5">
                                <input
                                    checked={paymentType === "mb"}
                                    type="checkbox" className="checkbox"
                                    onChange={(e) => setPaymentType("mb")}
                                />
                                <h2 className="text-black text-lg font-normal ml-10">Mobile Banking</h2>
                            </div>
                            <div className="flex items-center start mt-5">
                                <input
                                    checked={paymentType === "cod"}
                                    onChange={(e) => setPaymentType("cod")}
                                    type="checkbox" className="checkbox" />
                                <div className="text-black text-lg font-normal ml-10">Cash On Delivery <span className='ml-2 text-sm font-semibold'>(200 Taka Advance Pay)</span></div>
                            </div>
                        </div>
                        <button
                            onClick={confirmOrder}
                            className={"btn btn-primary w-full mt-14"}>
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

const TextInput = ({ label, name, value, disabled, required, onChange }) => {
    return <div className={"w-full"}>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input required={required} onChange={onChange} disabled={disabled} name={name} type="text" value={value}
                className="input input-bordered w-full" />
        </label>
    </div>
}
