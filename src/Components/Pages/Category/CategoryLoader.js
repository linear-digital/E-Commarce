/*
 * Copyright (c) jan.24.Tamiz
 */

import React from 'react'
import Skeleton from "react-loading-skeleton";

const CategoryLoader = () => {
    return (
        <div className={"max-h-[80vh] grid lg:grid-cols-3 grid-cols-2 w-full gap-5"}>
            <Skeleton height={300}/>
            <Skeleton height={300}/>
            <Skeleton height={300}/>
            <Skeleton height={300}/>
            <Skeleton height={300}/>
            <Skeleton height={300}/>

        </div>
    )
}
export default CategoryLoader