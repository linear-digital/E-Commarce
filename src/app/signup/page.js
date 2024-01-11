/*
 * Copyright (c) $today.year.Tamiz
 */
'use client'

import React from 'react'
import {useRouter} from "next/navigation";
import {ArrowRight} from "@/assets/icons";
import Social from "@/Components/Pages/Social";
import {api} from "@/Components/instance/api";
import toast from "react-hot-toast";

const Page = () => {
    const router = useRouter()

    const formEventHandler = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        const newUser = {name , email , password, type: "password"}
        
        try {
         const res =  await api.post("/api/users", newUser)
           if (res.status === 200){
               router.push('/login')
           }

        }catch (err) {
        toast.error(err.response.data.message)

        }
        
    }
    return (
        <div className={"container mx-auto flex justify-center mt-10"}>
            <div className={"w-[450px] h-[530px] border rounded p-5"}>
                <form className={"w-full"} onSubmit={formEventHandler}>
                    <div className="flex items-center justify-between mb-5">
                        <h1 className={"text-2xl font-semibold  text-primary"}>Create a account</h1>
                        <div
                            onClick={() => {
                                router.push('/login')
                            }}
                            className={"flex items-center btn-link text-primary cursor-pointer"}>
                            Login <span className={"ml-2"}>
                        <ArrowRight/>
                    </span>
                        </div>
                    </div>
                    <div className={"w-full"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Full Name</span>
                            </div>
                            <input required={true} name={"name"} type="text" placeholder={"Your Full Name"}
                                   className="input text-sm input-bordered w-full"/>
                        </label>
                    </div>
                    <div className={"w-full mt-2"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input required={true} name={"email"} type="email" placeholder={"Enter Your Email"}
                                   className="input input-bordered text-sm w-full"/>
                        </label>
                    </div>
                    <div className={"w-full mt-2"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input required={true} name={"password"} type="password" placeholder={"*******"}
                                   className="input input-bordered text-sm w-full"/>
                        </label>
                    </div>
                    <button type={"submit"} className={"btn btn-primary w-full mt-5"}>Sign up</button>
                </form>
                <hr className={'my-7'}/>
                <div className={""}>
                    <Social/>
                </div>
            </div>
        </div>
    )
}
export default Page
