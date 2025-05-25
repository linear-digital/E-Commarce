import React, { useState } from "react";
import { Plus } from "lucide-react";

import toast from "react-hot-toast";
import { Button, DatePicker, Space, Table } from "antd";
import moment from "moment";
import { api } from "@/Components/instance/api";
import TransactionModal from "./TransactionModal";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Radio } from "antd";
import dayjs from "dayjs";
import { Popconfirm } from "antd";
const Transactions = () =>
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [trxType, setTrxType] = useState("sale");
  const { data: transactions, isLoading: loading, refetch } = useQuery({
    queryKey: ["transactions", trxType, start, end],
    queryFn: async () =>
    {
      const res = await api.get('/api/transactions', {
        params: {
          type: trxType,
          start: start,
          end: end
        },
      })
      return res.data;
    },
  })
  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
    {
      const res = await api.get('/api/products/all')
      return res.data;
    },
  })
  const handleDelete = async (id) =>
  {
    try {
      await api.delete(`/api/transactions/${id}`);
      toast.success("Transaction deleted successfully");
      refetch();
    }
    catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "product_id",
      key: "product_id",
      render: (_, product) =>
      {
        return product?.product_id?.name || product?.source;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      hidden: trxType === "purchase", // Hide quantity column for purchase transactions
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "amount",
      render: (_, record) =>
      {
        if (record?.total_amount) {
          return `৳${record?.total_amount}`
        }
        return `৳${record?.amount}`;
      },
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => (
        <span className="text-green-600">৳{profit.toFixed(2)}</span>
      ),
      hidden: trxType === "purchase", // Hide profit column for purchase transactions
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MMM-YYYY h:mm a"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          <Button
            type="primary"
            onClick={() =>
            {
              setSelectedTrx(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this transaction?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  if (loading) {
    return <Spin fullscreen size="large" />
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Radio.Group
            options={[
              { label: "Sale", value: "sale" },
              { label: "Purchase", value: "purchase" },
            ]}
            value={trxType}
            onChange={(e) => setTrxType(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            className="w-full"
          />
        </div>
        <Space>
          <div className="flex gap-x-3">
            <DatePicker
              value={dayjs(start || new Date())}
              onChange={(date) => setStart(date ? date.format('YYYY-MM-DD') : null)}
            />
            <DatePicker
              value={dayjs(end || new Date())}
              onChange={(date) => setEnd(date ? date.format('YYYY-MM-DD') : null)}
            />
          </div>
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Transaction
          </Button>
        </Space>
      </div>

      <Table
        dataSource={transactions}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        footer={() => (
          <div className="text-left">
            Total Transactions: {transactions.length}
            <br />
            Total Amount: ৳
            {transactions.reduce((acc, transaction) => acc + transaction.total_amount, 0).toFixed(2)}
            <br />
            Total Profit: ৳
            {transactions.reduce((acc, transaction) => acc + transaction.profit, 0).toFixed(2)}
            <br />
            Total Quantity: {transactions.reduce((acc, transaction) => acc + transaction.quantity, 0)}
          </div>
        )}
      />

      {
        isModalOpen && (
          <TransactionModal
            products={products}
            refetchProducts={refetchProducts}
            isOpen={isModalOpen}
            onClose={() =>
            {
              setIsModalOpen(false)
              setSelectedTrx(null);
            }}
            onSuccess={refetch}
            trx={selectedTrx}
          />
        )
      }
    </div>
  );
};

export default Transactions;
