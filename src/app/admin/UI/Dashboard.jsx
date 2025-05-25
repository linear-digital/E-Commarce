/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "antd";
import { api } from "@/Components/instance/api";
import { useRouter } from "next/navigation";


const Dashboard = () => {
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

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const statistics = (await api.get("/api/statistics")).data;
        const transactions = (await api.get("/api/transactions")).data;

        const totalRevenue = transactions.reduce(
          (acc, curr) => acc + curr.total_amount,
          0
        );
        const totalProfit = transactions.reduce(
          (acc, curr) => acc + curr.profit,
          0
        );
        setMetrics({
          total_products: statistics.total,
          products_by_category: [],
          low_stock_count: statistics.low,
          total_revenue: totalRevenue,
          total_profit: totalProfit,
          recent_transactions: transactions,
          top_selling: [],
          investment: statistics.totalValue,
        });
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
      title: "Product",
      dataIndex: ["product", "name"],
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "amount",
      render: (amount) => `৳${amount.toFixed(2)}`,
    },
    {
      title: "Price",
      dataIndex: "total_amount",
      key: "amount",
      render: (_, record) => `৳${record.total_amount - record.profit}`,
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => (
        <span className="text-green-600">৳{profit.toFixed(2)}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) =>
        moment(created_at.toDate?.() || created_at).format(
          "DD-MMM-YYYY h:mm a"
        ),
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
    <div className="space-y-6">
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
          <h3 className="text-sm font-medium text-gray-500">Total Sell</h3>
          <p className="text-2xl font-semibold text-gray-900">
            ৳{metrics.total_revenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Profit</h3>
          <p className="text-2xl font-semibold text-green-600">
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
          dataSource={metrics.recent_transactions}
          rowKey="id"
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Dashboard;