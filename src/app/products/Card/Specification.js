import React from 'react'

const Specification = () => {
    return (
        <div className={"mt-10 shadow-xl px-5 pt-5 pb-10 w-full rounded"}>
            <h1 className={"text-2xl font-semibold"}>Specification</h1>

            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Main Features</h2>
            </div>
            <div className={"pl-4 mt-5"}>
                <FeatureCard
                    name={"Number Of Keys"}
                    value={40}
                />
                <FeatureCard
                    name={"Connection Type"}
                    value={"Wired/Wireless"}
                />
                <FeatureCard
                    name={"Optical Sensor"}
                    value={"800 / 1200 / 2000 / 2400 / 4800 DPI"}
                />
                <FeatureCard
                    name={"Polling Rate"}
                    value={"250 Hz"}
                />
                <FeatureCard
                    name={"Cable Lenght"}
                    value={"1.5m"}
                />
                <FeatureCard
                    name={"Others"}
                    value={"Tracking Method: Advanced Gaming Optical Sensor\n" +
                        "Lighting: RGB\n" +
                        "Built-in 500mAh Battery"}
                />
            </div>
            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Gaming Features</h2>
            </div>
            <div className={"pl-4 mt-5"}>
                <FeatureCard
                    name={"Switch Lifecycle"}
                    value={"10 Million"}
                />
            </div>
            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Physical Specifications</h2>
            </div>
            <div className={"pl-4 mt-5"}>
                <FeatureCard
                    name={"Dimension"}
                    value={"116 x 68 x 40 mm"}
                />
                <FeatureCard
                    name={"Weight"}
                    value={"84~109g"}
                />
            </div>
            <div className={"mt-5 p-2 rounded bg-stone-50"}>
                <h2 className={"text-base text-primary"}>Warranty Information</h2>
            </div>
            <div className={"pl-4 mt-5"}>
                <FeatureCard
                    name={"Warranty"}
                    value={"01-Year"}
                />
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
