"use client";
import { api, fetcher } from "@/Components/instance/api";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { Popconfirm } from "antd";
import { Table } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Details from "./Product/Details";
import { Input } from "antd";
import { Popover } from "antd";
import Options from "./Product/Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "antd";

const page = () =>
{
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(null);
  const [lowStock, setLowStock] = useState(false);
  const [search, setSearch] = useState("")
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", lowStock],
    queryFn: async () =>
    {
      const res = await fetcher({
        path: `/api/products/all${lowStock ? "?lowstock=true" : ""}`,
      });
      return res;
    },
  });
  useEffect(() =>
  {
    (async () =>
    {
      const res = await fetcher({
        path: "/api/categories",
      });
      setCategories(res);
      const res2 = await fetcher({
        path: "/api/brands",
      });
      setBrands(res2);
    })();
  }, []);
  const deleteProduct = async (id) =>
  {
    await fetcher({
      path: `/api/products/${id}`,
      method: "DELETE",
    });
    refetch();
  };
  const [size, setSize] = useState(10);
  return (
    <div className="min-h-screen">
      <div className="p-3 my-5 flex items-center justify-between gap-x-5">
        <Input.Search
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(value) => setSearch(value)}
        />
        <Switch value={lowStock}
          checked={lowStock}
          checkedChildren="Low Stock"
          unCheckedChildren="All Stock"
          className="ml-2"
          onChange={(value) =>
          {
            setLowStock(value);
            setPage(1);
          }
          }
        />
        <Link href={"/admin/products/add"}>
          <Button type="primary">Add Product</Button>
        </Link>
        {/* Reload Data */}
        <Button type="primary" className="ml-1" onClick={() => refetch()}>
          <FontAwesomeIcon icon={faRotate} />
        </Button>
      </div>
      <Table
        rowKey={"_id"}
        loading={isLoading}
        pagination={{
          pageSize: size,
          current: page,

          onChange: (page, pageSize) =>
          {
            setSize(pageSize);
            setPage(page);
          },
        }}
        dataSource={data?.filter(
          (p) =>
            (category ? p.category === category : true) &&
            (brand ? p.brand === brand : true) &&
            (search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
        )}
        columns={[
          {
            title: "Image",
            dataIndex: "cover",
            key: "cover",
            render: (text, record) => (
              <img
                src={
                  text ||
                  categories.find((c) => c.name === record.category)?.image
                }
                alt="product"
                style={{ height: "50px" }}
              />
            ),
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) =>
            {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "300px",
                  }}
                >
                  <p>{text}</p>
                  <p style={{ fontSize: "12px" }}>{record.description?.slice(0, 50)}</p>
                </div>
              );
            },
          },
          {
            title: (
              <select
                className="outline-none border-none text-sm bg-transparent"
                value={category}
                onChange={(e) =>
                {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            ),
            dataIndex: "category",
            key: "category",
          },

          {
            title: (
              <select
                className="outline-none border-none text-sm bg-transparent"
                value={brand}
                onChange={(e) =>
                {
                  setBrand(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                {brands.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            ),
            dataIndex: "brand",
            key: "brand",
          },

          {
            title: "Main Price",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "Sale Price",
            dataIndex: "finalPrice",
            key: "finalPrice",
            render: (text, record) => (
              <span>
                {record.sale_price -
                  (record.sale_price * record.discount_percentage) / 100}{" "}
                Taka
              </span>
            ),
          },
          {
            title: "Stock",
            dataIndex: "sold",
            key: "sold",
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <div className="flex items-center gap-x-3">
                <Popover
                  trigger="click"
                  content={
                    <Options data={record} refetch={refetch} />
                  }
                >
                  <Button type="primary"
                  >
                    Options
                  </Button>
                </Popover>
                <Button type="primary"
                  onClick={() =>
                  {
                    setProduct(record);
                  }}
                >
                  Update Product
                </Button>
                <Popconfirm
                  title="Are you sure to delete this product?"
                  onConfirm={() => deleteProduct(record._id)}
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />
      <Modal footer={null} open={!!product} onClose={() => setProduct(null)} onCancel={() => setProduct(null)} width={1000}>
        {!!product && <Details data={product} categories={categories} brands={brands} refetch={refetch} setOpen={setProduct} />}
      </Modal>
    </div>
  );
};

export default page;
