
'use client'

import { api } from '@/Components/instance/api'
import { Taka } from '@/assets/icons'
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
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Order Id</th>
                            <th>Product Name</th>
                            <th>Total</th>
                            <th>Advanced</th>
                            <th>Remaining</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((item, index) => (
                                <tr 
                                onClick={()=> router.push(`/shop/me/orders/${item._id}`)}
                                key={index} className='text-xs cursor-pointer'>
                                    <td>{item.order[0].quantity}x</td>
                                    <td >{item.order_id}</td>
                                    <td>{item.order[0].product_name}</td>
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
                                            item.status === "cancelled" &&
                                            <button className='btn btn-sm text-xs '>Cancelled</button>
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
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <CancelOrderModal user={currentUser} order={order_id} setOrder_id={setOrder_id}/>
            </div>
        </div>
    )
}
export default Page

const CancelOrderModal = ({ user , order , setOrder_id}) => {
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
                            <button onClick={()=> setOrder_id("")} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}