import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link className='w-[100px] lg:w-auto' href={'/'}>
        <Image src={'/images/logo/Logo.svg'} width={170} height={30}/>
    </Link>
  )
}

export default Logo