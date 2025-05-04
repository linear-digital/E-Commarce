import { api, localURL } from '@/Components/instance/api';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
const getReview = async (id) => {
    const res = await api.get(`/api/reviews/id/${id}`)
    return res.data
}
const page = async ({ params }) => {
    const id = params.id
    const rev = getReview(id)
    const [review] = await Promise.all([rev])
    return (
        <div>
            <>
                <h2 className='text-3xl font-bold'>Thanks For Your Review</h2>
                <h2 className='text-xl font-bold'>{review?.order_id}</h2>
                <div>
                    <div className='flex items-center'>
                        <h2 className='text-base font-bold mr-3 mt-2'>Product Ratings:</h2>
                        <Rating
                            className='mt-2'
                            name="simple-controlled"
                            value={review?.ratings}
                        />
                    </div>
                    <div className='flex items-center'>
                        <h2 className='text-base font-bold mr-3 mt-2'>Delivery Ratings:</h2>
                        <Rating
                            className='mt-2'
                            name="simple-controlled"
                            value={review?.deliveryRatings}
                        />
                    </div>
                    <h2 className='text-base mt-2'>Message: {review?.message}</h2>
                    <div className='flex items-center mt-5'>
                        {
                            review?.images?.map((img, index) => <Image
                                width={100}
                                height={100}
                                key={index}
                                src={ img.image}
                                alt={""}
                                className=" rounded-lg mr-2" />)
                        }
                    </div>
                </div>
            </>
        </div>
    );
};

export default page;