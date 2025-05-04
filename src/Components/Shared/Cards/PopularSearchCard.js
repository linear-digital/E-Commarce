'use client';
import { Taka } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";

export const PopularSearchCard = ({ data }) => {
  return (
    <Link href={`/products/${data?._id}`} className="w-full h-full max-h-[463px] max-w-[273px] bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="lg:max-h-[266px] max-h-[150px] w-full rounded-[30px]  shadow-xl shadow-stone-50 overflow-hidden">
        <Image
          className="max-w-[348px] w-full min-h-[314px] object-cover"
          src={ data?.cover}
          width={348}
          height={314}
          alt=""
        />
      </div>

      <div className="flex flex-col lg:p-7 p-4">
        <div className="text-[#e30613] lg:text-2xl text-xl font-semibold text-center">
          <Taka /> {data?.price - (data?.discount_percentage / 100 * data?.price)}
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          <del><Taka /> {data?.price}</del>
        </div>
        <h2 className="text-center lg:mt-3 mt-2 text-black lg:text-xl text-sm font-semibold ">
          {data?.name?.slice(0, 30) + " " + "..."}
        </h2>
      </div>
    </Link>
  );
};
