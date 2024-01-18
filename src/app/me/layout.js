/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import React, { useEffect } from 'react'
import LeftSide from "@/Components/Pages/Profile/LeftSide";
import {useSelector} from "react-redux";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Layout = ({children}) => {
    const {currentUser} = useSelector(state => state.User)
    const token = Cookies.get("auth_token")
    const router = useRouter()
    useEffect(() => {
       if (!token){
            router.push('/login')
       } 
    },[])
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
