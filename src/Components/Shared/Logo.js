import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link className='w-auto' href={'/'}>
      {/* <h1 className={"text-2xl lg:text-3xl font-bold text-primary"}>Oftech Gadget</h1> */}
      <Image
        src={'/logo.png'}
        alt='Oftech Gadget'
        width={200}
        height={100}
        className='w-[160px] h-auto'
        priority
      />
    </Link>
  )
}

export default Logo