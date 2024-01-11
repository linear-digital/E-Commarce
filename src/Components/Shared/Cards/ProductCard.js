'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

const ProductCard = ({ type }) => {
    const router = useRouter()
    const handleClick = () => {
        router.push('/products/13434')
    }
    return (
        <>
            {
                type === "list" ?
                    <div className="pb-4 cursor-pointer max-h-[160px]  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100 flex items-center">
                        <div onClick={handleClick} className="w-[200px] h-full shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center p-5"
                            style={{
                                backgroundImage: `url("https://dropshop.com.bd/wp-content/uploads/2023/09/SIM-Supported-Kids-Smart-Watch-Smart2023-C005-Pink-Color.jpg")`,
                            }}
                        >
                            <Image
                                className="w-[170px] h-[120px]"
                                src={
                                    "https://dropshop.com.bd/wp-content/uploads/2023/12/Fantech-P51.webp"
                                }
                                width={548}
                                height={314}
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col items-center lg:p-7 p-2">
                            <div onClick={handleClick} className="text-orange-500 lg:text-base text-base font-semibold text-center">
                                $1,245.33
                            </div>
                            <div onClick={handleClick} className="text-neutral-400 text-sm font-normal text-center mt-1">
                                <del>$1,300</del>
                            </div>
                            <div onClick={handleClick} className="mt-1 text-center text-black text-sm lg:text-[13px] font-semibold ">
                                Digital Camera <br /> XF-21
                            </div>
                            <button className="btn border-primary btn-sm text-sm text-primary lg:mt-2 mt-3 border-2 w-full">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    :
                    <div className="lg:max-w-[273px] cursor-pointer max-w-[170px] max-h-[430px]  lg:min-w-[273px] lg:min-h-[420px] pb-4  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100">

                        <div onClick={handleClick} className="max-w-[273px] max-h-[180px] min-w-[273px] min-h-[180px] shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center p-5"
                            style={{
                                backgroundImage: `url("https://dropshop.com.bd/wp-content/uploads/2023/09/SIM-Supported-Kids-Smart-Watch-Smart2023-C005-Pink-Color.jpg")`,
                            }}
                        >
                            <Image
                                className="lg:max-w-[273px] max-w-[130px] w-full lg:h-[200px] h-[180px]"
                                src={
                                    "https://dropshop.com.bd/wp-content/uploads/2023/12/Fantech-P51.webp"
                                }
                                width={548}
                                height={314}
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col items-center lg:p-7 p-2">
                            <div onClick={handleClick} className="text-orange-500 lg:text-xl text-base font-semibold text-center">
                                $1,245.33
                            </div>
                            <div onClick={handleClick} className="text-neutral-400 text-base font-normal text-center mt-1">
                                <del>$1,300</del>
                            </div>
                            <div onClick={handleClick} className="lg:mt-5 mt-2 text-center text-black text-sm lg:text-base font-semibold ">
                                Digital Camera <br /> XF-21
                            </div>
                            <button className="btn border-primary text-sm text-primary lg:mt-4 mt-3 border-2 w-full">
                                Add To Cart
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default ProductCard;
