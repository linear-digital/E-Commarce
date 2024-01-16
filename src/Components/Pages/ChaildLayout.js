'use client'

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { BarLoader } from 'react-spinners';

const ChaildLayout = ({ children }) => {
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000)
    if (loading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <BarLoader width={250} color="#FF7020" />
        </div>
    }
    return children
};

export default ChaildLayout;