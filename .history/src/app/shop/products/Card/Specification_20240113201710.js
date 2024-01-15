import React from 'react'

const Specification = ({data}) => {
    console.log(data)

    return (
        <div className={"mt-10 shadow-xl px-5 pt-5 pb-10 w-full rounded"}>
            <h1 className={"text-2xl font-semibold"}>Specification</h1>

            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Features</h2>
            </div>
            <div className={"pl-4 mt-5"}>
                {
                    data?.map((dt , key)=> (
                        <FeatureCard
                            key={key}
                            name={dt.key}
                            value={dt.value}
                        />
                        ))
                }


            </div>


        </div>
    )
}
export default Specification

const FeatureCard = ({name, value}) => {
    return <div className={"grid grid-cols-5 mt-2 border-b pb-2 px-1"}>
        <div className={"col-span-1"}>
            <h2 className={"text-[14px] text-gray-700"}>{name}</h2>
        </div>
        <div className={"col-span-2"}>
            <h2 className={"text-[14px] text-gray-900"}>
                {value}
            </h2>

        </div>
    </div>
}
