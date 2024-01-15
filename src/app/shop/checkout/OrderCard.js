/*
 * Copyright (c) $today.year.Tamiz
 */

import { Taka } from '@/assets/icons';
import React from 'react'

const OrderCard = ({details}) => {
    return (
        <div className={"mt-3 flex items-center justify-between w-full"}>
            <div className="text-stone-900 text-base font-semibold mr-2">{details?.quantity}x</div>
            <div className="text-neutral-500 text-sm font-normal leading-relaxed flex items-center">
                {details?.product_name} <span className='text-xs px-1'> ➡️</span>  <strong> ({ details?.variant})</strong>
            </div>
            <div className="text-right text-stone-900 text-lg font-semibold flex items-center">
                <Taka /> {details?.price_total}</div>
        </div>
    )
}
export default OrderCard
