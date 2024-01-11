/*
 * Copyright (c) jan.24.Tamiz
 */

import React from 'react'
import {useRouter} from "next/navigation";
import Link from "next/link";

const LeftSide = ({user}) => {
    const router = useRouter()
    return (
        <div className={"w-full border px-3 py-5"}>
            <h3 className={"text-sm"}>Hello <span className={"text-orange-700"}>{user.name}</span></h3>
            <button
                onClick={()=> router.push('/me/verify')}
                disabled={user.emailVerifyed} className={`${user.emailVerifyed ? "bg-green-600 w-[150px]": "bg-red-600 w-[120px]"}  text-xs py-1 px-2  text-white rounded mt-2`}>
                {
                    user.emailVerifyed ?
                        "Varifyed Account"
                        :
                        "Not Verifyed"
                }
            </button>
            <div className={"mt-5"}>
                <h1
                    className=" text-neutral-700 text-base font-normal leading-normal">Manage
                    My Account
                </h1>
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
                        <Link href={"/"}
                              className="text-neutral-500 text-sm font-normal">
                        </Link>
                    </li>
                </ul>
                <Link href={'/me/orders'}>
                    <h1
                        className=" text-neutral-700 text-base font-normal leading-normal mt-3">My Orders
                    </h1>
                </Link>
            </div>
        </div>
    )
}
export default LeftSide
