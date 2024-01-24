import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link className='w-auto' href={'/'}>
        <h1 className={"text-2xl lg:text-3xl font-bold text-primary"}>Linear Hub</h1>
    </Link>
  )
}

export default Logo