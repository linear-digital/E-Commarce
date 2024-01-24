'use client'

import { setShowNotification } from '@/redux/Tools/action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './instance/api';
import moment from 'moment';
import Link from 'next/link';

const Notification = () => {
    const { showNotification } = useSelector(state => state.Tools)
    const { currentUser } = useSelector(state => state.User)
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        api.get(`/api/notification-c/get/${currentUser?.email}`)
            .then(res => {
                setNotifications(res.data)
            })
    }, [])
    if (!currentUser) {
        return
    }
    return (
        <div className=''>
            <div>
                {/* component */}
                <div style={{ display: showNotification ? 'block' : 'none' }} className="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden  fixed sticky-0 z-50" id="chec-div ">
                    {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
                    <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                        <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                            <div className="flex items-center justify-between">
                                <p tabIndex={0} className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                                <button role="button" aria-label="close modal" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer" onClick={() => {
                                    dispatch(setShowNotification(false))
                                }}>
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className='mt-10'>
                                {
                                    notifications.map((item) => {
                                        return (
                                            <Link
                                                onClick={() => dispatch(setShowNotification(false))}
                                                href={item.details.path}
                                                key={item._id}
                                                className="w-full p-3 mb-3 bg-white rounded flex">
                                                <div tabIndex={0} aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                                                    </svg>
                                                </div>
                                                <div className="pl-3">
                                                    <p tabIndex={0} className="focus:outline-none text-sm font-semibold leading-none">
                                                        {item.details.title}
                                                    </p>
                                                    <p tabIndex={0} className="focus:outline-none text-sm leading-none mt-2">
                                                        {item.details.message}
                                                    </p>
                                                    <p tabIndex={0} className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
                                                        {moment(item.createdAt).fromNow()
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Notification;