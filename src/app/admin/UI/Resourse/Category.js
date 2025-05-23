
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Avatar, Button, Checkbox, Image, Input, Table } from "antd";
import { Popconfirm } from "antd";
import CategoryModal from "./CategoryModal";
import { api } from "@/Components/instance/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Category = () =>
{
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(undefined);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() =>
    {
        fetchBrands();
    }, []);

    async function fetchBrands()
    {
        try {
            const brandsData = (await api.get("/api/categories")).data;
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

            const result = groupBy(products, (p) => p.category);
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
            await api.delete(`/api/categories/${id}`);
            toast.success("Brand deleted successfully");
            setShowDeleteConfirm(null);
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

    const updateCategory = (id, status) =>
    {
        api.put(`/api/categories/${id}`, { public: status })
            .then(() =>
            {
                toast.success("Category status updated successfully");
                fetchBrands();
            })
            .catch((error) =>
            {
                console.error("Error updating category status:", error);
                toast.error("Failed to update category status");
            });
    }
    return (
        <React.Fragment>
            <div className="w-full">
                <div className="flex justify-between items-center py-5">
                    <div className="d-flex align-items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    </div>
                    <Button
                        onClick={handleAddNew}
                        type="primary"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Category
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
                            render: (_, brand) =>
                            {
                                return <div className="flex items-center space-x-2">
                                    {
                                        brand?.image && <Image src={brand.image} width={50} height={50} />
                                    }
                                    <span>
                                        {brand.name}
                                    </span>
                                </div>
                            }
                        },
                        {
                            title: 'Total Products',
                            dataIndex: 'totalProducts',
                            key: 'totalProducts',
                            render: (_, brand) =>
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
                            render: (_, brand) => groupedProducts[brand.name]
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
                            render: (_, brand) =>
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
                                <div className="flex items-center justify-end ">
                                    <Button
                                        onClick={() =>
                                        {
                                            updateCategory(brand._id, !brand.public);
                                        }}
                                    >
                                        {
                                            brand?.public ?
                                                <FontAwesomeIcon icon={faEye} /> :
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                        }
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => handleEdit(brand)}
                                        className="fs-5"
                                    ><FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this brand?"
                                        onConfirm={() => handleDelete(brand._id)}
                                    >
                                        <Button
                                            type="link"
                                            className="text-danger fs-5"
                                            onClick={() => setShowDeleteConfirm(brand._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 ml-4 " />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ),
                        }
                    ]}
                />

                <CategoryModal
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

export default Category;