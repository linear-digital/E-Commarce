
import React from "react";

import { fetcher } from "@/Components/instance/api";
import Details from "./Details";

export async function generateMetadata({ params }) {
  const product = await getProduct()
  return {
    title: `Oftech Gadget | ${product?.name?.slice(0, 30) || "Product Details"}...`,
  }
}

const getProduct = async (id) => {
  const res = await fetcher({
    path: `/api/products/${id}`,
  });
  return res;
}

const page = async ({ params }) => {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div>
      <Details product={product} />
    </div>
  );
};

export default page;
