/*
 * Copyright (c) 9.1.24.Tamiz
 */

import React from 'react'

const Description = ({data}) => {
    return (
        <div className={"w-full shadow-xl p-5"}>
            <h1 className={"text-2xl font-semibold"}>Description</h1>

            <div className={"p-2 mt-5"}>
                {
                   data?.map((dt , index) => (
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
        <h1 className={"text-xl font-semibold"}>
            {title}
        </h1>
        <p className={"mt-1 text-[15px]"}>
            {desc}
        </p>
    </div>
}
