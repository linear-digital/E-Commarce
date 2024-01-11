import Image from "next/image";

export const PopularSearchCard = () => {
  return (
    <div className="w-full h-full max-h-[463px] max-w-[273px] bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="lg:max-h-[266px] max-h-[150px] w-full rounded-[30px]  shadow-xl shadow-stone-50 overflow-hidden">
        <Image
          className="max-w-[348px] w-full max-h-[314px]"
          src={
            "https://www.ryanscomputers.com/storage/products/main/apple-macbook-pro-late-2020-apple-m1-chip-8gb-11607923565.webp"
          }
          width={348}
          height={314}
          alt=""
        />
      </div>

      <div className="flex flex-col lg:p-7 p-4">
        <div className="text-orange-500 lg:text-2xl text-xl font-semibold text-center">
          $1,245.33
        </div>
        <div className="text-neutral-400 text-base font-normal text-center mt-1">
          <del>$1,300</del>
        </div>
        <h1 className="text-center lg:mt-3 mt-2 text-black lg:text-xl text-sm font-semibold ">
          Makbook Pro 2020 <br /> 260 SSD
        </h1>
      </div>
    </div>
  );
};
