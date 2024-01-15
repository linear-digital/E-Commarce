'use client'

import ProductCard from "@/Components/Shared/Cards/ProductCard";
import { Grid, List } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import {api} from "@/Components/instance/api";
import CategoryLoader from "@/Components/Pages/Category/CategoryLoader";

const Section_1 = ({ name }) => {
  const [shortBy, setShortBy] = useState("Default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [showFilter, setShowFilter] = useState(false)
  const handlePriceRange = (e) => {
    e.preventDefault();
    const min = e.target.min.value;
    const max = e.target.max.value;
    setPriceRange({ min, max })
    setShowFilter(false)
  }
  const [products , setProducts] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [pages, setPages] = useState([])
  const [viewType, setViewType] = useState("grid");

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= products?.length; i++) {
      links.push(
        <button key={i} onClick={() => { handlePageClick(i) }} className={`btn mr-1 ${activePage === i ? "btn-primary" : "btn-ghost bg-[#FFEFE7] text-gray-700"} btn-sm w-[30px] h-[27px]`}>
          {i}
        </button>
      );
    }

    return links;
  };
const [loading , setLoading] = useState(true)

  useEffect(() => {
    (
      async ()=> {
        setLoading(true)
        const res = await  api.get('/api/products')
        setProducts(res.data)
        setLoading(false)
      }
    )()
  }, []);



  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-2 w-full">
        <h1 className="text-xl font-semibold capitalize">
          {
            name?.split("-").map((item, index) => {
              return <span key={index}>{item} </span>
            })
          }
        </h1>
        <div className="flex items-center">
          <button onClick={() => setViewType("grid")}>
             <Grid active={viewType === "grid"}/>
          </button>
          <button onClick={() => setViewType("list")} className="ml-8">
            <List active={viewType === "list"}/>
          </button>
          <div className="text-neutral-400 text-base font-normal ml-10">Show by</div>
          <div className="ml-5">
            <select className="select select-ghost w-[190px]" onChange={(e) => setShortBy(e.target.value)}>
              <option value={""}>Default</option>
              <option value={"h2l"}>(Price - High to Low)</option>
              <option value={"l2h"}>(Price - Low to High)</option>
            </select>
          </div>
          <div className="ml-7 relative">
            <button onClick={() => setShowFilter(!showFilter)} className="btn btn-primary btn-sm">
              Filter
            </button>
            <form style={{ display: showFilter ? "flex" : "none" }} className="absolute  items-center justify-center top-[40px] right-0 w-[300px] h-[50px] bg-white rounded-md shadow-xl p-2"
              onSubmit={handlePriceRange}
            >
              <span className="pr-2 text-sm">Min</span>
              <input required name="min" className="w-[65px] text-sm px-1 rounded border mr-2" type="number" min={0}/>
              <span className="pr-2 text-sm">Max</span>
              <input required name="max" className="w-[65px] text-sm px-1 rounded border mr-2" type="number" min={0} />
              <button className="bg-primary  text-white rounded-lg btn-sm ml-2">Apply</button>
            </form>
          </div>

        </div>
      </div>
      {
        loading ?
            <div>
              <CategoryLoader />
            </div>
            :

            <section>

              {
                viewType === "list" ?
                    <section className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                      {
                        products?.map((product) => (
                            <ProductCard key={product._id} type={'list'} data={product}/>
                        ))
                      }

                    </section>
                    :
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                      {
                        products?.map((product) => (
                            <ProductCard key={product._id} data={product}/>
                        ))
                      }
                    </section>
              }
            </section>
      }

      <div className="flex justify-between items-center mt-10 px-3">
        <div
            className="text-neutral-400 text-base font-normal ">Showing {products?.length} of {products?.length} result
        </div>

        <div className="flex items-center">
          {renderPaginationLinks()}
        </div>
      </div>
    </div>
  );
};

export default Section_1;
