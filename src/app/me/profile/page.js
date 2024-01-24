/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {api} from "@/Components/instance/api";
import {setRepatch} from "@/redux/Tools/action";
import toast from "react-hot-toast";

const page = () => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=> state.User)
    const onSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const phone = e.target.phone.value
        const date_of_birth = e.target.date_of_birth.value
        const gender = e.target.gender.value

        const data = {name  , phone , date_of_birth, gender}
        try {
            const response = await api.patch('/api/users/update', {updateType: "full", data: data, email: currentUser?.email})
            dispatch(setRepatch(response))

        }catch (err){
            toast.error("Something went wrong")
        }

    }
    if (!currentUser) {
        return "Loading...."
    }
    return (
        <div>
            <h2 className={"lg:text-2xl text-xl font-semibold"}>My profile</h2>
            <form className="lg:grid grid-cols-3 gap-5 lg:mt-5 mt-2" onSubmit={onSubmit}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">Full Name</span>
                    </div>
                    <input name={"name"} type="text" placeholder="Full Name"
                           defaultValue={currentUser?.name}
                           className="input  text-sm input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Email
                        </span>
                    </div>
                    <input
                        disabled={true}
                        defaultValue={currentUser?.email}
                        name={"email"} type="email" placeholder="Email Address"
                           className="input  text-sm input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Phone Number
                        </span>
                    </div>
                    <input name={"phone"} type="text" placeholder="+8801"
                           defaultValue={currentUser?.phone ? currentUser?.phone : "+880"}
                           className="input  text-sm input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Date of Birth
                        </span>
                    </div>
                    <input 
                    defaultValue={currentUser?.date_of_birth} name={"date_of_birth"}
                           type="date"
                           className="input  text-sm input-bordered w-full"
                    />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-xs">
                            Gender
                        </span>
                    </div>
                    <select  className="select  select-bordered w-full " name={"gender"}>
                        <option value={""}>
                            Select Your Gender
                        </option>
                        {
                            genders.map((g)=> (
                                <option key={g.name} selected={currentUser?.gender === g.value} value={g.value}>{g.name}</option>
                            ))
                        }

                    </select>
                </label>
                <div></div>
                <button className={"btn mt-5 lg:mt-0 btn-primary"}>Update</button>
            </form>
        </div>
    )
}
export default page

const genders = [
    {
        name: "Male",
        value: "male"
    },
    {
        name: "Female",
        value: "female"
    }
]