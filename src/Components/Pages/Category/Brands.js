
import React from "react";
import Multiple from "./Card/Multiple";
import { fetcher } from "@/Components/instance/api";
import List from "./Card/List";

const Brands = async () =>
{
  const brands = await fetcher({
    path: "/api/brands",
  })
  return (
    <List data={brands} name={"Brands"} />
  );
};

export default Brands;

