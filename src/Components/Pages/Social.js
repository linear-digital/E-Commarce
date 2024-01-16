/*
 * Copyright (c) $today.year.Tamiz
 */

import React from 'react'
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {api} from '@/Components/instance/api'
import {decodeToken} from "react-jwt";
import { useRouter } from 'next/navigation';
const Social = () => {
    const clientId = "941960576414-osl8cva9nq43fk2mc9uvrichinmgvjh4.apps.googleusercontent.com"
    const secret = "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";
    const router = useRouter()
    const googleLogin = async (info) => {
        const { email, name, picture } = decodeToken(info.credential)
        const data = { email, name, picture, password: "google", type: "google" }
        try {
            const res = await api.post('/api/users', data)
            
            if (res.data.token) {
                Cookies.set('auth_token', res.data.token)
                router.push('/shop/me')
                window.location.reload()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className={"w-full flex justify-center"}>
            <GoogleOAuthProvider  clientId={clientId}>
                <GoogleLogin
                    size={"large"}
                    width={400}
                    onSuccess={credentialResponse => {
                        googleLogin(credentialResponse)
                    }}
                    onError={() => {
                        toast.error("Login Error")
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}
export default Social
