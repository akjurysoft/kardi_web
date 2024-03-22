'use client'
import Footer from '@/app/components/Footer';
import axios from '../../../../axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from '@/app/SnackbarProvider';
import MyOrdersComponents from '@/app/components/MyOrdersComponents';

const Page = ({ params }) => {
    const router = useRouter();
    const { openSnackbar } = useSnackbar()
    const section = params.slug;

    const [activeTab, setActiveTab] = useState(section);
    useEffect(() => {
        if (section === 'my-orders') {
            setActiveTab('my-orders');
        }
    }, [section]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.push(`/profile/${tab}`);
    };

    // -------------------------Orders Fetching---------------------------

    const [orders, setOrders] = useState([])
    console.log(orders)
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchOrders()
        }

        return () => { unmounted = true };
    }, [])

    const fetchOrders = useCallback(
        () => {
            axios.get(`/api/fetch-orders`,{
                headers:{
                    Authorization: localStorage.getItem('kardifywebtoken')
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setOrders(res.data.orders)
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                        router.push('/login')
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        []
    )

    return (
        <>
            <div className='container mx-auto py-[40px]'>
                <div className="flex justify-center mt-8">
                    <div className="flex w-full">
                        <div className="w-1/4">
                            <div className="bg-[#fff] border p-4">
                                <div className='flex flex-col justify-center'>
                                    <span className='text-center text-[14px] font-[400]'>Welcome</span>
                                    <h2 className="text-[17px] text-center font-bold mb-4">Subham kumar jena</h2>
                                </div>
                                <ul>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'my-account' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('my-account')}
                                    >
                                        My Account
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'my-orders' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('my-orders')}
                                    >
                                        My Orders
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'my-wishlist' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('my-wishlist')}
                                    >
                                        My Wishlist
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'my-address' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('my-address')}
                                    >
                                        My Address
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'my-ratings' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('my-ratings')}
                                    >
                                        Ratings & Reviews
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab ${activeTab === 'change-password' ? 'active' : ''
                                            }`}
                                        onClick={() => handleTabChange('change-password')}
                                    >
                                        Change Password
                                    </li>
                                    <li
                                        className={`py-2 cursor-pointer profileTab `}
                                        // onClick={() => handleTabChange('my-address')}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-3/4 p-4">
                            {activeTab === 'my-account' && (
                                <div className='flex flex-col space-y-3 border px-[10px] py-[10px]'>
                                    <h2 className="text-lg font-bold mb-4">My Account</h2>
                                    
                                    <div className='flex flex-col space-y-1'>
                                        <lable className='text-[13px] font-[400] text-[#AFAFAF]'>Full Name</lable>
                                        <input type='text' className='p-[8px] border border-[#AFAFAF] text-[13px]'/>
                                    </div>

                                    <div className='flex flex-col space-y-1'>
                                        <lable className='text-[13px] font-[400] text-[#AFAFAF]'>Mobile Number</lable>
                                        <input type='text' className='p-[8px] border border-[#AFAFAF] text-[13px]'/>
                                    </div>

                                    <div className='flex flex-col space-y-1'>
                                        <lable className='text-[13px] font-[400] text-[#AFAFAF]'>Email Id</lable>
                                        <input type='text' className='p-[8px] border border-[#AFAFAF] text-[13px]'/>
                                    </div>

                                    <div className='flex flex-col space-y-1'>
                                        <lable className='text-[13px] font-[400] text-[#AFAFAF]'>Address</lable>
                                        <textarea type='text' className='p-[8px] border border-[#AFAFAF] text-[13px]'/>
                                    </div>

                                    <span className='text-[13px] font-[400] text-center bg-[#000] text-[#fff] py-3 cursor-pointer'>Update Account</span>
                                </div>
                            )}
                            {activeTab === 'my-orders' && (
                                <div>
                                    <MyOrdersComponents orders={orders}/>
                                </div>
                            )}
                            {activeTab === 'my-wishlist' && (
                                <div>
                                    <h2 className="text-lg font-bold mb-4">My Wishlist</h2>
                                    {/* Your My Wishlist Content */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Page
