import React, { Suspense } from 'react';
import TrackOrder from './TrackOrder';
import { Spin } from 'antd';

const page = () => {
    return (
        <Suspense fallback={<Spin fullscreen size='large'/>}>
            <TrackOrder />
        </Suspense>
    );
};

export default page;