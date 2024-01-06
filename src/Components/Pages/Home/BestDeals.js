import ProductSM from '@/Components/Shared/Cards/ProductSM'
import React from 'react'

const BestDeals = () => {
  return (
    <main className='container mx-auto mt-32'>
        <h1 className=" text-black text-3xl font-semibold">Best Deals</h1>
        <div className='grid grid-cols-5 gap-y-10 gap-x-2 mt-10'>
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
        </div>
    </main>
  )
}

export default BestDeals