
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BrandModal from "./BrandModal";
import { Button, Table } from "antd";
import { Popconfirm } from "antd";
import { api } from "@/Components/instance/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Brands = () =>
{
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(undefined);
    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() =>
    {
        fetchBrands();
    }, []);

    async function fetchBrands()
    {
        try {
            const brandsData = (await api.get("/api/brands")).data;
            const products = (await api.get("/api/products/all")).data;

            function groupBy(array, keyGetter)
            {
                return array.reduce((result, item) =>
                {
                    const key = keyGetter(item);
                    (result[key] ||= []).push(item);
                    return result;
                }, {});
            }

            const result = groupBy(products, (p) => p.brand);
            setGroupedProducts(result);
            setBrands(brandsData);
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast.error("Failed to fetch brands");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (brand) =>
    {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) =>
    {
        try {
            await api.delete(`/api/brands/${id}`);
            toast.success("Brand deleted successfully");
            fetchBrands();
        } catch (error) {
            console.error("Error deleting brand:", error);
            toast.error("Failed to delete brand");
        }
    };

    const handleAddNew = () =>
    {
        setSelectedBrand(undefined);
        setIsModalOpen(true);
    };


    return (
        <React.Fragment>
            <div className="w-full py-5">
                <div className="flex w-full items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                    <Button
                        onClick={handleAddNew}
                        type="primary"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Brand
                    </Button>
                </div>
                <Table
                    loading={loading}
                    rowKey={(record) => record._id}
                    dataSource={brands}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Total Products',
                            dataIndex: 'totalProducts',
                            key: 'totalProducts',
                            render: (text, brand) =>
                            {

                                return groupedProducts[brand.name]
                                    ? groupedProducts[brand.name].length
                                    : 0
                            }
                        },
                        {
                            title: 'Total Stock',
                            dataIndex: 'totalStock',
                            key: 'totalStock',
                            render: (text, brand) => groupedProducts[brand.name]
                                ? groupedProducts[brand.name].reduce(
                                    (acc, product) => acc + product.sold,
                                    0
                                )
                                : 0
                        },
                        {
                            title: "Total Price",
                            dataIndex: "totalPrice",
                            key: "totalPrice",
                            render: (text, brand) =>
                            {
                                return `৳
                  ${groupedProducts[brand.name]?.reduce(
                                    (acc, product) =>
                                        acc +
                                        Number(product.price || 0) *
                                        Number(product.sold || 0),
                                    0
                                ) || 0}`
                            }
                        },
                        {
                            title: 'Actions',
                            key: 'actions',
                            render: (text, brand) => (
                                <div className="flex items-center justify-end">
                                    <Button
                                        type="link"
                                        onClick={() => handleEdit(brand)}
                                        className="fs-5"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this brand?"
                                        onConfirm={() => handleDelete(brand._id)}
                                    >
                                        <Button
                                            type="link"

                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 ml-4 " />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ),
                        }
                    ]}
                />

                <BrandModal
                    isOpen={isModalOpen}
                    onClose={() =>
                    {
                        setIsModalOpen(false);
                        setSelectedBrand(undefined);
                    }}
                    brand={selectedBrand}
                    onSuccess={fetchBrands}
                />
            </div>
        </React.Fragment>
    );
};

export default Brands;