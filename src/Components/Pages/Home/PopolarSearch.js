"use client";

import { PopularSearchCard } from "@/Components/Shared/Cards/PopularSearchCard";
import React from "react";
import { useSelector } from "react-redux";

const PopolarSearch = () => {
  const { deviceType } = useSelector((state) => state.Tools);
  return (
    <div className="lg:mt-32 mt-10 p-4 lg:p-0">
      <section className="container mx-auto">
        <h1 className="text-black lg:text-3xl text-2xl font-semibold">
          Popular Search
        </h1>
        <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {deviceType === "mobile" ? (
            <>
              <PopularSearchCard />
              <PopularSearchCard />
              <PopularSearchCard />
              <PopularSearchCard />
            </>
          ) : (
            <>
              <PopularSearchCard />
              <PopularSearchCard />
              <PopularSearchCard />
              <PopularSearchCard />
              <PopularSearchCard />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PopolarSearch;
