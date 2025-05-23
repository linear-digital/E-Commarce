import React, { useEffect, useState } from 'react';
import Header from '../layouts/Header';
import { api, localURL } from '../api/api';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';

const OrderDetails = () => {
    const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
    const [skin, setSkin] = useState(currentSkin);

    const switchSkin = (skin) => {
        if (skin === 'dark') {
            const btnWhite = document.getElementsByClassName('btn-white');

            for (const btn of btnWhite) {
                btn.classList.add('btn-outline-primary');
                btn.classList.remove('btn-white');
            }
        } else {
            const btnOutlinePrimary = document.getElementsByClassName('btn-outline-primary');

            for (const btn of btnOutlinePrimary) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-white');
            }
        }
    }

    switchSkin(skin);

    useEffect(() => {
        switchSkin(skin);
    }, [skin]);
    const [order, setOrder] = useState({
        address: {},
        paymentDetails: {},
    })
    const [productDetails, setProductDetails] = useState({})
    const params = useParams()
    const [repatch, setRepatch] = useState(0)
    useEffect(() => {
        api.get(`/api/orders/${params.id}`)
            .then(res => {
                setOrder(res.data)
                if (res.data) {
                    setProductDetails(res.data.order[0])
                }
            })
    }, [params, repatch])
    const changeStatus = (status, id) => {
        try {
            api.put(`/api/orders/${id}`, { status: status, updateType: 'status' })
                .then(res => {
                    setRepatch(repatch + 1)
                    toast.success("Status Updated Done")
                })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <article className="card">
                    <header className="card-header"> My Orders / Tracking </header>
                    <div className="card-body">
                        <h6>Order ID: #{order.order_id}</h6>
                        <article className="card">
                            <div className="card-body row gap-2">
                                <div className="col-2"> <strong>Order Placed At:</strong> <br />{
                                    moment(order.createdAt).format('MMMM Do YYYY, h:mm a')
                                } </div>
                                <div className="col-2"> <strong>Customer Phone Number:</strong> <br /> {order?.address?.phone}</div>
                                <div className="col-2"> <strong>Customer Email:</strong> <br /> {order?.email}</div>
                                <div className="col-2"> <strong>Status:</strong> <br /> {order.status}</div>
                                <div className="col-2"> <strong>Tracking #:</strong> <br /> {order.order_id} </div>
                                <div className="col-2">
                                    <strong>Total Price:</strong> <br />
                                    <mark>{order.total} &#2547;</mark>
                                </div>
                                <div className="col-2">
                                    <strong>Delivery Change:</strong> <br />
                                    <mark>{order.shipping} &#2547;</mark>
                                </div>
                                <div className="col-2">
                                    <strong>Paid:</strong> <br />
                                    <mark>{order.advance} &#2547;</mark>
                                </div>
                                <div className="col-2">
                                    <strong>Due:</strong> <br />
                                    <mark>{order.remaining} &#2547;</mark>
                                </div>
                                <div className="col-3">
                                    <strong>Order Type:</strong> <br />
                                    <mark className='text-uppercase'>{order.paymentType}</mark>
                                </div>
                                <div className="col">
                                    <strong>Delivery Address:</strong> <br />
                                    <>

                                        {order?.address?.district}, {order?.address?.division}, {order?.address?.postcode}
                                        <br></br>
                                        {order?.address?.address},
                                    </>
                                </div>
                                <div className='col'>
                                    <strong>Order Status:</strong> <br />
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                            Change Order Status
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button
                                                    onClick={() => changeStatus('pending', order._id)}
                                                    className='btn btn-sm btn-warning mt-2 w-100'>
                                                    Pending
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => changeStatus('processing', order._id)}
                                                    className='btn btn-sm btn-outline-primary mt-2 w-100'>
                                                    Processing
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    onClick={() => changeStatus('shipped', order._id)}
                                                    className='btn btn-sm btn-primary w-100 mt-2' >
                                                    Shipped
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => changeStatus('delivered', order._id)}
                                                    className='btn btn-sm btn-success w-100 mt-2'>
                                                    Delivered
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => changeStatus('canceled', order._id)}
                                                    className='btn btn-sm btn-danger w-100 mt-2'>
                                                    Canceled
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <hr />
                        <ul className="row">
                            <li className="col-3">
                                <figure className="itemside mb-3">
                                    <div className="aside">
                                        <img height={250}
                                            src={localURL + productDetails.image} className="img-sm border" alt='' />
                                    </div>
                                    <figcaption className="info align-self-center">
                                        <p className="title mt-2">
                                            {productDetails.product_name}
                                        </p>
                                        <h5 className="">
                                            {productDetails.quantity}x
                                        </h5>
                                        <h5 className="">
                                            {productDetails.price} &#2547;

                                            <sub>/Pc</sub>
                                        </h5>
                                    </figcaption>
                                </figure>
                            </li>
                            <li className="col-5 p-2">
                                <h2>Payment Details</h2>
                                <h5>Phone Number :
                                    <span className='ms-2'>
                                        <mark>{order?.paymentDetails.number}</mark>
                                    </span>
                                </h5>
                                <h5 className='mt-3'>
                                    Transection Id :
                                    <span className='ms-2'>
                                        <mark> {order?.paymentDetails.transection_id}</mark>
                                    </span>
                                </h5>
                            </li>
                        </ul>
                        <hr />
                        <Link to={'/dashboard/orders'} className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left" /> Back to orders</Link>
                    </div>
                </article>
            </div>

        </div>
    );
};

export default OrderDetails;