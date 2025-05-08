
import React from "react";
import Multiple from "./Card/Multiple";
import { fetcher } from "@/Components/instance/api";

const Categoryes = async () =>
{
  const categories = await fetcher({
    path: "/api/categories?status=true",
  })
  const brands = await fetcher({
    path: "/api/brands",
  })
  return (
    <div className="py-10 px-7 hidden lg:block">
      <h3 className="text-black text-xl font-semibold ">
        Categoires
      </h3>
      <div className="w-full max-h-[450px] mt-5 min-h-[450px] overflow-y-auto "
      style={{
        scrollbarWidth: "thin",
      }}
      >
        <ul className="rounded-box flex flex-col gap-y-2">
          <Multiple data={categories}  name={"Categories"} />
        </ul>

      </div>
    </div>
  );
};

export default Categoryes;

