import React from 'react'

const Specification = ({ data }) => {

    return (
        <div className={"lg:mt-10 mt-5 shadow-xl lg:px-5 pt-5 lg:pb-10 pb-5 w-full rounded"}>
            <h1 className={"text-2xl font-semibold "}>Specification</h1>

            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Features</h2>
            </div>
            <div className={"lg:pl-4 pl-1 mt-5"}>
                {
                    data?.map((dt, key) => (
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

const FeatureCard = ({ name, value }) => {
    return <div className={"grid xl:grid-cols-5 lg:grid-cols-5 grid-cols-12 mt-2 border-b pb-2 px-1"}>
        {
            name && <div className={"col-span-4 lg:hidden block"}>
                <h2 className={"text-[14px] text-gray-700"}>{name}</h2>
            </div>
        }
        <div className={"col-span-4 lg:block hidden"}>
                <h2 className={"text-[14px] text-gray-700"}>{name}</h2>
            </div>
        <div className={"col-span-8"}>
            <h2 className={"text-[14px] text-gray-900"}>
                {value}
            </h2>

        </div>
    </div>
}
