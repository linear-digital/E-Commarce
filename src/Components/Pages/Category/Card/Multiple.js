import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const Multiple = ({ data, index }) => {
    const params = useParams()

    return (
        <li key={index}>
            {
                data.children ?
                <details open={index === 1}>
                <summary className="cursor-pointer">
                    <span className={`${params.category === data.param ? "text-[#e30613]" : "text-black"} text-base font-semibold`}>
                        {data.name}
                    </span>
                </summary>
                {
                    <ul className="ml-2">
                        {
                            data.children?.map((child, index) => (
                                <li key={index}>
                                    {
                                        child.children ?
                                            <details open={false}>
                                                <summary >{child.name}</summary>
                                                <ul>
                                                    {
                                                        child.children?.map((ch, index) => (
                                                            <li
                                                                className={`${params.name === ch.param && "text-[#e30613]"}`}
                                                                key={index}><Link href={`/categories/${data.param}/${ch.param}`}>{ch.name}</Link></li>
                                                        ))
                                                    }
                                                </ul>
                                            </details>
                                            :
                                            <Link className={params.name === child.param ? "text-[#e30613]" : "text-black"} href={`/categories/${data.param}/${child.param}`}>{child.name}</Link>
                                    }

                                </li>
                            ))
                        }
                    </ul>
                }
            </details>
            :
            <Link className={params.category === data.param ? "text-[#e30613] text-base font-semibold" : "text-black text-base font-semibold"} href={`/categories/${data.param}`}>{data.name}</Link>
            }
        </li>
    )
}

export default Multiple