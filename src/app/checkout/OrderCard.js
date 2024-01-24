/*
 * Copyright (c) $today.year.Tamiz
 */

import { Taka } from '@/assets/icons';
import React from 'react'

const OrderCard = ({ details }) => {
    return (
        <div className={"mt-3 flex flex-col w-full"}>
            <div className="text-neutral-500 text-sm font-normal leading-relaxed flex items-center justify-center">
                {details?.product_name} <span className='text-xs px-1'> ➡️</span>  <strong> ({details?.variant})</strong>
            </div>

            <div className='flex justify-center mt-2'>
                <div className="text-stone-900 lg:text-base text-sm font-semibold mr-2">{details?.quantity}x</div>

                <p className="text-right ml-5 text-stone-900 lg:text-lg text-sm font-semibold flex items-center">
                    <small>&#2547;</small> {details?.price_total}</p>
            </div>
        </div>
    )
}
export default OrderCard
