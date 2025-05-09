"use client";
import React from "react";
import Multiple from "./Multiple";
import { Input } from "antd";

const List = ({ data = [], name }) => {
  const [text, setText] = React.useState(null);

  return (
    <div className="py-10 px-7 hidden lg:block cb-list">
      <h3 className="text-black text-xl font-semibold ">{name}</h3>
      <Input.Search
        className="mt-5"
        placeholder="Search..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        enterButton
      />
      <div
        className="w-full max-h-[450px] mt-5 min-h-[450px] overflow-y-auto "
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <ul className="rounded-box flex flex-col gap-y-2">
          <Multiple
            data={data.filter((item) => {
              if (text) {
                return item.name.toLowerCase().includes(text.toLowerCase());
              } else {
                return item;
              }
            })}
            name={name.toLowerCase()}
          />
        </ul>
      </div>
    </div>
  );
};

export default List;
