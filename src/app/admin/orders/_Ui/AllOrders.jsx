import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, DatePicker, Dropdown, Menu, Space } from 'antd';
import { ReloadOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import toast from 'react-hot-toast';
import { api } from '@/Components/instance/api';
import Link from 'next/link';

const { Option } = Select;

const AllOrders = () =>
{
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(null);

    useEffect(() =>
    {
        fetchOrders();
    }, []);

    const fetchOrders = async () =>
    {
        setLoading(true);
        try {
            const res = await api.get('/api/orders');
            setOrders(res.data);
            setAllOrders(res.data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value) =>
    {
        console.log(value);
        if (!value) {
            setOrders(allOrders);
            return;
        }
        try {
            const q = value.startsWith('#') ? value.slice(1) : value;
            const res = await api.get(`/api/orders/get/${q}`);
            setOrders(res.data);
        } catch (error) {
            toast.error('Order not found');
        }
    };

    const handleStatusFilter = (value) =>
    {
        setStatusFilter(value);
        if (value) {
            const filtered = allOrders.filter(order => order.status === value);
            setOrders(filtered);
        } else {
            setOrders(allOrders);
        }
    };

    const handleDateFilter = (date, dateString) =>
    {
        setDateFilter(dateString);
        if (dateString) {
            const filtered = allOrders.filter(order =>
                moment(order.createdAt).format('YYYY-MM-DD') === dateString
            );
            setOrders(filtered);
        } else {
            setOrders(allOrders);
        }
    };

    const changeStatus = async (status, id) =>
    {
        try {
            await api.put(`/api/orders/${id}`, { status, updateType: 'status' });
            toast.success('Status updated successfully');
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const statusMenu = (orderId) => (
        <Menu>
            {['processing', 'pending', 'shipped', 'delivered', 'canceled'].map(status => (
                <Menu.Item key={status}>
                    <Button
                        type="text"
                        className="w-full text-left"
                        onClick={() => changeStatus(status, orderId)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        {
            title: '#',
            dataIndex: 'order_id',
            key: 'order_id',
            render: (text, record) =>
            {
                return <div className="flex flex-col">
                    <time datetime="">
                        {moment(record?.createdAt).format('MMMM Do YYYY, h:mm a')}
                    </time>
                    {`#${record?.order_id}`}
                </div>
            }
        },
        {
            title: 'User',
            dataIndex: 'order',
            key: 'user',
            render: (_, record) =>
            {

                return <div>
                    <p>{record.address.name}</p>
                    <p>{record.address.email}</p>
                </div>
            }
        },
        {
            title: 'Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
            render: (text) => (
                <span className="font-medium">{text === 'cod' ? 'Cash On Delivery' : 'Online Payment'}</span>
            ),
        },  {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text) => (
                <span className="font-medium">৳{text}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <span className="font-medium capitalize">{text}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Dropdown overlay={statusMenu(record._id)} trigger={['click']}>
                    <Button>
                        Change Status <DownOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-semibold">All Orders</h2>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={fetchOrders}
                >
                    Reload
                </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-4">
                <Input
                    placeholder="Search by Order ID, Email, or Phone"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onPressEnter={(e) =>
                    {
                        handleSearch(e.target.value);
                    }}
                    className="w-full md:w-1/3"
                    suffix={<SearchOutlined />}
                />
                <Select
                    placeholder="Select Status"
                    allowClear
                    className="w-full md:w-1/4"
                    onChange={handleStatusFilter}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="shipped">Shipped</Option>
                    <Option value="delivered">Delivered</Option>
                    <Option value="canceled">Canceled</Option>
                </Select>
                <DatePicker
                    className="w-full md:w-1/4"
                    onChange={handleDateFilter}
                    placeholder="Filter by Date"
                />
            </div>

            <Table
                columns={columns}
                dataSource={orders}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                className="overflow-x-auto"
                expandable={{
                    expandedRowRender: order => <div className='grid grid-cols-12 gap-4'>
                        <div className="col-span-3">
                            <div>
                                <strong className='text-base'>Contact Details:</strong> <br />
                                <>
                                    {order?.address?.name} <br />
                                    {order?.address?.email} <br />
                                    {order?.address?.phone}
                                </>
                            </div>
                            <div>
                                <strong className='text-base'>Payment Details: </strong> <br />
                                <ul>
                                    <li>
                                        <strong>Payment Type:</strong> {order?.paymentType === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                    </li>
                                    <li>
                                        <strong>Shipping:</strong> {order?.shipping}
                                    </li> <li>
                                        <strong>Subtotal:</strong> ৳{order?.subtotal}
                                    </li>
                                    <li>
                                        <strong>Total:</strong> ৳{order?.total}
                                    </li>
                                    <li>
                                        <strong>Payment:</strong> ৳{order?.advance}
                                    </li>
                                    <li>
                                        <strong>Due:</strong> ৳{order?.remaining}
                                    </li>
                                    <div className="p-3">
                                        <li>
                                            <strong>Number:</strong> {order?.paymentDetails?.number}
                                        </li>
                                        <li className='capitalize'>
                                            <strong>Method:</strong> {order?.paymentDetails?.paymentType}
                                        </li>
                                        <li>
                                            <strong>Transaction ID:</strong> {order?.paymentDetails?.transection_id}
                                        </li>
                                    </div>
                                </ul>
                            </div>
                            <div>
                                <strong className='text-base'>Delivery Address:</strong> <br />
                                <>

                                    {order?.address?.district}, {order?.address?.division}, {order?.address?.postcode}
                                    <br></br>
                                    {order?.address?.address},
                                </>
                            </div>
                        </div>
                        <div className="col-span-8">
                            <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4 py-2 border-b">Product</th>
                                        <th className="px-4 py-2 border-b">Quantity</th>
                                        <th className="px-4 py-2 border-b">Unit Price</th>
                                        <th className="px-4 py-2 border-b">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.order?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b flex items-center space-x-3">
                                                <img
                                                    src={item?.image}
                                                    alt={item?.product_name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <span>{item?.product_name}</span>
                                            </td>
                                            <td className="px-4 py-3 border-b">{item?.quantity}</td>
                                            <td className="px-4 py-3 border-b font-medium text-gray-700">৳{item?.price}</td>
                                            <td className="px-4 py-3 border-b font-semibold text-gray-900">৳{item?.price_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>,
                    rowExpandable: record => true,
                }}
            />
        </div>
    );
};

export default AllOrders;