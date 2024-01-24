
import React from "react";

import { api } from "@/Components/instance/api";
import Details from "./Details";
import axios from "axios";

export async function generateMetadata({ params }) {
  const res = await api.get(`/api/products/pr/${params.id}`);
  const product = res.data;
  return {
    title: `Linear Hub | ${product?.name}`,
  }
}

const getProduct = async (id) => {
  const ipfrom = await axios.get('https://api64.ipify.org/?format=json')
  const res = await api.get(`/api/products/${id}?ip=${ipfrom.data.ip}`);
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
