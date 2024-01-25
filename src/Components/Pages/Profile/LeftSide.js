/*
 * Copyright (c) jan.24.Tamiz
 */

import React from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';

const LeftSide = ({ user }) => {
    const router = useRouter()
    return (
        <div className={"w-full border px-3 py-5"}>
            <h1 className={"text-sm"}>Hello <span className={"text-orange-700"}>{user.name}</span></h1>
            <button
                onClick={() => router.push('/me/verify')}
                disabled={user.emailVerifyed} className={`${user.emailVerifyed ? "bg-green-600 w-[150px]" : "bg-red-600 w-[120px]"}  text-xs py-1 px-2  text-white rounded mt-2`}>
                {
                    user.emailVerifyed ?
                        "Varifyed Account"
                        :
                        "Not Verifyed"
                }
            </button>
            <div className={"lg:mt-5 mt-2"}>
                <h2
                    className=" text-neutral-700 text-base font-normal leading-normal">Manage
                    My Account
                </h2>
                <ul className={"mt-2 pl-3"}>
                    <li>
                        <Link href={"/me/profile"}
                            className="text-neutral-500 text-sm font-normal">My
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href={"/me/address"}
                            className="text-neutral-500 text-sm font-normal">
                            Address Book
                        </Link>
                    </li>
                    <li>
                        <Link href={'/me/orders'}>
                            <h2
                                className=" text-neutral-700 text-base font-normal leading-normal lg:mt-3 mt-1">My Orders
                            </h2>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/me/review'}>
                            <h2
                                className=" text-neutral-700 text-base font-normal leading-normal lg:mt-3 mt-1">Reviews
                            </h2>
                        </Link>
                    </li>
                </ul>
                <button 
                onClick={()=> {
                    Cookies.remove('auth_token')
                    window.location.reload()
                }}
                className='btn btn-sm btn-primary mt-5'>SignOut</button>
            </div>
        </div>
    )
}
export default LeftSide
