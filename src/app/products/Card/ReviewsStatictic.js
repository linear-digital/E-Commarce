
import React from 'react'
import StarProvider from "@/Components/Shared/StarProvider";

const ReviewsStatictic = () => {
    return (
        <div className={"w-full h-full"}>
            <div className={"flex items-center justify-center mt-14"}>
                <div className="text-white text-[100px] font-semibold ">4.0</div>
                <div className="text-white text-opacity-40 text-2xl font-semibold mt-[45px] ml-2">/5</div>
            </div>
            <div className={"flex justify-center"}>
                <StarProvider number={4} color={"white"} size={25}/>
            </div>
            <div className="text-white text-center text-xl font-normal mt-5">223 Reviews</div>

            <div className={"p-7 mt-5"}>
                <div className={"flex items-center justify-between"}>
                    <span><StarProvider number={5} color={"white"} size={14}/></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">186</h3>
                </div>
                <progress
                    value={186}
                    max={223}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={4} color={"white"} size={14}/></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">80</h3>
                </div>
                <progress
                    value={80}
                    max={223}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={3} color={"white"} size={14}/></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">10</h3>
                </div>
                <progress
                    value={10}
                    max={223}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={2} color={"white"} size={14}/></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">2</h3>
                </div>
                <progress
                    value={2}
                    max={223}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={1} color={"white"} size={14}/></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">0</h3>
                </div>
                <progress
                    value={0}
                    max={223}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
            </div>
        </div>
    )
}
export default ReviewsStatictic
