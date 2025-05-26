import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Select, Input, Radio, DatePicker, Spin } from "antd";
import { Modal } from "antd";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const calculateProfit = (product, quantity, salePrice) => {
  if (!product) return 0;
  const totalCost = product.price * quantity;
  const totalRevenue = salePrice * quantity;
  return totalRevenue - totalCost;
};

const TransactionModal = ({ isOpen, onClose, onSuccess, trx, products }) => {
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

  // Derived state
  const totalAmount = useMemo(() => {
    return parseFloat(formData.sale_price) * parseInt(formData.quantity) || 0;
  }, [formData.sale_price, formData.quantity]);

  const profit = useMemo(() => {
    return formData.product_id && formData.type === "sale"
      ? calculateProfit(
          selectedProduct,
          parseInt(formData.quantity),
          parseFloat(formData.sale_price)
        )
      : 0;
  }, [selectedProduct, formData.quantity, formData.sale_price, formData.type, formData.product_id]);

  useEffect(() => {
    if (trx) {
      const initialData = {
        product_id: trx.product_id?._id || "",
        quantity: trx.quantity || 1,
        sale_price: trx.sale_price || 0,
        type: trx.type || "sale",
        createdAt: trx.createdAt || new Date().toISOString(),
        source: trx.source || "",
        amount: trx.amount || 0,
      };
      setFormData(initialData);
      
      if (trx.product_id?._id) {
        const product = products.find((p) => p._id === trx.product_id._id);
        setSelectedProduct(product || null);
      }
    } else {
      // Reset form when creating new transaction
      setFormData({
        product_id: "",
        quantity: 1,
        sale_price: 0,
        source: "",
        type: "sale",
        amount: 0,
        createdAt: new Date().toISOString(),
      });
      setSelectedProduct(null);
    }
  }, [trx, products]);

  const handleProductChange = useCallback((productId) => {
    if (productId) {
      const product = products.find((p) => p._id === productId);
      setSelectedProduct(product || null);
      setFormData((prev) => ({
        ...prev,
        product_id: productId,
        sale_price: product?.price || 0,
      }));
    } else {
      setSelectedProduct(null);
      setFormData((prev) => ({
        ...prev,
        product_id: "",
        sale_price: 0,
      }));
    }
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.type === "sale" && !formData.product_id) {
      toast.error("Please select a product for sale");
      return;
    }
    
    if (formData.type !== "sale" && !formData.amount) {
      toast.error("Please enter an amount");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        total_amount: formData.type === "sale" ? totalAmount : formData.amount,
        profit: formData.type === "sale" ? profit : 0,
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
      toast.error(error.response?.data?.message || "Failed to process transaction");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || 
    (formData.type === "sale" && !formData.product_id) || 
    (formData.type !== "sale" && !formData.amount);

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
    >
      <Spin spinning={loading}>
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
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <DatePicker
                className="mt-1 block w-full"
                value={dayjs(formData.createdAt)}
                onChange={(date) =>
                  setFormData({ ...formData, createdAt: date.toISOString() })
                }
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            </div>

            {formData.type === "sale" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product
                  </label>
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
                        code: product.category,
                        description: product.description,
                      })),
                    ]}
                    className="w-full"
                    filterOption={(inputValue, option) => {
                      const lowerCaseInput = inputValue.toLowerCase();
                      return (
                        option.label.toLowerCase().includes(lowerCaseInput) ||
                        (option.code && option.code.toLowerCase().includes(lowerCaseInput)) ||
                        (option.description && option.description.toLowerCase().includes(lowerCaseInput))
                      );
                    }}
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
                          setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1 )})
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sale Price (৳)
                      </label>
                      <Input
                        type="number"
                        min={selectedProduct?.price || 0}
                        value={formData.sale_price}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            sale_price: Math.max(
                              selectedProduct?.price || 0, 
                              parseFloat(e.target.value) || 0
                            )
                          })
                        }
                        required
                        prefix="৳"
                      />
                      {selectedProduct && (
                        <p className="mt-1 text-sm text-gray-500">
                          Minimum price: ৳{selectedProduct.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
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
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (৳)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                    }
                    required
                    prefix="৳"
                  />
                </div>
              </>
            )}

            {selectedProduct && formData.type === "sale" && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Transaction Summary
                </h3>
                <p className="text-sm">
                  Total Amount: ৳{totalAmount.toFixed(2)}
                </p>
                <p className="text-sm">
                  Profit: ৳{profit.toFixed(2)}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {trx ? "Update Transaction" : "Create Transaction"}
              </button>
            </div>
          </form>
        </div>
      </Spin>
    </Modal>
  );
};

TransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  trx: PropTypes.object,
  products: PropTypes.array.isRequired,
};

export default TransactionModal;