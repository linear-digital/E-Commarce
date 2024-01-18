'use client'

import { api, localURL } from '@/Components/instance/api';
import Image from 'next/image';
import React from 'react';
import StepProvider from '../me/orders/[id]/StepProvider';

const page = () => {
    const [order, setOrder] = React.useState({})
    const trackOrder = async (e) => {
        e.preventDefault()
        const order_id = e.target.order_id.value
        const email = e.target.email.value
        try {
            setOrder({})
            const res = await api.post(`/api/orders/track`, { order_id, email })
            setOrder(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container mx-auto py-10'>
            <h1 className='text-3xl font-semibold text-center'>Orders Tracking</h1>
            <p className='max-w-[500px] mt-5 mx-auto text-center'>
                To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
            </p>
            <form onSubmit={trackOrder} className='flex flex-col items-center'>
                <div className='mx-auto flex justify-center w-full gap-10 mt-5'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Order Id</span>
                        </div>
                        <input required type="text" placeholder="Check Your dashboard Or Mail for Order id" className="input input-bordered w-full max-w-xs text-sm"
                            name='order_id'
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Billing Email</span>
                        </div>
                        <input required type="email" placeholder="Email That you used while checking out" className="input input-bordered w-full max-w-xs text-sm"
                            name='email'
                        />
                    </label>
                </div>
                <button className='btn btn-primary mt-5'>Track Order</button>
            </form>

            {
                order.order_id &&
                <section>
                    <div className='w-full'>
                        <div className="card w-full bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className='flex items-center justify-between'>
                                    <h2 className="text-base">Order ID: {order?.order_id}</h2>
                                </div>
                                <hr />
                                <div className='py-5 w-full'>
                                    <StepProvider status={order?.status} />
                                </div>
                                <div className='flex items-start justify-between mt-10'>
                                    <div className='flex items-center'>
                                        <Image src={localURL + order?.order[0]?.image} width={100} height={200} alt='' />
                                        <div className='ml-5 flex flex-col justify-start'>
                                            <h2 className="text-xl">{order?.order[0]?.product_name}</h2>
                                            <h2 className="text-xl mt-2">Quantity: {order?.order[0]?.quantity}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='card my-5 shadow-lg max-w-[400px] p-4'>
                                    <h1 className='font-semibold'>Shipping Address</h1>
                                    <div className='mt-2'>
                                        <p>{order?.address?.name}</p>
                                        <p>{order?.address?.phone}</p>
                                        <p>{order?.email}</p>
                                        <p>
                                            <mark>
                                                {order?.address?.address}
                                            </mark>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
};

export default page;