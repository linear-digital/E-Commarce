
import React, { useEffect, useState } from 'react'
import StarProvider from "@/Components/Shared/StarProvider";

const ReviewsStatictic = ({ reviews }) => {
    const [avarage, setAvarage] = useState(0)
    const [total, setTotal] = useState(0)
    const [five, setFive] = useState(0)
    const [four, setFour] = useState(0)
    const [three, setThree] = useState(0)
    const [two, setTwo] = useState(0)
    const [one, setOne] = useState(0)

    useEffect(() => {
        if (reviews.length) {
            setTotal(reviews.length)
            let total = 0
            let fi = 0
            let fo = 0
            let th = 0
            let tw = 0
            let on = 0

            reviews.forEach(r => {
                total += r.ratings
            })
            setAvarage(total / reviews.length)

            reviews.forEach(r => {
                if (r.ratings === 5) setFive(fi + 1)
                if (r.ratings === 4) setFour(fo + 1)
                if (r.ratings === 3) setThree(th + 1)
                if (r.ratings === 2) setTwo(tw + 1)
                if (r.ratings === 1) setOne(on + 1)
            })
        }
    }, [reviews])
    return (
        <div className={"w-full h-full"}>
            <div className={"flex items-center justify-center mt-14"}>
                <div className="text-white text-[100px] font-semibold ">{avarage}</div>
                <div className="text-white text-opacity-40 text-2xl font-semibold mt-[45px] ml-2">/5</div>
            </div>
            <div className={"flex justify-center"}>
                <StarProvider number={Math.floor(avarage)} color={"white"} size={25} />
            </div>
            <div className="text-white text-center text-xl font-normal mt-5">
                {total} Reviews</div>

            <div className={"p-7 mt-5"}>
                <div className={"flex items-center justify-between"}>
                    <span>
                        <StarProvider number={5} color={"white"} size={14} />
                    </span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">{five}</h3>
                </div>
                <progress
                    value={five}
                    max={total}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={4} color={"white"} size={14} /></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">{four}</h3>
                </div>
                <progress
                    value={four}
                    max={total}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={3} color={"white"} size={14} /></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">{three}</h3>
                </div>
                <progress
                    value={three}
                    max={total}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={2} color={"white"} size={14} /></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">{two}</h3>
                </div>
                <progress
                    value={two}
                    max={total}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
                <div className={"flex items-center justify-between mt-8"}>
                    <span><StarProvider number={1} color={"white"} size={14} /></span>
                    <h3 className="text-right text-white text-lg font-normal mt-1">{one}</h3>
                </div>
                <progress
                    value={one}
                    max={total}
                    className="w-full review-progress h-2 rounded-md overflow-hidden lg:mt-2 mt-2"
                />
            </div>
        </div>
    )
}
export default ReviewsStatictic
