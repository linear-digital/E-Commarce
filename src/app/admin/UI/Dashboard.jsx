/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "antd";
import { api } from "@/Components/instance/api";
import { useRouter } from "next/navigation";


const Dashboard = () =>
{
  const [metrics, setMetrics] = useState({
    total_products: 0,
    products_by_category: [],
    low_stock_count: 0,
    total_revenue: 0,
    total_profit: 0,
    recent_transactions: [],
    top_selling: [],
    investment: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const fetchMetrics = async () =>
    {
      try {
        setLoading(true);
        const statistics = (await api.get("/api/statistics")).data;

        const trxs = (await api.get("/api/transactions")).data;
        const transactions = trxs.filter(
          (trx) => trx.type === "sale"
        );
        const expencess = trxs.filter(
          (trx) => trx.type === "expense"
        );
        const totalRevenue = transactions.reduce(
          (acc, curr) => acc + curr.total_amount,
          0
        );
        const income = transactions.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        const profit = totalRevenue + income;
        const totalExpense = expencess.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        setMetrics({
          total_products: statistics.total,
          products_by_category: [],
          low_stock_count: statistics.low,
          total_revenue: profit,
          total_profit: totalExpense,
          recent_transactions: trxs,
          top_selling: [],
          investment: statistics.totalValue,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (created_at) =>
        moment(created_at).format(
          "DD-MMM-YYYY h:mm a"
        ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <span
        className={`${type === "sale"
          ? "text-green-600"
          : type === "purchase"
            ? "text-red-600"
            : "text-blue-600"
          } font-semibold capitalize`}>
        {type}
      </span>,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "product",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "amount",
      render: (amount, record) => <span
        className={`${record.type === "sale"
          ? "text-green-600"
          : record.type === "purchase"
            ? "text-red-600"
            : "text-blue-600"
          } font-semibold capitalize`}>
        ৳{amount || record.amount}
      </span>,
    },

  ];

  const navigate = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          onClick={() => navigate.push("/products")}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-semibold text-gray-900">
            {metrics.total_products}
          </p>
        </div>

        <div
          onClick={() => navigate("/low-stock")}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-semibold text-gray-900">
            {metrics.low_stock_count}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Current Value</h3>
          <p className="text-2xl font-semibold text-gray-900">
            ৳{metrics.investment}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-semibold text-green-600">
            ৳{metrics.total_revenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-semibold text-red-600">
            ৳{metrics.total_profit}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <Table
          columns={columns}
          dataSource={metrics.recent_transactions.slice(0, 10)}
          loading={loading}
          rowKey="_id"
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Dashboard;