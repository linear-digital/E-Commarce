/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'

import React from 'react'
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/assets/icons";
import Link from "next/link";
import Social from "@/Components/Pages/Social";
import { api } from '@/Components/instance/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
const LoginForm2 = ({ setShow }) => {
    const router = useRouter()
    const formHandler = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const user = { email, password }
        try {
            const res = await api.post('api/users/login', user)
            if (res.data) {
                toast.success(res.data.message + "Continue Shopping")
                await Cookies.set('auth_token', res.data.token)
                setShow("")
                window.location.reload()
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className={"lg:w-[450px] bg-white lg:h-[480px] w-full h-auto  border rounded lg:p-5 p-3 relative"}>
            <button onClick={() => { setShow("") }}
                className='absolute top-[-3px] right-[-3px] text-red-600'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <form className={"w-full"} onSubmit={formHandler}>
                <div className="flex items-center justify-between mb-5">
                    <h1 className={"text-2xl font-semibold  text-primary"}>Welcome Back</h1>
                    <div
                        onClick={() => {
                            router.push('/signup')
                            setShow(false)
                        }}
                        className={"flex items-center btn-link text-primary cursor-pointer"}>
                        Signup <span className={"ml-2"}>
                            <ArrowRight />
                        </span>
                    </div>
                </div>
                <div className={"w-full mt-2"}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input name={"email"} type="email" placeholder={"Enter Your Email"}
                            className="input input-bordered text-sm w-full" />
                    </label>
                </div>
                <div className={"w-full mt-2"}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input name={"password"} type="password" placeholder={"*******"}
                            className="input input-bordered text-sm w-full" />
                    </label>
                </div>
                <div className={"mt-3"}>
                    <Link
                        className={"btn-link text-sm text-primary"}
                        href={'/me/forget'} >Forget your password ?</Link>
                </div>
                <button className={"btn btn-primary w-full mt-5"}>Login</button>
            </form>
            <hr className={'my-7'} />
            <Social />
        </div>
    );
};

export default LoginForm2;