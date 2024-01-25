/*
 * Copyright (c) $today.year.Tamiz
 */

import React from 'react'
import Newsletter from "@/Components/Pages/Home/Newsletter";
import RecentViewed from '@/Components/Pages/Home/RecentViewed';

const Layout = ({children}) => {
    return (
        <div>
            <section>
                {children}
            </section>
            <RecentViewed mt={"lg:mt-10"}/>
        </div>
    )
}
export default Layout
