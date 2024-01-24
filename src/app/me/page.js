/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'
import React, {useEffect} from 'react'
import {useRouter} from "next/navigation";

import Cookies from "js-cookie";
import {useSelector} from "react-redux";

const Page = () => {
    const {currentUser} = useSelector(state => state.User)

    const router = useRouter()
    const token = Cookies.get("auth_token")
    useEffect(()=> {
        if (!token){
            router.push('/login')
        }
        else{
            router.push('/me/profile')
        }
    },[token])
    return (
        <div className={""}>

        </div>
    )
}
export default Page
