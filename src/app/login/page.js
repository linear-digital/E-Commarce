'use client'

/*
 * Copyright (c) $today.year.Tamiz
 */


import React from 'react'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
const Page = () => {
    const { currentUser } = useSelector(state => state.User)
    const router = useRouter()
    if (currentUser) {
        router.push('/me')
    }
    return (
        <div className={"container mx-auto flex justify-center mt-10 px-5 lg:px-0"}>
            <LoginForm />
        </div>
    )
}
export default Page
