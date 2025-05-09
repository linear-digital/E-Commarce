"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/Shared/Cards/ProductCard";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import CategoryLoader from "@/Components/Pages/Category/CategoryLoader";
import { api } from "@/Components/instance/api";
import { Grid, List } from "@/assets/icons";
import { Pagination } from "antd";

const PageContent = ({ name }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [limit, setLimit] = useState(12);
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalDocument, setTotalDocument] = useState(0);
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [shortBy, setShortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

  const handlePriceRange = (e) => {
    e.preventDefault();
    const min = parseInt(e.target.min.value);
    const max = parseInt(e.target.max.value);
    setPriceRange({ min, max });
    setShowFilter(false);
    setActivePage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          limit: limit.toString(),
          page: activePage.toString(),
          sort: shortBy,
          public: true,
        });
        if (name) {
          query.set(`${name}`, true);
        }

        const response = await api.get(`/api/products?${query}`);
        const data = response.data;
        setProducts(data.products);
        setTotalDocument(data.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [limit, activePage, shortBy, priceRange, name]);

  return (
    <div className="w-full">
      {/* Header & Filters */}
      <div className="lg:flex justify-between items-center py-2 w-full">
        <div className="flex items-center justify-between w-full mb-3 lg:mb-0">
          <h1 className="text-xl font-semibold capitalize">
            {name?.split("_").join(" ")}
          </h1>
          <div className="flex items-center">
            <button onClick={() => setViewType("grid")}>
              <Grid active={viewType === "grid"} />
            </button>
            <button onClick={() => setViewType("list")} className="ml-8">
              <List active={viewType === "list"} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-neutral-400 lg:text-base text-sm font-normal lg:ml-10 lg:w-[150px]">
            Show by
          </div>
          <div className="ml-5">
            <select
              className="select select-ghost lg:w-[190px] w-full"
              onChange={(e) => {
                setShortBy(e.target.value);
                setActivePage(1);
              }}
            >
              <option value={"default"}>Default</option>
              <option value={"h2l"}>(Price - High to Low)</option>
              <option value={"l2h"}>(Price - Low to High)</option>
              <option value={"a-z"}>(A - Z)</option>
              <option value={"z-a"}>(Z - A)</option>
            </select>
          </div>

          <div className="ml-7 relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="btn btn-primary btn-sm"
            >
              Filter
            </button>
            <form
              style={{ display: showFilter ? "flex" : "none" }}
              className="absolute items-center justify-center top-[40px] right-0 w-[300px] h-[50px] bg-white rounded-md shadow-xl p-2"
              onSubmit={handlePriceRange}
            >
              <span className="pr-2 text-sm">Min</span>
              <input
                name="min"
                defaultValue={priceRange.min}
                className="w-[65px] text-sm px-1 rounded border mr-2"
                type="number"
                min={0}
              />
              <span className="pr-2 text-sm">Max</span>
              <input
                name="max"
                defaultValue={priceRange.max}
                className="w-[65px] text-sm px-1 rounded border mr-2"
                type="number"
                min={1}
              />
              <button className="bg-primary text-white rounded-lg btn-sm ml-2">
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <CategoryLoader />
      ) : (
        <section className="mt-10">
          {viewType === "list" ? (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {products?.map((product) => (
                <ProductCard key={product._id} type={"list"} data={product} />
              ))}
            </section>
          ) : (
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {products?.map((product) => (
                <ProductSM key={product._id} data={product} />
              ))}
            </section>
          )}
        </section>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10 px-3">
        <div className="text-neutral-400 text-base font-normal">
          {totalDocument} total results
        </div>
        {totalDocument > 0 && (
          <Pagination
            total={totalDocument}
            pageSize={limit}
            current={activePage}
            pageSizeOptions={[12, 24, 36]}
            showSizeChanger
            onChange={(page, pageSize) => {
              setActivePage(page);
              setLimit(pageSize);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PageContent;
