/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'

import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/assets/icons";
import Link from "next/link";
import Social from "@/Components/Pages/Social";
import { api } from '@/Components/instance/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { setRepatch } from '@/redux/Tools/action';

const LoginForm = () => {
    const router = useRouter()
    const token = Cookies.get('auth_token')
    const dispatch = useDispatch()
    const formHandler = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const user = { email, password }
        try {
            const res = await api.post('api/users/login', user)
            if (res.data) {
                dispatch(setRepatch(res))
                toast.success(res.data.message)
                router.push('/me/profile')
                await Cookies.set('auth_token', res.data.token)
                window.location.reload()
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    useEffect(() => {
        if (token) {
            router.push('/me/profile')
        }
    }, [token])
    return (
        <div className={"lg:w-[450px] bg-white lg:h-[480px] w-full h-auto  border rounded lg:p-5 p-3"}>
            <form className={"w-full"} onSubmit={formHandler}>
                <div className="flex items-center justify-between mb-5">
                    <h1 className={"text-2xl font-semibold  text-primary"}>Welcome Back</h1>
                    <div
                        onClick={() => {
                            router.push('/signup')
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

export default LoginForm;