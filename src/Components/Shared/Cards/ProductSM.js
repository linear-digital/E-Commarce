import { Star } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const ProductSM = () => {
  return (
    <div className="flex h-[139px]">
      <div className="h-full w-[120px] bg-gray-300 rounded-xl"></div>
      <div className="p-2 ml-2 flex flex-col justify-between">
        <h2 className=" text-black text-base font-medium">
          Fitness and activity Tracker
        </h2>
        <div className="pb-2">
          <div className="text-orange-500 text-xl font-semibold">$33.3</div>
          <div className="mt-2 flex items-center">
            <div className="">
              <Star />
            </div>
            <div className="ml-1">
              <Star />
            </div>
            <div className="ml-1">
              <Star />
            </div>
            <div className="ml-1">
              <Star />
            </div>
            <div className="ml-1">
              <Star />
            </div>
            <span className="ml-2">(16)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSM;
