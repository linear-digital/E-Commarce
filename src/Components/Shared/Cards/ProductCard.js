'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { localURL } from "@/Components/instance/api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Link from "next/link";

const ProductCard = ({ type, data }) => {
    const router = useRouter()
    const [price, setPrice] = useState(0)
    const handleClick = () => {
        router.push(`/products/${data._id}`)
    }
    useEffect(() => {
        setPrice(
            data?.price - (data?.discount_percentage / 100 * data?.price)
        )
    }, [data]);


    return (
        <div onClick={handleClick}>
            {
                type === "list" ?
                    <div className="pb-4 cursor-pointer max-h-[180px]  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100 flex items-center w-full">
                        <div onClick={handleClick} className="min-w-[150px] max-w-[200px] h-full shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center p-5 relative"
                        >
                            <Image
                                className="w-full h-[160px] rounded-md object-cover"
                                src={localURL + data?.cover}
                                width={548}
                                height={314}
                                alt=""
                            />
                            {
                                !data?.inStock && <button className="text-red-500 absolute bottom-0 left-2 text-sm font-semibold">Stock Out</button>
                            }
                        </div>

                        <div className="flex flex-col items-center lg:p-7 p-2">
                            <div onClick={handleClick} className="text-orange-500 lg:text-base text-base font-semibold text-center">
                                ৳{price}
                            </div>
                            <div onClick={handleClick} className="text-neutral-400 text-sm font-normal text-center mt-1">
                                <del>৳{data?.price}</del>
                            </div>
                            <div onClick={handleClick} className="mt-1 text-center text-black text-sm lg:text-[13px] font-semibold ">
                                {data?.name.slice(0, 50)}...
                            </div>
                            <Link href={`/products/${data._id}`} className="btn border-primary btn-sm text-sm text-primary lg:mt-2 mt-3 border-2 w-full">
                                Add To Cart
                            </Link>
                        </div>
                    </div>
                    :
                    <div className="lg:max-w-[100%] cursor-pointer max-w-[170px] max-h-auto  lg:min-w-[100%] lg:min-h-[420px] pb-4  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100">

                        <div onClick={handleClick} className="lg:max-h-[260px] lg:min-w-[243px] max-w-[273px] w-full min-h-[10px]  max-h-[170px] shadow-xl shadow-stone-50 rounded-md overflow-hidden flex justify-center items-center p-5 "
                        >
                            <Image
                                className="lg:max-w-[273px] w-full  lg:min-w-[243px]  max-h-[200px] lg:max-h-[100%] rounded-md object-cover"
                                src={localURL + data?.cover}
                                width={428}
                                height={240}
                                alt=""
                            />

                        </div>

                        <div className="flex flex-col items-center lg:p-5 p-2 relative">
                            {
                                !data?.inStock && <button className="text-red-500 absolute top-5 left-2 text-sm font-semibold">Stock Out</button>
                            }
                            <div onClick={handleClick} className="text-orange-500 lg:text-xl text-base font-semibold text-center">
                                ৳{price}
                            </div>
                            <div onClick={handleClick}
                                className="text-neutral-400 text-base font-normal text-center mt-1">
                                <del>৳{data?.price}</del>
                            </div>
                            <div onClick={handleClick} className="lg:mt-5 mt-2 text-center text-black text-sm lg:text-base font-semibold ">
                                {data?.name.slice(0, 30)}...
                            </div>
                            <Link href={`/products/${data._id}`} className="btn border-primary text-sm text-primary lg:mt-4 mt-3 border-2 w-full">
                                Add To Cart
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ProductCard;
