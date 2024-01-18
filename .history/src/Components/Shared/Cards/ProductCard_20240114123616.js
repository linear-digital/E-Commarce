'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import React, {useEffect, useState} from "react";
import {localURL} from "@/Components/instance/api";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";

const ProductCard = ({ type , data }) => {
    const {currentUser} = useSelector(state => state.User)
    const router = useRouter()
    const [price , setPrice] = useState(0)
    const handleClick = () => {
        router.push(`/products/${data._id}`)
    }
    useEffect(() => {
        setPrice(
            data?.price -  (data?.discount_percentage / 100 * data?.price)
        )
    }, [data]);
    
    const addToCart = () => {
        const cartItem = {
            email: currentUser?.email,
            product_id: data._id,
            data,
            variant: data || data?.variant[0],
            price,
        };
        const old = localStorage.getItem("cart");
        const old_cart = JSON.parse(old);
        const isExist =
            old_cart?.filter(
                (dt) =>
                    dt?.product_id === data?._id && dt?.email === currentUser?.email
            )?.length > 0;
        if(!isExist){
            if (old) {
                const new_cart = [...old_cart, cartItem];
                localStorage.setItem("cart", JSON.stringify(new_cart));
                router.push('/cart')
            } else {
                const new_cart = [cartItem];
                localStorage.setItem("cart", JSON.stringify(new_cart));
                router.push('/cart')
            }
        }
        else{
            toast.error("This Product Already Added On Cart")
            router.push('/cart')

        }
    };
    return (
        <>
            {
                type === "list" ?
                    <div className="pb-4 cursor-pointer max-h-[180px]  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100 flex items-center">
                        <div onClick={handleClick} className="w-[200px] h-full shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center p-5"
                        >
                            <Image
                                className="w-[170px] h-[150px]"
                                src={localURL+data?.cover}
                                width={548}
                                height={314}
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col items-center lg:p-7 p-2">
                            <div onClick={handleClick} className="text-orange-500 lg:text-base text-base font-semibold text-center">
                                ৳{price}
                            </div>
                            <div onClick={handleClick} className="text-neutral-400 text-sm font-normal text-center mt-1">
                                <del>৳{data?.price}</del>
                            </div>
                            <div onClick={handleClick} className="mt-1 text-center text-black text-sm lg:text-[13px] font-semibold ">
                                {data?.name}
                            </div>
                            <button className="btn border-primary btn-sm text-sm text-primary lg:mt-2 mt-3 border-2 w-full">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    :
                    <div className="lg:max-w-[273px] cursor-pointer max-w-[170px] max-h-[430px]  lg:min-w-[273px] lg:min-h-[420px] pb-4  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100">

                        <div onClick={handleClick} className="max-w-[273px] max-h-[200px] min-w-[273px] min-h-[180px] shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center p-5"
                        >
                            <Image
                                className="w-full h-[180px]"
                                src={localURL+data?.cover}
                                width={248}
                                height={214}
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col items-center lg:p-7 p-2">
                            <div onClick={handleClick} className="text-orange-500 lg:text-xl text-base font-semibold text-center">
                                ৳{price}
                            </div>
                            <div onClick={handleClick}
                                 className="text-neutral-400 text-base font-normal text-center mt-1">
                                <del>৳{data?.price}</del>
                            </div>
                            <div onClick={handleClick} className="lg:mt-5 mt-2 text-center text-black text-sm lg:text-base font-semibold ">
                                {data?.name}
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
