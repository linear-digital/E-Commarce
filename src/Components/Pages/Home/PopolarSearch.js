import StarProvider from "@/Components/Shared/StarProvider";
import Image from "next/image";
import React from "react";

const PopolarSearch = () => {
  return (
    <div className="mt-32">
      <section className="container mx-auto">
        <h1 className="text-black text-3xl font-semibold">Popular Search</h1>
        <div className="grid grid-cols-5 gap-y-10 gap-x-2 mt-10">
          <PopularSearchCard />
          <PopularSearchCard />
          <PopularSearchCard />
          <PopularSearchCard />
          <PopularSearchCard />
        </div>
      </section>
    </div>
  );
};

export default PopolarSearch;

export const PopularSearchCard = () => {
  return (
    <div className="w-full h-full max-h-[463px] max-w-[273px] bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="max-h-[266px] w-full rounded-[30px]  shadow-xl shadow-stone-50 overflow-hidden">
        <Image
          className="max-w-[348px] w-full h-[314px] "
          src={
            "https://www.ryanscomputers.com/storage/products/main/apple-macbook-pro-late-2020-apple-m1-chip-8gb-11607923565.webp"
          }
          width={348}
          height={314}
        />
      </div>

      <div className="flex flex-col p-7">
        <div className="text-orange-500 text-2xl font-semibold text-center">
          $1,245.33
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          $1,300
        </div>
        <h1 className="text-center mt-3 text-black text-xl font-semibold ">
          Makbook Pro 2020  <br />  260 SSD
        </h1>
      </div>
    </div>
  );
};
