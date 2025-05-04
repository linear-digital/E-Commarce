/*
 * Copyright (c) 9.1.24.Tamiz
 */

import React from 'react'

const Description = ({data}) => {
    return (
        <div className={"w-full shadow-xl p-5"}>
            <h2 className={"text-2xl font-semibold"}>Description</h2>
            <p className='mt-5 text-sm'>
                {data?.productDescription}
            </p>
            <div className={"p-2 mt-5"}>
                {
                   data?.descriptions?.map((dt , index) => (
                       <Card key={index} title={dt.key} desc={dt.value}/>
                   ))
                }


            </div>
        </div>
    )
}
export default Description

const Card = ({title , desc}) => {
    return <div className={"mt-3"}>
        <h2 className={"text-xl font-semibold"}>
            {title}
        </h2>
        <p className={"mt-1 text-[15px]"}>
            {desc}
        </p>
    </div>
}
