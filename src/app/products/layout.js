/*
 * Copyright (c) $today.year.Tamiz
 */

import React from 'react'
import Footer from "@/Components/Shared/Footer/Footer";
import Newsletter from "@/Components/Pages/Home/Newsletter";

const Layout = ({children}) => {
    return (
        <div>
            <section>
                {children}
            </section>
            <Newsletter />
        </div>
    )
}
export default Layout
