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
                <h1 className='text-3xl font-bold'>Thanks For Your Review</h1>
                <h1 className='text-xl font-bold'>{review?.order_id}</h1>
                <div>
                    <div className='flex items-center'>
                        <h1 className='text-base font-bold mr-3 mt-2'>Product Ratings:</h1>
                        <Rating
                            className='mt-2'
                            name="simple-controlled"
                            value={review?.ratings}
                        />
                    </div>
                    <div className='flex items-center'>
                        <h1 className='text-base font-bold mr-3 mt-2'>Delivery Ratings:</h1>
                        <Rating
                            className='mt-2'
                            name="simple-controlled"
                            value={review?.deliveryRatings}
                        />
                    </div>
                    <h1 className='text-base mt-2'>Message: {review?.message}</h1>
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
        </div>
    );
};

export default page;