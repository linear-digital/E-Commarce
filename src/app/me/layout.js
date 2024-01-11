/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import React from 'react'
import LeftSide from "@/Components/Pages/Profile/LeftSide";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
    const {currentUser} = useSelector(state => state.User)
    return (
        <div className={"container mx-auto grid grid-cols-12 gap-10 mt-10"}>
            <div className="col-span-2">
                <LeftSide user={currentUser || {}}/>
            </div>
            <div className={"col-span-10"}>
                {children}
            </div>
        </div>
    )
}
export default Layout
