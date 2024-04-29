'use client'

import ProductCard from "@/Components/Shared/Cards/ProductCard";
import { Grid, List } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import { api } from "@/Components/instance/api";
import CategoryLoader from "@/Components/Pages/Category/CategoryLoader";

const Section_1 = ({ name }) => {

  const [showFilter, setShowFilter] = useState(false)
  const handlePriceRange = (e) => {
    e.preventDefault();
    const min = e.target.min.value;
    const max = e.target.max.value;
    setPriceRange({ min, max })
    setShowFilter(false)
  }
  const [totalDocument, setTotalDocument] = useState(0)
  const [products, setProducts] = useState([])
  const [productsAll, setProductsAll] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewType, setViewType] = useState("grid");
console.log(products);
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= Math.round(totalDocument / 12); i++) {
      links.push(
        <button key={i} onClick={() => { handlePageClick(i) }} className={`btn mr-1 ${activePage === i ? "btn-primary" : "btn-ghost bg-[#FFEFE7] text-gray-700"} btn-sm w-[30px] h-[27px]`}>
          {i}
        </button>
      );
    }

    return links;
  };
  const [loading, setLoading] = useState(true)
  const [repeat, setRepeat] = useState(0)
  useEffect(() => {
    (
      async () => {

        setLoading(true)
        if (name === "all") {
          const res = await api.get('/api/products?limit=12&page=' + activePage)
          setProducts(res.data)
          setProductsAll(res.data)
        }
        else {
         const res = await api.post('/api/products/search/any', {
           search: name
         })
          setProducts(res.data)

        }
        const allProduct = await api.get('/api/products/all')
        setProductsAll(allProduct.data)
        setTotalDocument(allProduct.data.length)

        setLoading(false)
      }
    )()
  }, [repeat, activePage]);
  const [shortBy, setShortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  useEffect(() => {
    if (shortBy === "h2l") {
      setProducts(productsAll?.sort((a, b) => a.price - b.price))
    } else if (shortBy === "l2h") {
      setProducts(productsAll?.sort((a, b) => b.price - a.price))
    }
    else if (shortBy === "a-z") {
      setProducts(productsAll?.sort((a, b) => a.name.localeCompare(b.name)))
    }
    else if (shortBy === "z-a") {
      setProducts(productsAll?.sort((a, b) => b.name.localeCompare(a.name)))
    }
    else if (shortBy === "default") {
      setRepeat(repeat + 1)
    }
  }, [shortBy])

  useEffect(() => {
    if (priceRange.max && priceRange.min) {
      setProducts(productsAll?.filter((item) => item.price >= priceRange.min && item.price <= priceRange.max))
    }
    else {
      setRepeat(repeat + 1)
    }

  }, [priceRange])

  useEffect(() => {
    setTotalPages(Math.ceil(products?.length / 12))
  }, [products])

  return (
    <div className="w-full">
      <div className="lg:flex justify-between items-center py-2 w-full">
        <div className="flex items-center justify-between w-full mb-3 lg:mb-0">
          <h1 className="text-xl font-semibold capitalize">
            {
              name?.split("-").map((item, index) => {
                return <span key={index}>{item} </span>
              })
            }
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
          <div className="text-neutral-400 lg:text-base text-sm  font-normal lg:ml-10 lg:w-[150px]">Show by</div>
          <div className="ml-5">
            <select className="select select-ghost lg:w-[190px] w-full" onChange={(e) => setShortBy(e.target.value)}>
              <option value={"default"}>Default</option>
              <option value={"h2l"}>(Price - High to Low)</option>
              <option value={"l2h"}>(Price - Low to High)</option>
              <option value={"a-z"}>(A - Z)</option>
              <option value={"z-a"}>(Z - A)</option>
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
              <input
                name="min" defaultValue={1} className="w-[65px] text-sm px-1 rounded border mr-2" type="number" min={1}
              />
              <span className="pr-2 text-sm">Max</span>
              <input
                name="max" defaultValue={1000} className="w-[65px] text-sm px-1 rounded border mr-2" type="number" min={1} />
              <button className="bg-primary  text-white rounded-lg btn-sm ml-2">Apply</button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-5 px-3">
        <div
          className="text-neutral-400 text-base font-normal ">
        </div>

        {
          <div className="flex items-center">
            {renderPaginationLinks()}
          </div>
        }
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
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
                  {
                    products?.map((product) => (
                      <ProductCard key={product._id} type={'list'} data={product} />
                    ))
                  }

                </section>
                :
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                  {
                    products?.map((product) => (
                      <ProductCard key={product._id} data={product} />
                    ))
                  }
                </section>
            }
          </section>
      }

      <div className="flex justify-between items-center mt-10 px-3">
        <div
          className="text-neutral-400 text-base font-normal ">Showing {products?.length} of {totalDocument} result
        </div>

        {
          <div className="flex items-center">
            {renderPaginationLinks()}
          </div>
        }
      </div>
    </div>
  );
};

export default Section_1;
