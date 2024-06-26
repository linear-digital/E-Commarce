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

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import Bkash from './Bkash';
import Nagad from './Nagad';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Page = () => {
    const router = useRouter()
    const { checkOut } = useSelector(state => state.Cart)
    const { currentUser } = useSelector(state => state.User)
    const [myaddress, setMyAddress] = useState(null)
    const [address, setAddress] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        district: "",
        home_address: "",
        division: "",
        postcode: "",
        message: ""
    })

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const [allAddress, setAllAddress] = useState([])
    useEffect(() => {
        if (currentUser?.email) {
            (
                async () => {
                    const res = await api.get(`/api/address/by/${currentUser?.email}`)

                    setAllAddress(res.data)
                }
            )()
        }
    }, [currentUser])

    useEffect(() => {
        if (checkOut.length === 0) {
            router.push('/cart')
        }
    }, [checkOut])

    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [shipping, setShipping] = useState(100)
    const [advanced, setAdvanced] = useState(0)
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

    const [paymentType, setPaymentType] = useState("")
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
    const [paymentDetails, setPaymentDetails] = useState({
        number: "",
        paymentType: "",
        transection_id: "",
    })
    const confirmOrder = () => {
        if (paymentDetails.number && paymentDetails.paymentType && paymentDetails.transection_id) {
            const submitOrder = async (data) => {
                try {
                    const res = await api.post('/api/orders', data)
                    toast.success("Order Placed")
                    for (let i = 0; i < checkOut.length; i++) {
                        const id = checkOut[i]._id
                        try {
                            await api.delete(`/api/cart/${id}`)
                            dispatch(setRepatch(res))
                        } catch (error) {
                            console.log(error);
                            toast.error(error.response.data.message || "Something went wrong")
                        }
                    }
                    router.push(`/track-order?order_id=${data?.order_id}&email=${data?.email}`)
                }
                catch (e) {
                    toast.error(e.response.data.message)
                }
                // console.log(data);
            }
            const ord = {
                order_id: sixDigitRandomText,
                email: address.email || currentUser?.email,
                address: address,
                order: checkOut,
                paymentType: paymentType,
                total: total,
                subtotal: subtotal,
                shipping: shipping,
                advance: advanced,
                remaining: total - advanced,
                paymentDetails: paymentDetails

            }
            submitOrder(ord)
        }
        else {
            toast.error("Please Complete Your Payment")
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
        // useCurrentAddress()
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
        <section className='px-4 lg:px-0'>

            <Dialog
                open={open && advanced > 0}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Pay <mark>{advanced} <Taka /></mark> to confirm order</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <h2 className='lg:text-2xl text-base text-center'>Select Payment Method</h2>
                        <div className=''>
                            <button
                                onClick={() => setPaymentDetails({ ...paymentDetails, paymentType: "bkash" })}
                                className='btn btn-ghost w-full mt-2 bg-stone-200 flex justify-center items-center'>
                                <Image src={'/images/bkash.png'} alt="" width={80} height={80} />
                            </button>
                            <button
                                onClick={() => setPaymentDetails({ ...paymentDetails, paymentType: "nagad" })}
                                className='btn btn-ghost w-full mt-2 bg-stone-200 flex justify-center items-center'>
                                <Image src={'/images/nagad.png'} alt="" width={80} height={80} />
                            </button>
                        </div>
                    </DialogContentText>
                    <div className='lg:grid grid-cols-2 items-center mt-3'>
                        {
                            paymentDetails.paymentType === "bkash" && <Bkash />
                        }
                        {
                            paymentDetails.paymentType === "nagad" && <Nagad />
                        }
                        <div>
                            {
                                paymentDetails.paymentType &&
                                <>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Your Payment Account Number.</span>
                                        </div>
                                        <input
                                            value={paymentDetails.number}
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, number: e.target.value })}
                                            type="number" placeholder="Your Account Number" className="input input-bordered input-sm w-full max-w-xs" />
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Transection Id</span>
                                        </div>
                                        <input
                                            value={paymentDetails.transection_id.toUpperCase()}
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, transection_id: e.target.value.toUpperCase() })}
                                            type="text" placeholder="Ex: J1D2H3D4K5B" className="input input-bordered input-sm w-full max-w-xs" />
                                    </label>
                                </>
                            }
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant='outlined' className='btn-danger' onClick={handleClose}>Close</Button>
                    <Button className='bg-primary' variant='contained'
                        onClick={() => {
                            confirmOrder()
                        }}
                    >Confirm Order</Button>
                </DialogActions>
            </Dialog>




            <div className={"container mx-auto lg:grid lg:grid-cols-11 grid-cols-1 mt-10 gap-10"}>
                <div className={"col-span-7 "}>
                    <div className={"lg:flex justify-between items-center"}>
                        <h1 className="text-black lg:text-3xl text-xl font-semibold flex items-center">Shipping Details
                            {
                                loading && <Spinner />
                            }
                        </h1>
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
                        }} className="select select-bordered mt-2 lg:mt-0 select-sm w-full lg:max-w-xs h-[50px]">
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

                        <form onSubmit={(e) => e.preventDefault()} action="" className={"lg:grid grid-cols-2 lg:mt-8 mt-3 gap-x-10 gap-y-5"}>
                            <TextInput
                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                value={address?.name} label={"Full Name"} name={"name"} />
                            <TextInput disabled={currentUser?.email} value={currentUser?.email} label={"Email Address"} name={"email"}
                                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                            />

                            <TextInput onChange={(e) => setAddress({ ...address, phone: e.target.value })} value={address?.phone} label={"Mobile Number"} name={"phone"}
                            />

                            <TextInput
                                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                value={address?.address} label={"Address"} name={"address"} />
                            <TextInput value={address?.division} label={"Division"} name={"division"} 
                                onChange={(e) => setAddress({ ...address, division: e.target.value })}
                            />
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
                <div className={"col-span-4 mt-7 lg:mt-0"}>
                    <div className="w-full h-auto bg-white rounded-xl border border-neutral-300 px-5 py-10">
                        <h2 className="text-black text-xl font-semibold mb-8">My Orders</h2>
                        {
                            checkOut?.map((item, index) => <OrderCard key={index} details={item} />)
                        }
                        <hr className={"lg:mt-7 mt-3"} />
                        <div className={"flex items-center lg:mt-8 mt-2 justify-between w-full"}>
                            <h2
                                className="w-[263px] text-neutral-500 text-[16px] font-normal  leading-relaxed">Subtotal
                            </h2>
                            <p className="text- text-stone-900 lg:text-lg text-sm font-semibold flex items-center"> {subtotal} &#2547;
                            </p>
                        </div>
                        <div className={"flex items-center mt-3 justify-between"}>
                            <h2
                                className="text-neutral-500 text-[16px] font-normal  leading-relaxed">Shipping
                            </h2>
                            <div className={"flex items-center"}>
                                <div className="text-right text-neutral-400 text-sm font-normal mr-2">
                                </div>
                                <div className="text-right text-stone-900 lg:text-lg text-sm font-semibold "> {shipping} <Taka /></div>
                            </div>
                        </div>

                        <hr className={"lg:mt-7 mt-3"} />
                        <div className={"flex justify-between items-center lg:mt-5 mt-3"}>
                            <div className="text-black lg:text-lg text-base font-medium ">Order Total</div>
                            <h2
                                className="text-right text-orange-500 lg:text-[28px] text-[24px] font-semibold "> <Taka /> {total}
                            </h2>
                        </div>
                        <hr className={"lg:mt-7 mt-3"} />
                        <div className="text-black lg:text-xl text-base font-semibold lg:mt-7 mt-3">Payment</div>

                        <div className={"lg:mt-10 mt-4"}>
                            <div className="flex items-center start mt-5">
                                <input
                                    checked={paymentType === "full"}
                                    type="checkbox" className="checkbox"
                                    onChange={(e) => {
                                        setPaymentType("full")
                                        setAdvanced(total)
                                    }}
                                />
                                <h2 className="text-black lg:text-lg text-base font-normal ml-10">
                                    Mobile Banking (Full Payment)
                                </h2>
                            </div>
                            <div className="flex items-center start mt-5">
                                <input
                                    checked={paymentType === "cod"}
                                    onChange={(e) => {
                                        setPaymentType("cod")
                                        setAdvanced(200)
                                    }}
                                    type="checkbox" className="checkbox" />
                                <div className="text-black lg:text-lg text-base font-normal ml-10">Cash On Delivery <span className='ml-2 text-sm font-semibold'>(200 Taka Advance Pay)</span></div>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            className={"btn btn-primary w-full lg:mt-14 mt-5"}>
                            Place Order
                        </button>
                        <div
                            className=" text-[15px] text-center font-normal mt-5">
                            By placing your order, you agree to our
                            <span className="text-orange-500 font-semibold"> Terms & Conditions</span>
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
                className="input input-sm lg:input-md input-bordered w-full" />
        </label>
    </div>
}
