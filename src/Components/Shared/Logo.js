import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link className='w-auto' href={'/'}>
      <Image
        src={'/logo.png'}
        alt='Oftech Gadget'
        width={200}
        height={100}
        className='w-[150px] h-auto cursor-pointer'
        priority
      />
    </Link>
  )
}

export default Logo