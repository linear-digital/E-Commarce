import Brands from '@/Components/Pages/Category/Brands'
import HotSale from '@/Components/Pages/Home/HotSale'
import RecentViewed from '@/Components/Pages/Home/RecentViewed'
import React from 'react'

const layout = ({ children }) =>
{
    return (
        <div>
            <section className='container mx-auto mt-10 flex'>
                <div className="w-[341px] min-h-[504px] max-h-[554px]  rounded-lg overflow-hidden border hidden lg:block">
                    <Brands />
                </div>
                <div className='px-5 w-full'>
                    {children}
                </div>
            </section>
            <HotSale />
            <RecentViewed />

        </div>
    )
}

export default layout