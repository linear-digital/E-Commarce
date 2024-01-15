import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='container mx-auto mt-5'>
        <div className='flex justify-between'>
            <h1 className="text-2xl font-semibold">Login</h1>
            <Link href={`/dashboard/login`} className='btn btn-sm btn-primary text-sm'>Login</Link>
        </div>
    </div>
  )
}

export default page