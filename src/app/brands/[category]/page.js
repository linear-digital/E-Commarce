import Section_1 from '@/Components/Pages/Category/Section_1'
import React from 'react'

export const metadata = {
  title: 'Oftech Gadget | Online Shopping BD | All Categories',
}
const page = async ({ params }) =>
{
  const { category } = await params

  return (
    <div>
      <Section_1 name={decodeURIComponent(category)} brand={true} />
    </div>
  )
}

export default page