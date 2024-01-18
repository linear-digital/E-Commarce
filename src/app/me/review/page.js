'use client'

import StarProvider from '@/Components/Shared/StarProvider';
import { api, localURL } from '@/Components/instance/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const page = () => {
    const { currentUser } = useSelector(state => state.User)
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        api.get(`/api/reviews/email/${currentUser?.email}`)
            .then(res => setReviews(res.data))
    }, [currentUser])
    return (
        <div >
            <h1 className='text-2xl font-semibold mb-5'>My Reviews</h1>
            <div className='grid grid-cols-3 mt-5'>
                {
                    reviews.map((r, index) => <ReviewCard key={index} review={r} />)
                }
            </div>
        </div>
    );
};

export default page;

const ReviewCard = ({ review }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`/me/review/${review.order_id}`)}
            className='card bg-base-100 shadow-lg p-5' >
            <h1 className='text-base font-semibold mb-2'>
                <strong>Order Id: </strong>
                {review.order_id}</h1>
            <div className='flex items-center'>
                <span className='mr-3'> Product Rating</span>   <StarProvider number={review.ratings} size={13} />
            </div>
            <div className='flex items-center'>
                <span className='mr-3'>Delivery Rating  </span>
                <StarProvider number={review.deliveryRatings} size={13} />
            </div>
            <h1 className='text-base mt-2'>Message: {review.message}</h1>
            <div className='flex items-center flex-wrap mt-5'>
                {
                    review?.images?.map((img, index) => <Image
                        width={70}
                        height={70}
                        key={index}
                        src={localURL + img.image}
                        alt={""}
                        className=" rounded-lg mr-2" />)
                }
            </div>
        </div>
    )
}


