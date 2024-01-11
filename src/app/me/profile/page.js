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
        console.log(data)
        try {
            const response = await api.patch('/api/users/update', {updateType: "full", data: data, email: currentUser?.email})
            dispatch(setRepatch(response))

        }catch (err){
            toast.error("Something went wrong")
        }

    }
    return (
        <div>
            <h1 className={"text-2xl font-semibold"}>My profile</h1>
            <form className="grid grid-cols-3 gap-5 mt-5" onSubmit={onSubmit}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">Full Name</span>
                    </div>
                    <input name={"name"} type="text" placeholder="Full Name"
                           defaultValue={currentUser?.name}
                           className="input input-sm text-sm input-bordered w-full"/>
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
                           className="input input-sm text-sm input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Phone Number
                        </span>
                    </div>
                    <input name={"phone"} type="text" placeholder="+8801"
                           defaultValue={currentUser?.phone ? currentUser?.phone : "+880"}
                           className="input input-sm text-sm input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Date of Birth
                        </span>
                    </div>
                    <input defaultValue={currentUser?.date_of_birth} name={"date_of_birth"}
                           onChange={(e)=> console.log(e.target.value)
                           }
                           type="date"
                           className="input input-sm text-sm input-bordered w-full"
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xs">
                            Gender
                        </span>
                    </div>
                    <select  className="select select-sm select-bordered w-full " name={"gender"}>
                        <option>
                            Select Your Gender
                        </option>
                        {
                            genders.map((g)=> (
                                <option selected={currentUser?.gender === g.value} value={g.value}>{g.name}</option>
                            ))
                        }

                    </select>
                </label>
                <div></div>
                <button className={"btn btn-primary"}>Update</button>
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