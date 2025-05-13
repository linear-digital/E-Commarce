
import React from "react";

import { fetcher } from "@/Components/instance/api";
import Details from "./Details";

export async function generateMetadata({ params })
{
   const { id } = await params;
  const product = await getProduct(id);
  return {
    title: `${product?.name || "Product Details"}`,
    description: product?.description,
    openGraph: {
      title: `${product?.name || "Product Details"}...`,
      description: product?.description,
      // images: product?.images ? product.images.map(url => ({ url })) : [],
    },
  };
}

const getProduct = async (id) =>
{
  const res = await fetcher({
    path: `/api/products/${id}`,
  });
  return res;
}

const page = async ({ params }) =>
{
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div>
      <Details product={product} />
    </div>
  );
};

export default page;
