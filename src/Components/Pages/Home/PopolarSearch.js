

import { PopularSearchCard } from "@/Components/Shared/Cards/PopularSearchCard";
import { api } from "@/Components/instance/api";
import React from "react";
const getPopular = async () => {
  const res = await api.get('/api/products/quary/popular')
  return res.data
}
const PopolarSearch = async () => {
  const initialData = getPopular()
  const [popular] = await Promise.all([initialData])
  return (
    <div className="lg:mt-32 mt-10 p-4 lg:p-0">
      <section className="container mx-auto">
        <h1 className="text-black lg:text-3xl text-2xl font-semibold">
          Popular Search
        </h1>
        <div className="grid lg:hidden lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {
            popular?.slice(0, 4).map((deal, index) => (
              <PopularSearchCard key={index} data={deal} />
            ))
          }
        </div>
        <div className="lg:grid hidden lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {
            popular?.slice(0, 5).map((deal, index) => (
              <PopularSearchCard key={index} data={deal} />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PopolarSearch;
