import React from "react";
import Details from "./Details";
import { fetcher } from "@/Components/instance/api";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await fetcher({ path: `/api/products/${id}` });
  const brands = await fetcher({ path: "/api/brands" });
  const categories = await fetcher({ path: "/api/categories" });
  return (
    <div className="py-5">
      <Details data={data} brands={brands} categories={categories} />
    </div>
  );
};

export default page;
