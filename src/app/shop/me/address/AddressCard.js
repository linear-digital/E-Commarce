import Link from 'next/link'
import React from 'react'

const AddressCard = ({ address, index }) => {
    return (
        <div className="border p-5 rounded">
            <div className='flex justify-between'>
                <h1 className="text-xl font-semibold text-primary">Address Card {index + 1}</h1>
                <Link href={`/shop/me/address/edit/${address?._id}`} className='btn btn-sm btn-primary text-sm'>Edit</Link>
            </div>
            <h3 className="text-base font-semibold">
                {address?.name}
            </h3>
            <h5 className="text-sm"><strong>Phone</strong>: {address?.phone}</h5>
            <h5 className="text-sm mt-1"><strong>Email</strong>: {address?.email}</h5>
            <h5 className="text-sm mt-1"><strong>District</strong>: {address?.district}</h5>
            <h5 className="text-sm mt-1"><strong>Division</strong>: {address?.division}</h5>
            <h5 className="text-sm mt-1"><strong>PostCode/ZIP</strong>: {address?.postcode}</h5>
            <h5 className="text-sm mt-1"><strong>Address</strong>: {address?.address}</h5>
        </div>
    )
}

export default AddressCard