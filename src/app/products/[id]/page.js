

'use client'
import StarProvider from '@/Components/Shared/StarProvider';
import { Eye } from '@/assets/icons';
import Image from 'next/image';
import React, { useState } from 'react'
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsStatictic from "@/app/products/Card/ReviewsStatictic";
import Specification from "@/app/products/Card/Specification";
import Description from "@/app/products/Card/Details";
import Reviews from "@/app/products/Card/Reviews";

const link = "https://dropshop.com.bd/wp-content/uploads/2023/11/Fantech-MAXFIT67-MK858-RGB-Pre-Lubed-Gateron-Milky-Yellow-Switch-Mechanical-Hotswap-Keyboard.webp"


const page = () => {
    const swiperParams = {
        navigation: {
            nextEl: ".custom-next-button-details",
            prevEl: ".custom-prev-button-details",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, // Enable clickable pagination bullets
            renderBullet: function (index, className) {
                // Custom pagination bullet content
                return `<span class="${className}"></span>`;
            },
        },
    };

    const [zoom, setZoom] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        const transformValue = `translate(-${x}%, -${y}%) scale(2)`;

        setZoom(true);
        e.target.style.transform = transformValue;
    };

    const handleMouseLeave = (e) => {
        setZoom(false);
        e.target.style.transform = 'none';
    };

    const [currentImage, setCurrentImage] = React.useState('https://dropshop.com.bd/wp-content/uploads/2023/12/Fantech-P51.webp')
    const [activeTab , setActiveTab] = useState("specification")
    return (
        <div>
            <section className='container mx-auto mt-10 shadow-lg pb-5'>
                <div className='grid grid-cols-2'>
                    <div className='flex items-center w-full'>
                        <div className={`image-container relative max-w-[604px] overflow-hidden  bg-stone-100 rounded-md ${zoom ? 'zoomed' : ''}`}
                        // style={{
                        //     backgroundImage: `url(${currentImage})`,
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'center',
                        //     backgroundRepeat: 'no-repeat',
                        //     objectFit: 'cover',
                        // }}
                        >
                            <Image
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}

                                src={currentImage} alt="" width={1280} height={729} />
                        </div>
                        <div className='h-[529px] w-[92px] ml-3 flex items-center justify-center flex-col'>
                            <button className="mb-5 custom-prev-button-details">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M2.08973 11.2307L10 3.32044L17.9103 11.2307" stroke="#949494" strokeWidth={4} />
                                </svg>
                            </button>
                            <Swiper
                                slidesPerView={4}
                                direction='vertical'
                                spaceBetween={30}
                                {...swiperParams}
                                modules={[Navigation]}
                                className="w-full"
                            >
                                <SwiperSlide>
                                    <Thumb setCurremtImage={setCurrentImage} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Thumb setCurremtImage={setCurrentImage} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Thumb setCurremtImage={setCurrentImage} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Thumb setCurremtImage={setCurrentImage} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Thumb setCurremtImage={setCurrentImage} />
                                </SwiperSlide>
                            </Swiper>
                            <button className="mt-5 custom-next-button-details">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19} viewBox="0 0 20 19" fill="none">
                                    <path d="M2.08973 8.2307L10 16.141L17.9103 8.2307" stroke="#FF7020" strokeWidth={4} />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-5 w-full">
                        <h1 className="text-black text-[26px] font-semibold ">LED Monitor With High Quality In The World</h1>
                        <div className="mt-4 flex item-center">
                            <h5 className="text-orange-500 text-lg font-extrabold">4.0</h5>
                            <span className='ml-3 mt-[5px]'>
                                <StarProvider number={5} />
                            </span>
                            <span className="text-zinc-400 text-lg font-normal">(223)</span>
                            <div className="w-0.5 h-[31px] bg-zinc-100 rounded-[22px] mx-3" />
                            <h2><span className="text-neutral-900 text-lg font-bold ">4,320</span><span className="text-neutral-900 text-lg font-normal "> Sold</span></h2>
                            <div className="w-0.5 h-[31px] bg-zinc-100 rounded-[22px] mx-3" />
                            <span className='mt-[5px]'>
                                <Eye />
                            </span>
                            <div className="ml-4"><span className="text-neutral-900 text-lg font-bold">1,4k </span><span className="text-neutral-900 text-lg font-normal ">Viewed</span></div>
                        </div>
                        <div className="flex justify-between mt-10">
                            <div className=' flex item-center'>
                                <h1 className="text-orange-500 text-4xl font-semibold ">$976.33</h1>
                                <div className="text-neutral-400 text-xl font-normal ml-4 mt-3">
                                    <del>$1,020.99</del>
                                </div>
                                <button className='bg-green-500 text-white mt-2 text-xs w-[45px] rounded-lg h-[26px] font-semibold ml-4'>20%</button>

                            </div>
                            <Image src={'/images/store.png'} width={120} height={30} alt={""}/>
                        </div>
                        <div className="w-[100%] h-px bg-gray-200 mt-10" />

                        <div className={'mt-5'} >
                            <p className="w-[637px] text-black text-lg font-normal leading-[30px]">Lorem
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam
                            </p>
                            <h1 className={'mt-3 text-xl'}>Key Features</h1>
                            <ul className={'list-disc mt-2 ml-5'}>
                                <li>
                                    Model: Leviosa MCX01
                                </li>
                                <li>
                                    POP Filter & Foldable Tripod Included
                                </li>
                                <li>
                                    RGB Illumination, USB Interface
                                </li>
                                <li>
                                    Cardioid Polar Pattern
                                </li>
                                <li>
                                    Frequency response: 20Hz-20kHz
                                </li>
                            </ul>
                            <div className={"py-2"}>
                                <a href={"#specification"} className={" btn-link text-primary "}>More Specification</a>
                            </div>
                            <div className={"flex items-center mt-8"} id={"specification"} >
                            <h1 className={"text-xl-center font-semibold"}>Variants : </h1>
                                <div className={"ml-4"}>
                                    <button className={"btn bg-black text-white"}>Black</button>
                                    <button className={"btn bg-[red] ml-3 text-white"}>Red</button>
                                </div>
                            </div>
                            <div className={"mt-7"}>
                                <button className={"btn btn-primary w-[200px] "}>
                                    Buy Now
                                </button>
                                <button className={"btn btn-primary ml-10 w-[200px] "}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'container mx-auto mt-20'} >
                <div className={"flex items-start"}>
                    <div className="w-[375px] min-w-[375px] h-[824px] bg-orange-500 rounded-xl">
                    <ReviewsStatictic />
                    </div>
                    <section className={"ml-10 w-full"}>
                        <div className={"flex items-center "}>
                            <button onClick={() => setActiveTab("specification")}
                                    className={`btn ${activeTab === "specification" ? "btn-primary" : "btn-ghost"} `}>
                                Specification
                            </button>
                            <button onClick={() => setActiveTab("description")}
                                    className={`btn ml-5 ${activeTab === "description" ? "btn-primary" : "btn-ghost"} `}>
                                Description
                            </button>
                            <button onClick={() => setActiveTab("review")}
                                    className={`btn ml-5 ${activeTab === "review" ? "btn-primary" : "btn-ghost"} `}>
                                Reviews
                            </button>
                        </div>
                        <div>
                            {
                                activeTab === "specification" && <Specification />
                            }
                            {
                                activeTab === "description" && <Description />
                            }{
                                activeTab === "review" && <Reviews />
                            }
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default page
const Thumb = ({setCurremtImage}) => {
    return (
        <div onClick={() => setCurremtImage(link)}
             className="w-full cursor-pointer h-[92px] bg-stone-100 rounded-md mb-3">
            <Image src={link} alt="" width={92} height={92} />
        </div>
    )
}