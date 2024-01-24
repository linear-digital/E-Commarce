import React from 'react';

const StepProvider = ({ status }) => {
    return (
        <ul className="steps steps-vertical lg:steps-horizontal w-full">
            {
                status === "pending" && (
                    <>
                        <li className="step  step-primary">Pending
                            <span className='loading loading-dots'></span>
                        </li>
                        <li className="step">Processing</li>
                        <li className="step">Shipped</li>
                        <li className="step">Delivered</li>
                    </>
                )
            }
            {
                status === "processing" && (
                    <>
                        <li className="step step-primary">Pending</li>
                        <li className="step step-primary relative">Processing
                            <span className='loading loading-dots'></span></li>
                        <li className="step">Shipped</li>
                        <li className="step">Delivered</li>
                    </>
                )
            }
            {
                status === "shipped" && (
                    <>
                        <li className="step step-primary">Pending</li>
                        <li className="step step-primary">Processing</li>
                        <li className="step step-primary">Shipped
                            <span className='loading loading-dots'></span>
                        </li>
                        <li className="step ">Delivered</li>
                    </>
                )
            }
            {
                status === "delivered" && (
                    <>
                        <li className="step step-primary">Pending</li>
                        <li className="step step-primary">Processing</li>
                        <li className="step step-primary">Shipped</li>
                        <li className="step step-primary">Delivered
                        </li>
                    </>
                )
            }
            {
                status === "canceled" && (
                    <>
                        <li className="step step-primary">Pending</li>
                        <li className="step step-primary">Canceled</li>
                        <li className="step ">Processing</li>
                        <li className="step ">Shipped</li>
                        <li className="step">Delivered</li>
                    </>
                )
            }
        </ul>
    );
};

export default StepProvider;