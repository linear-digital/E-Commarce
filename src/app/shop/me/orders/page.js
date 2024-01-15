
'use client'

import { api } from '@/Components/instance/api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useSelector((state) => state.User)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await api.get(`/api/orders/email/${currentUser?.email}`)
                setOrders(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [currentUser])
    return (
        <div>
            {orders.length}
        </div>
    )
}
export default Page
