import Image from "next/image";
import React from "react";

const HotSaleCard = () => {
  return (
    <div className="lg:max-w-[273px] max-w-[170px] max-h-[600px]  lg:min-w-[273px] lg:min-h-[600px] pb-4  bg-white rounded-[20px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="lg:max-h-[266px] max-h-[160px] w-full rounded-[20px]  shadow-xl shadow-stone-50 overflow-hidden flex justify-center items-center">
        <Image
          className="lg:max-w-[273px] max-w-[130px] w-full lg:h-[266px] h-[150px]"
          src={
            "https://www.newsshooter.com/wp-content/uploads/2021/08/Image-4-740x555.jpg"
          }
          width={348}
          height={314}
        />
      </div>

      <div className="flex flex-col items-center lg:p-7 p-2">
        <div className="text-orange-500 lg:text-2xl text-base font-semibold text-center">
          $1,245.33
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          <del>$1,300</del>
        </div>
        <div className="lg:mt-5 mt-2 text-center text-black text-sm lg:text-xl font-semibold ">
          Digital Camera <br /> XF-21
        </div>
        <progress
          title={`Avaiable 24 From 100`}
          value={24}
          max={100}
          className="bg-primary text-primary w-full h-3 rounded-md overflow-hidden lg:mt-5 mt-3"
        />
        <div className="text-neutral-400 text-base font-normal mt-4">
          56 Left Stock
        </div>
        <button className="btn border-primary text-primary lg:mt-6 mt-3 border-2 w-full">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default HotSaleCard;
