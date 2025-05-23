import { api } from '@/Components/instance/api';
import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Options = ({ data, refetch }) =>
{
    const [product, setProduct] = useState(data);

    useEffect(() =>
    {
        setProduct(data);
    }, [data]);

    const handleCheckboxChange = (key, value) =>
    {
        const updatedProduct = { [key]: value };
        setProduct(updatedProduct);
        updateProduct(updatedProduct);
    };

    const updateProduct = async (updatedData) =>
    {
        try {
            await api.put(`/api/products/${data._id}`, updatedData);
            refetch();
            toast.success("Product Updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };

    const flags = [
        { key: "showOnWebsite", label: "Show on Website" },
        { key: "bestDeal", label: "Best Deal" },
        { key: "topTen", label: "Top Ten" },
        { key: "topSelling", label: "Top Selling" },
        { key: "popular", label: "Popular" },
        { key: "flash_sale", label: "Flash Sale" },
        { key: "new_arrival", label: "New Arrival" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 p-4">
            {flags.map(({ key, label }) => (
                <Checkbox
                    key={key}
                    checked={product?.[key]}
                    onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                >
                    {label}
                </Checkbox>
            ))}
        </div>
    );
};

export default Options;