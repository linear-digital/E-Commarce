'use client'

import { api, localURL } from '@/Components/instance/api';
import { Rating } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const page = ({ params }) => {
    const id = params.id
    const [order, setOrder] = useState(null)
    const { currentUser } = useSelector(state => state.User)
    const [ratings, setRatings] = useState(5)
    const [deliveryRatings, setDeliveryRatings] = useState(5)
    const [images, setImages] = useState([])
    const [repatch, setRepatch] = useState()
    const writeReview = async (e) => {
        e.preventDefault()
        const message = e.target.message.value
        const newReview = {
            product_id: order?.order[0]?.product_id,
            name: currentUser?.name,
            email: currentUser?.email,
            ratings,
            order_id: order?.order_id,
            message,
            images,
            deliveryRatings
        }
        try {
            const res = await api.post('/api/reviews', newReview)
            if (res.status === 200 || res.status === 201) {
                toast.success("Review Added")
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const uploadImages = async (e) => {
        if (e.target.files.length > 0) {
            const files = e.target.files
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }
            try {
                const res = await axios.post('https://server.linearhub.com/upload-review', formData)
                setImages([...images, ...res.data.images])
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        api.get(`/api/orders/${id}`)
            .then(res => setOrder(res.data))
    }, [currentUser, id])
    const [alrady, setAlrady] = useState(false)
    const [review, setReview] = useState(null)
    useEffect(() => {
        api.get(`/api/reviews/single/${order?.order_id}`)
            .then(res => {
                if (res.data) {
                    setAlrady(true)
                    setReview(res.data)
                }
                else {
                    setAlrady(false)
                }
            })
    }, [order, repatch])
    if (!order) {
        return <h2>Loading...</h2>

    }
    return (
        <div>
            {
                alrady ?
                    <>
                        <h2 className='text-3xl font-bold'>Thanks For Your Review</h2>
                        <div>
                            <div className='flex items-center'>
                                <h2 className='text-base font-bold mr-3 mt-2'>Product Ratings:</h2>
                                <Rating
                                    className='mt-2'
                                    name="simple-controlled"
                                    value={review?.ratings}
                                    onChange={(event, newValue) => {

                                    }}
                                />
                            </div>
                            <div className='flex items-center'>
                                <h2 className='text-base font-bold mr-3 mt-2'>Delivery Ratings:</h2>
                                <Rating
                                    className='mt-2'
                                    name="simple-controlled"
                                    value={review?.deliveryRatings}
                                    onChange={(event, newValue) => {

                                    }}
                                />
                            </div>
                            <h2 className='text-base mt-2'>Message: {review?.message}</h2>
                            <div className='flex items-center mt-5'>
                                {
                                    review?.images?.map((img, index) => <Image
                                        width={100}
                                        height={100}
                                        key={index}
                                        src={localURL + img.image}
                                        alt={""}
                                        className=" rounded-lg mr-2" />)
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h2 className='text-3xl font-bold'>Write Review For</h2>
                        <div className='mt-4'>
                            <Image
                                className='rounded-lg'
                                src={localURL + order?.order[0]?.image} alt={""} width={100} height={100} />
                            <h2 className='text-base mt-3 font-bold'>Product Name: {order?.order[0]?.product_name}</h2>
                        </div>
                        <form onSubmit={writeReview} className='max-w-[500px] flex flex-col'>
                            <div className='flex items-center'>
                                <h2 className='text-base font-bold mr-3 mt-2'>Product Ratings:</h2>
                                <Rating
                                    className='mt-2'
                                    name="simple-controlled"
                                    value={ratings}
                                    onChange={(event, newValue) => {
                                        setRatings(newValue);
                                    }}
                                />
                            </div>
                            <div className='flex items-center'>
                                <h2 className='text-base font-bold mr-3 mt-2'>Delivery Ratings:</h2>
                                <Rating
                                    className='mt-2'
                                    name="simple-controlled"
                                    value={deliveryRatings}
                                    onChange={(event, newValue) => {
                                        setDeliveryRatings(newValue);
                                    }}
                                />
                            </div>
                            <textarea className="textarea textarea-bordered mt-3" placeholder="Message" name="message"></textarea>
                            <div className='flex items-center mt-5'>
                                {
                                    images.map((img, index) => <Image
                                        width={100}
                                        height={100}
                                        key={index}
                                        src={localURL + img.image}
                                        alt={""}
                                        className=" rounded-lg mr-2" />)
                                }
                            </div>
                            <div className="flex w-full items-center justify-center bg-grey-lighter mt-5">
                                <label className="flex w-full flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-500">
                                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className="mt-2 text-base leading-normal">Add Images</span>
                                    <input multiple onChange={uploadImages} type="file" className="hidden" />
                                </label>
                            </div>

                            <div>
                                <button
                                    className="btn btn-primary mt-3">Submit
                                </button>
                            </div>
                        </form>
                    </>
            }
        </div>
    );
};

export default page;