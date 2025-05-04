
import { PopularSearchCard } from "@/Components/Shared/Cards/PopularSearchCard";
import React from "react";

const PopolarSearch =  ({products}) => {

  return (
    <div className="lg:mt-32 mt-10 p-4 lg:p-0">
      <section className="container mx-auto">
        <h1 className="text-black lg:text-3xl text-2xl font-semibold">
          Popular Search
        </h1>
        <div className="grid lg:hidden lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {
            products?.map((deal, index) => (
              <PopularSearchCard key={index} data={deal} />
            ))
          }
        </div>
        <div className="lg:grid hidden lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {
            products?.map((deal, index) => (
              <PopularSearchCard key={index} data={deal} />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PopolarSearch;
