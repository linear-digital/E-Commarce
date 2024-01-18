
import { api, localURL } from '@/Components/instance/api';
import { Taka } from '@/assets/icons';
import Image from 'next/image';
import React from 'react';
import StepProvider from './StepProvider';
import Link from 'next/link';

const getOrder = async (id) => {
    const res = await api.get(`/api/orders/${id}`)

    return res.data
}
const getReview = async (id) => {
    const res = await api.get(`/api/reviews/id/${id}`)
    return res.data
}

const page = async ({ params, data }) => {
    const initOrder = getOrder(params.id)
    const initReview = getReview(params.id)
    const [order, review] = await Promise.all([initOrder, initReview])
    return (
        <div className='w-full'>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-base">Order ID: {order?.order_id}</h2>
                        <h2 className="text-base">Total Ammount: <Taka /> {order?.total}</h2>
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
                                <h2 className="text-xl mt-2">Price: <Taka /> {order?.total}</h2>
                            </div>
                        </div>
                        <div className='flex items-center flex-col'>

                            {
                                review ?
                                    <>
                                    <h1 className='text-2xl text-primary'>Thanks For  Your Review</h1>
                                    <Link href={`/me/review/${params.id}`} className='btn btn-primary mt-5'>View</Link>
                                    </>
                                    :
                                    order?.status === "delivered" && <>
                                        <h1 className='text-2xl text-primary'>Thanks For Order</h1>
                                        <Link className='btn btn-primary mt-5'
                                            href={`/me/review/write/${order?._id}`}>Write A Review</Link>
                                    </>
                            }
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
    );
};

export default page;