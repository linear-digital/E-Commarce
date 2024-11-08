
import React from "react";

import { api } from "@/Components/instance/api";
import Details from "./Details";
import axios from "axios";
import RelatedProduct from "@/Components/Pages/Home/RelatedProduct";

export async function generateMetadata({ params }) {
  const res = await api.get(`/api/products/pr/${params.id}`);
  const product = res.data;
  return {
    title: `Linear Hub | ${product?.name.slice(0, 30)}...`,
  }
}

const getProduct = async (id) => {
  const res = await api.get(`/api/products/${id}`, );
  return res.data;
}

const page = async ({ params }) => {
  const initialProduct = getProduct(params.id)
  const [product] = await Promise.all([initialProduct])
  return (
    <div>
      <Details product={product} />
    </div>
  );
};

export default page;
