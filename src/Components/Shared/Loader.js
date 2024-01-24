/*
 * Copyright (c) jan.24.Tamiz
 */

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const page = () => {
    return (
        <div className={"container mx-auto mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10 p-5"}>
            <div>
                <Skeleton height={400} count={1}/>
                <Skeleton height={100}/>
            </div>
            <Skeleton height={50} count={10} />
        </div>
    )
}
export default page