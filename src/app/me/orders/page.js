
'use client'

import { api } from '@/Components/instance/api'
import { Taka } from '@/assets/icons'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'

const Page = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useSelector((state) => state.User)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await api.get(`/api/orders/email/${currentUser?.email}`)
                setOrders(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [currentUser])
    const [order_id, setOrder_id] = useState("")
    const router = useRouter()
    if (loading) {
        return <>
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
        </>
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table table-xs lg:table-sm table-zebra border-collapse w-full hidden lg:block">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Order Id</th>
                            <th>Product Name</th>
                            <th>Time</th>
                            <th>Total</th>
                            <th>Advanced</th>
                            <th>Remaining</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((item, index) => (
                                <tr
                                    key={index}
                                    className='text-xs cursor-pointer '>
                                    <td>{item.order[0].quantity}x</td>
                                    <td >{item.order_id}</td>
                                    <td>{item.order[0].product_name?.slice(0, 40)}...</td>
                                    <td>
                                        {
                                            moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                                        }
                                    </td>
                                    <td className='font-semibold'>
                                        <mark><Taka /> {item.total}</mark>
                                    </td>
                                    <td className='font-semibold'>
                                        <mark><Taka /> {item.advance}</mark>
                                    </td>
                                    <td className='font-semibold'>
                                        <mark><Taka /> {item.remaining}</mark>
                                    </td>
                                    <td>
                                        {
                                            item.status === "pending" &&
                                            <button className='btn btn-sm text-xs btn-pending'>Pending</button>
                                        }{
                                            item.status === "processing" &&
                                            <button className='btn btn-sm text-xs btn-processing'>Processing</button>
                                        }{
                                            item.status === "shipped" &&
                                            <button className='btn btn-sm text-xs btn-shipped'>Shipped</button>
                                        }{
                                            item.status === "delivered" &&
                                            <button className='btn btn-sm text-xs btn-delivered'>Delivered</button>
                                        }{
                                            item.status === "canceled" &&
                                            <button className='btn btn-sm text-xs bg-red-500 text-white'>Canceled</button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                document.getElementById('cancel-modal').showModal()
                                                setOrder_id(item)
                                            }}
                                            disabled={item.status !== "pending"}
                                            className='btn btn-sm'>
                                            Cancel
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => router.push(`/me/orders/${item.order_id}`)}
                                            className='btn btn-primary btn-sm ml-4 text-xs'
                                        >
                                            See Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className='lg:hidden block'>
                    {
                        orders.map((item, index) => (
                            <div key={index} className='card shadow-lg px-2 mb-2 py-3'>
                                <div className='flex items-center justify-between text-sm'>
                                    <h2>{item.order[0].quantity}x</h2>
                                    <h5 >{item.order_id}</h5>
                                </div>
                                <p>{item.order[0].product_name?.slice(0, 40)}...</p>
                                <div className='flex items-center justify-between'>
                                    <h5 className='font-semibold'>
                                        Total :  <mark> {item.total} <Taka /></mark>
                                    </h5>
                                    <h4 className=''>
                                        Paid : <mark>{item.advance} <Taka /> </mark>
                                    </h4>
                                    <h5 className='font-semibold'>
                                        Due  <mark>{item.remaining}<Taka /> </mark>
                                    </h5>
                                </div>
                                <div className='flex items-center justify-between my-3'>
                                    <div>
                                        {
                                            item.status === "pending" &&
                                            <button className='btn btn-sm text-xs btn-pending'>Pending</button>
                                        }{
                                            item.status === "processing" &&
                                            <button className='btn btn-sm text-xs btn-processing'>Processing</button>
                                        }{
                                            item.status === "shipped" &&
                                            <button className='btn btn-sm text-xs btn-shipped'>Shipped</button>
                                        }{
                                            item.status === "delivered" &&
                                            <button className='btn btn-sm text-xs btn-delivered'>Delivered</button>
                                        }{
                                            item.status === "canceled" &&
                                            <button className='btn btn-sm text-xs bg-red-500 text-white'>Canceled</button>
                                        }
                                    </div>
                                    {
                                        item.status !== "delivered" &&
                                        <button
                                            onClick={() => {
                                                document.getElementById('cancel-modal').showModal()
                                                setOrder_id(item)
                                            }}
                                            disabled={item.status !== "pending"}
                                            className='btn btn-sm'>
                                            Cancel
                                        </button>
                                    }
                                    <div>
                                        <button
                                            onClick={() => router.push(`/me/orders/${item.order_id}`)}
                                            className='btn btn-primary btn-sm ml-4 text-xs'
                                        >
                                            See Details
                                        </button>
                                    </div>
                                </div>
                                <p>
                                    {
                                        moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
                <CancelOrderModal user={currentUser} order={order_id} setOrder_id={setOrder_id} />
            </div>
        </div>
    )
}
export default Page

const CancelOrderModal = ({ user, order, setOrder_id }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="cancel-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center text-primary">
                        You Can't Cancel This Order
                    </h3>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Please Contact with us
                    </h3>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => setOrder_id("")} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}