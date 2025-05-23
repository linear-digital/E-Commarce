'use client'

import { api } from '@/Components/instance/api';
import Image from 'next/image';
import React from 'react';
import StepProvider from '../me/orders/[id]/StepProvider';
import { useSearchParams } from 'next/navigation'


const TrackOrder = () =>
{
    const [order, setOrder] = React.useState({})
    // get email and order_id from search params
    const searchParams = useSearchParams()
    const qEmail = searchParams.get("email") || ""
    const orderId = searchParams.get("order_id") || ""

    const trackOrder = async (e) =>
    {
        e.preventDefault()
        const order_id = orderId || e.target.order_id.value
        const oi = order_id.startsWith("#") ? order_id.slice(1) : order_id
        try {
            setOrder({})
            const res = await api.post(`/api/orders/track`, { order_id: oi })
            setOrder(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container mx-auto py-10 px-3'>
            <h1 className='text-3xl font-semibold text-center'>Orders Tracking</h1>
            <p className='max-w-[500px] mt-5 mx-auto text-center'>
                To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
            </p>
            <form onSubmit={trackOrder} className='flex flex-col items-center w-full'>
                <div className='mx-auto flex flex-col lg:flex-row justify-center w-full lg:gap-10 gap-4 mt-5'>
                    <label className="form-control w-full lg:max-w-xs">
                        <div className="label">
                            <span className="label-text">Order Id</span>
                        </div>
                        <input defaultValue={orderId} required type="text" placeholder="Check Your dashboard Or Mail for Order id" className="input input-bordered w-full max-w-xs text-sm"
                            name='order_id'
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
                                <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm">
                                    <thead className="bg-gray-100 text-left">
                                        <tr>
                                            <th className="px-4 py-2 border-b">Product</th>
                                            <th className="px-4 py-2 border-b">Quantity</th>
                                            <th className="px-4 py-2 border-b">Unit Price</th>
                                            <th className="px-4 py-2 border-b">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.order?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 border-b flex items-center space-x-3">
                                                    <img
                                                        src={item?.image}
                                                        alt={item?.product_name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <span>{item?.product_name}</span>
                                                </td>
                                                <td className="px-4 py-3 border-b">{item?.quantity}</td>
                                                <td className="px-4 py-3 border-b font-medium text-gray-700">৳{item?.price}</td>
                                                <td className="px-4 py-3 border-b font-semibold text-gray-900">৳{item?.price_total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} className="px-4 py-3 border-b font-semibold text-gray-900">Total</td>
                                            <td className="px-4 py-3 border-b font-semibold text-gray-900">৳{order?.total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
};

export default TrackOrder;