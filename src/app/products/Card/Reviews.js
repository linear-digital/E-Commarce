import React, { useState } from 'react'
import StarProvider from "@/Components/Shared/StarProvider";
import Image from "next/image";
import moment from 'moment';
import { localURL } from '@/Components/instance/api';

const Reviews = ({ reviews }) => {
    return (
        <div className={"p-5"}>
            <h2 className={"py-5 text-xl"}>
                {
                    reviews.length > 1 ? `${reviews.length} Reviews` : `No Review`
                }
            </h2>
            {
                reviews.map((d, index) => {
                    return <Card data={d} key={index} />
                })
            }
        </div>
    )
}
export default Reviews

const Card = ({ data }) => {
    const [image, setImage] = useState("")
    const handleClick = (link) => {
        setImage(link || "")
    }
    return (
        <div className={"w-full mb-4"}>
            <div className={"flex items-start w-full flex-col"}>
                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex items-center"}>
                        <StarProvider number={data.ratings} color={""} size={13} />
                        <h4 className={"text-sm mt-1 ml-2"}>{data.name}</h4>
                    </div>
                    <div>
                        <h5 className={"text-xs text-gray-500"}>
                            {moment(data.createdAt).startOf('day').fromNow()}
                        </h5>
                    </div>
                </div>

                <p className={"text-sm text-start mt-3"}>
                    {data.message}
                </p>

                <div className={"flex justify-start w-full mt-3"}>
                    {
                        data.images.map((img, index) => {
                            return <div key={index} onClick={() => {
                                handleClick( img.image)
                            }}>
                                <Image
                                    className={"mr-3 max-h-[90px] max-w-[80px] rounded-sm"}
                                    width={80}
                                    height={40}
                                    src={ img.image}
                                    alt={""}
                                />
                            </div>
                        })
                    }

                    {
                        image && <Modal img={image} setImage={setImage} />
                    }
                </div>
            </div>
        </div>
    )
}

const Modal = ({ img, setImage }) => {
    return <dialog id="my_modal_3" className="modal modal-open">
        <div className="modal-box flex justify-center">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => setImage("")} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <Image className={"rounded mt-4"} src={img} alt={""} width={400} height={500} />
        </div>
    </dialog>
}

const dummy = [
    {
        name: "Fahad",
        start: 5,
        message: "অনেক ভালো। যে রকম দেখেছিলাম তেমন ই পেয়েছি। সাউন্ড কোয়ালিটি ও অনেক ভালো পাচ্ছি। ডেলিভারি এত তাড়াতাড়ি দিবে ভাবি ই নাই। অনেকক্ষণ ধরেই বাজাচ্ছি , চার্জ মনে হয় ভালই থাকবে। অনেকে রিভিউ দিয়েছেন 2 টা একসাথে বাজে না। সবার মোবাইলে Mono Audio নামে একটা সেটিংস আছে। সেটা অন করে দিবেন + Left / Right bar টা মিডল এ রাখবেন। 2 টা একসাথে বাজবে। ধন্যবাদ সেলার ভাই কে।",
        images: [
            "https://sg-test-11.slatic.net/other/roc/7f71950f1edf5ec6663d0d702a53ad96.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/915bc35397191a1a6784cd5d80918fb8.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/62fd1136932e8b7214b92385ad122da0.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/1bcbe5e5485cf521c168b24a75633b40.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/427907ad0c078dffadf7d57b89276bcd.jpg_500x500.jpg_.webp"
        ]
    }, {
        name: "Sharmita",
        start: 5,
        message: "Vai ostir akta earbud🥰🥰😍😍. Vai atar je sound quality tar bepar ar bolam na ostirrr!!!!🔥🔥🔥Ar build quality tik thak bola jai.... Ar kao jodi gaming er jono nite chan tahole ater ceye aktu better paben tar mne tai noi je ata vlo hobe na low budget e atai sob ceye best earbud I have seen.... atai high level gaming expect kora jai na..... to be honest atate game kelar somoi halka atkate pare.... I will give this 9/10... Total cost 380. Thanks daraz and sellar for this product 🔥🔥😍😍🥰🥰....",
        images: [
            "https://sg-test-11.slatic.net/other/roc/9ad29482e0e96b0a4c465f052e802a0e.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/08b56c59a67fb9975a818617a7ff5b28.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/5b6d6e066ce49bdd2513905de37bf85a.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/1bcbe5e5485cf521c168b24a75633b40.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/427907ad0c078dffadf7d57b89276bcd.jpg_500x500.jpg_.webp"
        ]
    }, {
        name: "Mr. Kashem",
        start: 5,
        message: "ডেলিভারি ডেটের আগেই পেয়েছি। পণ্যটি পাওয়ার পরেই চাক করে দেখলাম এক কানেরটা চলে আরেক কানেরটা চলে না। একটু পর আবার চেক করে দেখলাম এবার অন্যটা চলে আগেরটা চলে না। পরে বাসায় এসে চার্জ দেওয়ার পর দেখি অসম্ভব লেভেলের সাউন্ড, টাচ কুয়ালিটি। একদম অরিজিনালটার মতো। এত কম দামে এই পণ্যটি খুব ভালো। আসল্টা কিনতে হলে অবশ্যই হাজার টাকা খরচ করতে হবে। কিন্তু তা না করে এটা কিনলে অবশ্যই আপনি জিতবেন। কিনে দেখেন ইনশাআল্লাহ ভালো লাগবে।❤️❤️\n",
        images: [
            "https://sg-test-11.slatic.net/other/roc/b48ed0e931c35325d4d71094f3f7d9df.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/10c1d7c6a0f70d0c41dcf008fa06381f.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/dd131ea391f2d2d24a23ae2debfd433c.jpg_500x500.jpg_.webp",
            "https://sg-test-11.slatic.net/other/roc/6d8008d1cb321b5e63475b8056cb7bd3.jpg_500x500.jpg_.webp",
        ]
    }
]