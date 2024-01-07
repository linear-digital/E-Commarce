import { Star } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const ProductSM = () => {
  return (
    <div className="flex h-[139px] cursor-pointer">
      <div className="h-full min-w-[120px] bg-gray-300 rounded-xl"
      style={{
        backgroundImage: "url('https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/6/4/6447411cv17d.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >

      </div>
      <div className="p-2 ml-3 flex flex-col justify-between">
        <h2 className=" text-black text-base font-medium">
        {
          "Anker 20W USB Type C Travel Fast Charger (PD Nano 20W) A2634P22".slice(0, 60)
        }
        </h2>
        <div className="pb-2">
          <div className="text-orange-500 text-xl mt-1 font-semibold">$33.3</div>
          <div className="mt-1 flex items-center">
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
            <span className="ml-2">(26)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSM;
