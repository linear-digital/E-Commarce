import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Select, Input, Radio, DatePicker } from "antd";
import { api as axios, fetcher } from "@/Components/instance/api";
import dayjs from "dayjs";
import { Modal } from "antd";
import toast from "react-hot-toast";

const TransactionModal = ({ isOpen, onClose, onSuccess, trx, products }) =>
{
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: 1,
    sale_price: 0,
    source: "",
    type: "sale",
    amount: 0,
    createdAt: new Date().toISOString(),
  });



  useEffect(() =>
  {
    if (trx) {
      setFormData({
        product_id: trx.product_id?._id,
        quantity: trx.quantity,
        sale_price: trx.sale_price,
        type: trx.type || "sale",
        createdAt: trx.createdAt || new Date().toISOString(),
        source: trx.source || "",
        amount: trx.amount || 0,
      });
      if (trx.product_id?._id) {
        setSelectedProduct(trx.product_id);
        handleProductChange(trx.product_id._id);
      }
    }
  }, [trx]);


  const handleProductChange = (productId) =>
  {
    if (productId) {
      const product = products.find((p) => p._id === productId);
      setSelectedProduct(product || null);
      setFormData((prev) => ({
        ...prev,
        product_id: productId,
      }));
    } else {
      setSelectedProduct(null);
      setFormData((prev) => ({
        ...prev,
        product_id: "",
        sale_price: 0,
      }));
    }
  };

  const calculateProfit = (quantity, salePrice) =>
  {
    if (!selectedProduct) return 0;
    const totalCost = selectedProduct.price * quantity;
    const totalRevenue = salePrice * quantity;
    return totalRevenue - totalCost;
  };
  console.log(formData);
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);

    try {

      const quantity = formData.quantity
      const sale_price = formData.sale_price

      const payload = {
        ...formData,
        total_amount: sale_price * quantity,
        profit:
          formData.product_id && formData.type === "sale"
            ? calculateProfit(quantity, sale_price)
            : formData.amount,
        type: formData.type,
        source: formData.source,
      };

      if (trx) {
        await axios.put(`/api/transactions/${trx._id}`, payload);
        toast.success("Transaction updated successfully");
      } else {
        await axios.post(`/api/transactions`, payload);
        toast.success("Transaction created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Failed to process transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={`${trx ? "Update" : "Create"} Transaction`}
      centered
      className="transaction-modal"
      maskClosable={false}
      destroyOnClose
      loading={loading}
    >
      <div className="bg-white rounded-lg w-full">

        <div className="p-4">
          <Radio.Group
            options={[
              { label: "Sale", value: "sale" },
              { label: "Purchase", value: "purchase" },
            ]}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            optionType="button"
            buttonStyle="solid"
            className="w-full"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <DatePicker
              className="mt-1 block w-full"
              value={dayjs(formData.createdAt)}
              onChange={(date, dateString) =>
                setFormData({ ...formData, createdAt: dateString })
              }
              format="YYYY-MM-DD"
            />
          </div>

          {
            formData.type === "sale" && <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <Select
                  showSearch
                  placeholder="Select a product"
                  value={formData.product_id}
                  onChange={handleProductChange}
                  options={[
                    { value: "", label: "Select a product" },
                    ...products.map((product) => ({
                      value: product._id,
                      label: product.name,
                    })),
                  ]}
                  className="w-full"
                />
              </div>

              {formData.product_id && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sale Price
                    </label>
                    <Input
                      type="number"
                      min={selectedProduct?.price || 0}
                      value={formData.sale_price}
                      onChange={(e) =>
                        setFormData({ ...formData, sale_price: e.target.value })
                      }
                      required
                    />
                    {selectedProduct && (
                      <p className="mt-1 text-sm text-gray-500">
                        Minimum price: ৳{selectedProduct?.price}
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          }

          {!formData.product_id && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <Input.TextArea
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Input
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {selectedProduct &&
            formData.quantity &&
            formData.sale_price && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Transaction Summary
                </h3>
                <p className="text-sm">
                  Total Amount: ৳
                  {(
                    parseFloat(formData.sale_price) *
                    parseInt(formData.quantity)
                  ).toFixed(2)}
                </p>
                <p className="text-sm">
                  Profit: ৳
                  {calculateProfit(
                    parseInt(formData.quantity),
                    parseFloat(formData.sale_price)
                  ).toFixed(2)}
                </p>
              </div>
            )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? trx
                  ? "Updating..."
                  : "Creating..."
                : trx
                  ? "Update Transaction"
                  : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TransactionModal;