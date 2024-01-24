import { localURL } from "@/Components/instance/api";
import Link from "next/link";
import React from "react";

const FlashSaleCard = ({ data }) => {
  return (
    <Link href={`/products/${data?._id}`} className="lg:max-w-[448px] max-w-[400px]  lg:min-w-[448px] w-full h-[168px] bg-white rounded-[15px] shadow-xl flex items-center px-5">
      <div
        className="h-full lg:min-w-[117px] min-w-[90px] max-w-[100px] lg:max-w-[120px] max-h-[139px] bg-gray-300 rounded-xl"
        style={{
          backgroundImage:
            `url('${localURL + data?.cover}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="p-2 ml-3 flex flex-col justify-between h-full py-5">
        <h2 className=" text-black text-base font-medium">
          {data?.name?.slice(
            0,
            60
          )}
        </h2>
        <div className="pb-2 mt-4 flex justify-between items-center">
          <div className="text-orange-500 text-xl mt-1 font-semibold">
            $33.3
          </div>
          <div className="text-neutral-400 text-base font-normal ">24 left</div>
        </div>
        <progress title={`Avaiable 24 From 100`} value={24} max={100} className="bg-primary text-primary w-full h-3 rounded-xl overflow-hidden" />
      </div>
    </Link>
  );
};

export default FlashSaleCard;
