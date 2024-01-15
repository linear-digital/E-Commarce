/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import { api } from '@/Components/instance/api'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddressCard from './AddressCard'
import Link from 'next/link'

const page = () => {
    const {currentUser} = useSelector(state=> state.User)
    const [address, setAddress] = useState([])
    
    React.useEffect(() => {
        (
            async () => {
                const res = await api.get(`/api/address/by/${currentUser?.email}`)
                setAddress(res.data)
            }
        )()
    },[currentUser])
    return (
        <div>
            <div className='flex justify-between'>
            <h1 className="text-2xl font-semibold">Address</h1>
            <Link href={`/shop/me/address/add`} className='btn btn-sm btn-primary text-sm'>Add</Link>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-5">
            {
                address?.map((a, index) => <AddressCard index={index} address={a} key={index}/>)
            }
        </div>
        </div>
    )
}
export default page

