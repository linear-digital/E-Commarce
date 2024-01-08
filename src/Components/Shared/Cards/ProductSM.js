import { Star } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import StarProvider from "../StarProvider";

const ProductSM = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-[139px] h-auto cursor-pointer">
      <div className="h-full lg:max-h-[139px] min-h-[139px] max-h-[80px] min-w-[60px] lg:min-w-[120px] bg-gray-300 rounded-xl"
      style={{
        backgroundImage: "url('https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/6/4/6447411cv17d.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >
      </div>
      <div className="p-2 ml-3 flex flex-col lg:justify-between">
      <div className="text-orange-500 text-center mb-2 block lg:hidden text-xl mt-1 font-semibold">$33.3</div>
        <h2 className=" text-black text-sm lg:text-base font-medium">
        {
          "Anker 20W USB Type C Travel Fast Charger (PD Nano 20W) A2634P22".slice(0, 60)
        }
        </h2>
        <div className="pb-2">
          <div className="text-orange-500 text-xl mt-1 hidden lg:block font-semibold">$33.3</div>
          <div className="mt-1 flex items-center">
            <StarProvider number={5}/>
            <span className="ml-2">(26)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSM;
