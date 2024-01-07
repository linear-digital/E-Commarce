import { PopularSearchCard } from "@/Components/Shared/Cards/PopularSearchCard";
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
