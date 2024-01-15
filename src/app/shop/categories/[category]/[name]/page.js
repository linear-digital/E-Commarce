import Section_1 from '@/Components/Pages/Category/Section_1'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <Section_1 name={params.name}/>
    </div>
  )
}

export default page