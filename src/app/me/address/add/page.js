'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePlacesWidget } from "react-google-autocomplete";
import { api } from '@/Components/instance/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const page = () => {
  const { currentUser } = useSelector(state => state.User)
  const [address, setAddress] = useState(null)
  
 
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
      raw_address: address,
      postcode
    }

    try {
      const res = await api.post('/api/address', data)
      if (res.status === 200) {
        toast.success("Address Added")
        router.push('/me/address')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }
  const useCurrentAddress = () => {
    const apiKey = "AIzaSyBUDmkMGZD5mIPpiGRVQov8aPztKKB5B2c"
    if ("geolocation" in navigator) {
      // Get the current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          console.log("Latitude: " + latitude + ", Longitude: " + longitude);
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              // Extract the relevant location information from the response
              const address = data.results[0]
              setAddress(address)
            })
            .catch(error => console.error('Error fetching location data:', error));

          // You can use the latitude and longitude values as needed
        },
        function (error) {
          console.error("Error getting location: ", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }

  console.log(address);
  return (
    <div>
      <button className='btn btn-primary' onClick={useCurrentAddress}>Use Your Current Location</button>
      <form onSubmit={formHandler} className=''>
        <div className='grid grid-cols-3 gap-5'>
          <TextInput label={"Full Name"} name={"name"} value={currentUser?.name} />
          <TextInput
            disabled={true}
            label={"Email Address"}
            name={"email"}
            value={currentUser?.email} />
          <TextInput label={"Mobile Number"} name={"phone"} value={currentUser?.phone} />
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
                defaultValue={"Bangladesh"}
                className="input input-bordered w-full text-sm"
              />
            </label>
          </div>
          <div className={"w-full"}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Division</span>
              </div>
              <select name='division' value={address?.address_components[4]?.long_name} className='select select-bordered'>
                <option value=''>Select</option>
                {
                  [
                    "Dhaka Division",
                    "Chittagong Division",
                    "Rajshahi Division",
                    "Khulna Division",
                    "Barisal Division",
                    "Sylhet Division",
                    "Rangpur Division",
                    "Mymensingh Division"
                  ].map((d, index) => <option key={index} value={d}>{d}</option>)
                }
              </select>
            </label>
          </div>
          <div className={"w-full"}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">City/Town</span>
              </div>
              <input
              defaultValue={address?.address_components[2]?.long_name || ""}
                placeholder='City/Town'
                name='district'
                type="text"
                autoComplete='off'
                autoCorrect='off'
                className="input input-bordered w-full text-sm"
              />
            </label>
          </div>

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
              defaultValue={address ? address?.formatted_address : ""}
                type="text"
                autoComplete='off'
                name='home_address'
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