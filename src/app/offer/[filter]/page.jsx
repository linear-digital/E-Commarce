import React from "react";
import PageContent from "../_UI/PageContent";

const page = async ({ params }) => {
  const { filter } = await params;
  return (
    <div className="container mx-auto min-h-[70vh] py-10">
      <PageContent name={filter} />
    </div>
  );
};

export default page;
