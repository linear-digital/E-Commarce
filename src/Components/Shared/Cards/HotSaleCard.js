import Image from "next/image";
import React from "react";

const HotSaleCard = () => {
  return (
    <div className="w-full h-full max-w-[273px] max-h-[600px]  min-w-[273px] min-h-[600px]  bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="max-h-[266px] w-full rounded-[30px]  shadow-xl shadow-stone-50 overflow-hidden">
        <Image
          className="max-w-[273px] w-full h-[266px]"
          src={
            "https://www.newsshooter.com/wp-content/uploads/2021/08/Image-4-740x555.jpg"
          }
          width={348}
          height={314}
        />
      </div>

      <div className="flex flex-col items-center p-7">
        <div className="text-orange-500 text-2xl font-semibold text-center">
          $1,245.33
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          $1,300
        </div>
        <div className="mt-5 text-center text-black text-xl font-semibold ">
          Digital Camera <br/> XF-21
        </div>
        <progress title={`Avaiable 24 From 100`} value={24} max={100} className="bg-primary text-primary w-full h-3 rounded-md overflow-hidden mt-5"/>
        <div className="text-neutral-400 text-base font-normal mt-4">56 Left Stock</div>
        <button className="btn border-primary text-primary mt-6 border-2 w-full">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default HotSaleCard;
