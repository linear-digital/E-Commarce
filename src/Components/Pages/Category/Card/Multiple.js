'use client'
import { Checkbox } from 'antd'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const Multiple = ({ data, name }) =>
{
    const params = useParams()
    const categoryMatcher = () =>
    {
        return decodeURIComponent(params.category)
    }

    return (
        <>
            {
                data.map((child, index) => (
                    <li key={index}>
                        <Link href={`/${name}/${child.name}`}>
                            <Checkbox
                                checked={categoryMatcher() === child.name}
                            >{child.name}</Checkbox>
                        </Link>
                    </li>
                ))
            }
        </>
    )
}

export default Multiple