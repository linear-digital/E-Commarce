/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import React, { useEffect, useState } from 'react'
import LeftSide from "@/Components/Pages/Profile/LeftSide";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useJwt } from 'react-jwt';
import Link from 'next/link';

const Layout = ({ children }) => {
    const { currentUser } = useSelector(state => state.User)
    const token = Cookies.get("auth_token")
    const router = useRouter()
    const { decodedToken, isExpired } = useJwt(token || '');

    const [show, setShow] = useState(true)
    useEffect(() => {
        if (!token && !isExpired) {
            router.push('/login')
        }
        else if (!currentUser?.emailVerifyed) {
            router.push('/me/verify')
        }
    }, [currentUser, token])

    if (!currentUser) {
        return <div className='py-10 flex w-full flex-col justify-center items-center'>
            <h2 className='text-3xl text-primary font-bold'>Page Not Found</h2>
            <Link href={'/'} className='btn btn-primary mt-5'>Go to Home</Link>
        </div>
    }
    return (
        <div className={"container mx-auto lg:grid grid-cols-11 gap-10 lg:mt-10 mt-2 p-4 lg:p-0 "}>
            <button
                onClick={() => setShow(!show)}
                className={`lg:hidden block ${!show && "text-primary"}`}

            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div className="col-span-2" style={{ display: show ? "block" : "none" }}>
                <LeftSide user={currentUser || {}} />
            </div>
            <div className={"col-span-9 lg:mt-0 mt-3 lg:h-auto "}>
                {
                    children
                }

            </div>
        </div>
    )
}
export default Layout
