
import React from "react";
import Multiple from "./Card/Multiple";
import { fetcher } from "@/Components/instance/api";
import List from "./Card/List";

const Categoryes = async () =>
{
  const categories = await fetcher({
    path: "/api/categories?status=true",
  })
  return (
    <List data={categories} name={"Categories"} />
  );
};

export default Categoryes;

