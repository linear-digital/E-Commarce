'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePlacesWidget } from "react-google-autocomplete";
import { api } from '@/Components/instance/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const page = ({ params }) => {
    const { currentUser } = useSelector(state => state.User)
    const [address, setAddress] = useState(null)
    const [oldAddress, setOldAddress] = useState(null)
    const apiKey = "AIzaSyBUDmkMGZD5mIPpiGRVQov8aPztKKB5B2c"
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: apiKey,
        onPlaceSelected: (place) => {
            setAddress(place)
        }
    });
    const router = useRouter()


    const formHandler = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const phone = e.target.phone.value
        const email = e.target.email.value
        const country = e.target.country.value
        const district = e.target.district.value
        const home_address = e.target.home_address.value
        const division = e.target.division.value
        const postcode = e.target.postcode.value

        const data = {
            name,
            phone,
            email,
            country,
            address: home_address,
            district,
            division,
            postcode,
            raw_address: address
        }

        try {
            const res = await api.put(`/api/address/${params.id}`, data)
            if (res.status === 200) {
                toast.success("Address Updated Done")
                router.push('/me/address')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    useEffect(() => {
        (async () => {
            const res = await api.get(`/api/address/${params.id}`)
            setOldAddress(res.data)
            if (!res.data) {
                router.push('/me/address')
            }
        })()
    }, [])
    return (
        <div>
            <form onSubmit={formHandler} className=''>
                <div className='grid grid-cols-3 gap-5'>
                    <TextInput label={"Full Name"} name={"name"} value={oldAddress?.name} />
                    <TextInput
                        disabled={true}
                        label={"Email Address"}
                        name={"email"}
                        value={currentUser?.email} />
                    <TextInput label={"Mobile Number"} name={"phone"} value={oldAddress?.phone} />
                    <div className={"w-full"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Country</span>
                            </div>
                            <input
                                disabled
                                type="text"
                                name='country'
                                autoComplete='off'
                                defaultValue={oldAddress?.country}
                                className="input input-bordered w-full text-sm"
                            />
                        </label>
                    </div>
                    <div className={"w-full"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">City/Town</span>
                            </div>
                            <input
                                ref={ref} {...autocompleteRef}
                                placeholder='City/Town'
                                name='district'
                                type="text"
                                autoComplete='off'
                                autoCorrect='off'
                                defaultValue={oldAddress?.district}
                                className="input input-bordered w-full text-sm"
                            />
                        </label>
                    </div>
                    {
                         <div className={"w-full"}>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Division</span>
                                </div>
                                <input
                                    name='division'
                                    type="text"
                                    autoComplete='off'
                                    defaultValue={oldAddress?.division}
                                    className="input input-bordered w-full text-sm"
                                />
                            </label>
                        </div>
                    }
                    <div className={"w-full"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Postcode/ZIP</span>
                            </div>
                            <input
                                type="text"
                                name='postcode'
                                autoComplete='off'
                                placeholder='Postcode/ZIP'
                                defaultValue={oldAddress?.postcode}
                                className="input input-bordered w-full text-sm"
                            />
                        </label>
                    </div>
                    <div className={"w-full"}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Address</span>
                            </div>
                            <input
                                type="text"
                                autoComplete='off'
                                name='home_address'
                                defaultValue={oldAddress?.address}
                                placeholder='House No, Building, Street Name, Area'
                                className="input input-bordered w-full text-sm"
                            />
                        </label>
                    </div>
                </div>
                <button className='btn btn-primary w-[200px] mt-5'>Add Address</button>
            </form>

        </div>
    )
}

export default page

const TextInput = ({ label, name, value, disabled }) => {
    return <div className={"w-full"}>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input autoComplete='off' disabled={disabled} name={name} type="text" defaultValue={value}
                className="input input-bordered w-full text-sm"
            />
        </label>
    </div>
}