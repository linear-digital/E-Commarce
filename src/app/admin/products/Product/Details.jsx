import React, { useEffect, useState } from "react";
import { Button, Input, Image, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ImageUploader from "./Images";
import SortImages from "./SortImages";
import MultipleSelect from "./MultipleSelect";
import { api } from "@/Components/instance/api";

const Details = ({ data, categories, brands, refetch, setOpen }) => {
  const [cover, setCover] = useState(data?.cover);
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    code: "",
    variant: [],
    tags: [],
    price: 0,
    sale_price: 0,
    discount_percentage: 0,
    sold: 0,
    category: "",
    brand: "",
    description: "",
    descriptions: [],
    spacification: [],
    key_features: [],
  });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setImages(
        data?.images?.map((img, index) => ({ id: `index-${index}`, ...img })) || []
      );
      setDetails({
        name: data.name || "",
        code: data.code || "",
        variant: data.variant || [],
        tags: data.tags || [],
        price: data.price || 0,
        sale_price: data.sale_price || 0,
        discount_percentage: data.discount_percentage || 0,
        sold: data.sold || 0,
        category: data.category || "",
        brand: data.brand || "",
        description: data.description || "",
        descriptions: data.descriptions || [],
        spacification: data.spacification || [],
        key_features: data.key_features || [],
      });
    } else {
      setImages([]);
    }
  }, [data]);

  useEffect(() => {
    setCover(images[0]?.image);
  }, [images]);

  const updateProduct = async () => {
    try {
      const payload = { ...details, cover, images };
      if (data) {
        await api.put(`/api/products/${data._id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await api.post("/api/products", payload);
        toast.success("Product added successfully");
        router.push("/admin/products");
      }
      refetch?.();
      setOpen?.(null);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleFeatureChange = (type, index, keyOrValue, value) => {
    const updated = [...details[type]];
    updated[index] = { ...updated[index], [keyOrValue]: value };
    setDetails({ ...details, [type]: updated });
  };

  const removeFeature = (type, index) => {
    const updated = [...details[type]];
    updated.splice(index, 1);
    setDetails({ ...details, [type]: updated });
  };

  const renderFeatureFields = (type, label) => (
    <Form.Item label={label} className="col-span-2">
      {details[type].map((item, index) => (
        <div className="flex items-start mb-2 gap-2" key={index}>
          <Input
            placeholder="Key"
            value={item.key}
            onChange={(e) => handleFeatureChange(type, index, "key", e.target.value)}
          />
          <Input.TextArea
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleFeatureChange(type, index, "value", e.target.value)}
          />
          <CloseOutlined
            className="cursor-pointer text-red-500"
            onClick={() => removeFeature(type, index)}
          />
        </div>
      ))}
      <Button
        type="dashed"
        onClick={() =>
          setDetails({
            ...details,
            [type]: [...details[type], { key: "", value: "" }],
          })
        }
      >
        + Add {label}
      </Button>
    </Form.Item>
  );

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-lg text-primary mb-2">Cover Image</h2>
      <Image
        src={cover}
        height={200}
        alt="cover"
        className="bg-gray-300 min-w-[200px] max-w-[300px]"
      />
      <SortImages images={images} setImages={setImages} />
      <div className="py-4">
        <ImageUploader product={data} images={images} setImages={setImages} />
      </div>

      <Form
        layout="vertical"
        onFinish={updateProduct}
        autoComplete="off"
        className="grid grid-cols-2 gap-x-5"
        initialValues={details}
      >
        <Form.Item label="Name">
          <Input
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Product Code">
          <Input
            value={details.code}
            onChange={(e) => setDetails({ ...details, code: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Variants">
          <MultipleSelect
            inputName="Variants"
            data={details.variant}
            setData={(data) => setDetails({ ...details, variant: data })}
          />
        </Form.Item>

        <Form.Item label="Tags">
          <MultipleSelect
            inputName="Tags"
            data={details.tags}
            setData={(data) => setDetails({ ...details, tags: data })}
          />
        </Form.Item>

        <Form.Item label="Price">
          <Input
            type="number"
            value={details.price}
            onChange={(e) => setDetails({ ...details, price: +e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Sale Price">
          <Input
            type="number"
            value={details.sale_price}
            onChange={(e) => setDetails({ ...details, sale_price: +e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label={`Discount (%) - ${
            details.sale_price && details.discount_percentage
              ? (
                  details.sale_price -
                  (details.discount_percentage / 100) * details.sale_price
                ).toFixed(2)
              : "0.00"
          } Taka`}
        >
          <Input
            type="number"
            value={details.discount_percentage}
            onChange={(e) =>
              setDetails({ ...details, discount_percentage: +e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Stock">
          <Input
            type="number"
            value={details.sold}
            onChange={(e) => setDetails({ ...details, sold: +e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Category">
          <Select
            placeholder="Select Category"
            value={details.category}
            onChange={(value) => setDetails({ ...details, category: value })}
          >
            {categories.map((item) => (
              <Select.Option key={item._id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Brand">
          <Select
            placeholder="Select Brand"
            value={details.brand}
            onChange={(value) => setDetails({ ...details, brand: value })}
          >
            {brands.map((item) => (
              <Select.Option key={item._id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" className="col-span-2">
          <Input.TextArea
            rows={4}
            value={details.description}
            onChange={(e) => setDetails({ ...details, description: e.target.value })}
          />
        </Form.Item>

        {renderFeatureFields("key_features", "Key Features")}
        {renderFeatureFields("spacification", "Specification")}
        {renderFeatureFields("descriptions", "Descriptions")}

        <Form.Item className="col-span-2">
          <Button type="primary" htmlType="submit">
            {data ? "Update" : "Add"} Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Details;