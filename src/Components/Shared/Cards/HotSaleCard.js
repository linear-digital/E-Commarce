import { localURL } from "@/Components/instance/api";
import { Taka } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HotSaleCard = ({ data }) => {
  return (
    <Link href={`/products/${data?._id}`} className="lg:max-w-[273px] max-w-[170px] max-h-[600px]  lg:min-w-[273px] lg:min-h-[600px] pb-4  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="lg:max-h-[266px] max-h-[160px] w-full rounded-[20px]  shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center">
        <Image
          className="lg:max-w-[273px] max-w-[130px] w-full lg:h-[266px] h-[150px]"
          src={localURL + data?.cover}
          width={348}
          height={314}
          alt={""}
        />
      </div>

      <div className="flex flex-col items-center lg:p-7 p-2">
        <div className="text-orange-500 lg:text-2xl text-base font-semibold text-center">
          <Taka /> {data?.price - (data?.discount_percentage / 100 * data?.price)}
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          <del><Taka /> {data?.price}</del>
        </div>
        <div className="lg:mt-5 mt-2 text-center text-black text-sm lg:text-xl font-semibold ">
          {data?.name?.slice(0, 25) + " " + "..."}
        </div>
        <progress
          title={`Avaiable 24 From 100`}
          value={24}
          max={100}
          className="bg-primary text-primary w-full h-3 rounded-md overflow-hidden lg:mt-5 mt-3 hidden"
        />
        <button className="btn border-primary text-primary lg:mt-6 mt-3 border-2 w-full">
          Add To Cart
        </button>
      </div>
    </Link>
  );
};

export default HotSaleCard;
