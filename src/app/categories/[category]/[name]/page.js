'use client'

import Section_1 from '@/Components/Pages/Category/Section_1'
import React, {useEffect, useState} from 'react'

const page = ({params}) => {
    const [products , setProducts] = useState([])
    useEffect(() => {

    }, []);
  return (
    <div>
      <Section_1 name={params.name}/>
    </div>
  )
}

export default page