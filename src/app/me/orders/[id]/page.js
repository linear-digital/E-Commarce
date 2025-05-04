
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
    const res = await api.get(`/api/reviews/single/${id}`)
    return res.data
}

const page = async ({ params, data }) => {
    const initOrder = getOrder(params.id)
    const initReview = getReview(params.id)
    const [order, review] = await Promise.all([initOrder, initReview])
    console.log(review)
    return (
        <div className='w-full'>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body px-3 py-5">
                    <div className='flex items-center justify-between'>
                        <h2 className="lg:text-base text-sm">Order ID: {order?.order_id}</h2>
                        <h2 className="lg:text-base text-sm">Total Ammount: <Taka /> {order?.total}</h2>
                    </div>
                    <hr />
                    <div className='lg:py-5 py-2 w-full'>
                        <StepProvider status={order?.status} />
                    </div>
                    <div className='lg:flex items-start justify-between mt-10'>
                        <div className='flex items-center'>
                            <Image src={ order?.order[0]?.image} width={100} height={200} alt='' />
                            <div className='ml-5 flex flex-col justify-start'>
                                <h2 className="lg:text-xl text-base">{order?.order[0]?.product_name}</h2>
                                <h2 className="lg:text-xl text-base mt-2">Quantity: {order?.order[0]?.quantity}</h2>
                                <h2 className="lg:text-xl text-base mt-2">Price: <Taka /> {order?.total}</h2>
                            </div>
                        </div>
                        <div className='flex items-center flex-col mt-5 lg:mt-0'>

                            {
                                review ?
                                    <>
                                    <h2 className='lg:text-2xl text-xl text-primary'>Thanks For  Your Review</h2>
                                    <Link href={`/me/review/${params.id}`} className='btn btn-primary lg:mt-5 mt-2'>View</Link>
                                    </>
                                    :
                                    order?.status === "delivered" && <>
                                        <h2 className='text-2xl text-primary'>Thanks For Order</h2>
                                        <Link className='btn btn-primary mt-5'
                                            href={`/me/review/write/${order?.order_id}`}>Write A Review</Link>
                                    </>
                            }
                        </div>
                    </div>
                    <div className='card my-5 shadow-lg max-w-[400px] p-4'>
                        <h2 className='font-semibold'>Shipping Address</h2>
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