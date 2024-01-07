import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
        <Image src={'/images/logo/Logo.svg'} width={170} height={30}/>
    </Link>
  )
}

export default Logo