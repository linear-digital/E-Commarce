/*
 * Copyright (c) jan.24.Tamiz
 */
"use client"
import React, {useState} from 'react'
import {api} from "@/Components/instance/api";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {setRepatch} from "@/redux/Tools/action";

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=> state.User
    )
    const [code , setCode] = useState("")
    const [error, setError] = useState("")
    const verifyMail = async () => {
        if (code.length === 6){
            setError("")
           try {
               const response = await api.post('/api/code/verify', {
                   code, email: currentUser?.email
               })
               if (response.data.isVarifyed){
                   router.push('/me')
                   dispatch(setRepatch(response.data))
               }
               else{
                   setError(response.data.message)
               }
           }
           catch (err){
               setError("Something went wrong")
           }

        }
        else if (code.length < 6){
            setError("Please insert 6 digit code")
        }
    }

    async function sendCode () {
        try {
            const response = await api.post('/api/code/send', {email : currentUser?.email})
            toast.success("Please Check Your mail and get your verification code")

        }
        catch (e) {
          toast.error('Something went wrong')
        }
    }

    React.useEffect(() => {
        if (currentUser?.emailVerifyed){
            router.push('/me')
        }
    }, [currentUser]);

    return (
        <div className={"w-full flex flex-col justify-center items-start mt-5"}>
            <h1 className={"text-xl font-semibold"}>Please Check your mail</h1>
            <button onClick={sendCode} className={"btn btn-outline btn-sm mt-5"}>Resend Mail</button>
                <input
                    className={"w-[200px] h-[50px] border mt-5 outline-none py-2 rounded text-xl tracking-[0.7em] text-center"}
                    placeholder={"******"}
                    id={"code"}
                    width={200}
                    value={code}
                    onChange={(e) => {
                        e.target.value.length <= 6 && setCode( e.target.value.toUpperCase())
                    }}
                    type="text"
                />
            {
                error && <p className={"text-sm text-red-500 mt-3 ml-1"}>{error}</p>
            }
            <button onClick={verifyMail} className={"btn btn-primary mt-5 w-[150px]"}>Verify</button>
        </div>
    )
}
export default Page
