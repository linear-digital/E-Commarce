'use client'

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const ChaildLayout = ({ children }) => {
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000)
    if (loading) {
        return <div>
            <Skeleton height={50} />
            <Skeleton height={150} />
            <div className=''>
                <Skeleton height={800} />
            </div>
        </div>
    }
    return children
};

export default ChaildLayout;