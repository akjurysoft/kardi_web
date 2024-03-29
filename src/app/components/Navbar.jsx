'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Avatar, Badge, Hidden, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Person, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Dropdown, Navbar } from "flowbite-react";
import axios from '../../../axios';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
const Navbar1 = () => {
    const [cartCounter, setCartCounter] = useContext(CartContext)
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    const [isExteriorDropdownOpen, setIsExteriorDropdownOpen] = useState(false);
    const toggleExteriorDropdown = () => {
        setIsExteriorDropdownOpen(!isExteriorDropdownOpen);
        setIsAlloyDropdownOpen(false);
        setIsInteriorDropdownOpen(false);
    };

    const [isAlloyDropdownOpen, setIsAlloyDropdownOpen] = useState(false);
    const toggleAlloyDropdown = () => {
        setIsAlloyDropdownOpen(!isAlloyDropdownOpen);
        setIsExteriorDropdownOpen(false);
        setIsInteriorDropdownOpen(false);
    };

    const [isInteriorDropdownOpen, setIsInteriorDropdownOpen] = useState(false);
    const toggleInteriorDropdown = () => {
        setIsInteriorDropdownOpen(!isInteriorDropdownOpen);
        setIsExteriorDropdownOpen(false);
        setIsAlloyDropdownOpen(false);
    };


    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchSubCategoryData()
            fetchSuperSubCategoryData()
            fetchUserRoleData()
        }

        return () => { unmounted = true };
    }, [])

    const [role, setRole] = useState('')
    const fetchUserRoleData = useCallback(
        () => {
            axios.get(`/api/fetch-roles`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setRole(res.data.role)
                    } else if (res.data.message === 'Session expired') {
                        localStorage.removeItem('kardifyuserid')
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],)

    const [customerData, setCustomerData] = useState(null)
    const [dealerData, setDealerData] = useState(null)
    useEffect(() => {
        if (role === 'CUSTOMER') {
            axios.get(`/api/fetch-customer-details`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.code === 200) {
                        setCustomerData(res.data.customer_data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                });
        } else if (role === 'DEALER') {
            axios.get(`/api/fetch-dealer-details`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        setDealerData(res.data.dealer_data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                });
        }
    }, [role])


    const [userId, setUserId] = useState(null)
    useEffect(() => {
        setUserId(typeof window !== 'undefined' ? localStorage.getItem('kardifyuserid') : null);
    }, [])


    //------------------------------------ Sub Category Fetch ---------------------------------------
    const [subCategoryData, setSubCategoryData] = useState([])
    const fetchSubCategoryData = useCallback(
        () => {
            axios.get(`/api/fetch-subcategories-customers`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setSubCategoryData(res.data.subcategories)
                    } else {
                        openSnackbar(res.data.message, 'error');
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],)

    //------------------------------------ Super Sub Category Fetch ---------------------------------------
    const [superSubCategoryData, setSuperSubCategoryData] = useState([])
    const fetchSuperSubCategoryData = useCallback(
        () => {
            axios.get(`/api/fetch-supersubcategories-customers`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setSuperSubCategoryData(res.data.superSubcategories)
                    } else {
                        openSnackbar(res.data.message, 'error');
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],)

    return (

        <nav className="bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://kardify.netlify.app/assets/images/logo.png" className="h-8" alt="Flowbite Logo" />
                </Link>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {userId ?
                        <>
                            {role === 'CUSTOMER' ?
                                <>
                                    <Link href="/profile/my-account" className="text-white hover:text-gray-300 text-[13px] font-[600] md:text-[15px] md:font-[700] tracking-[1px] capitalize" >{customerData?.customer.fullname}</Link>
                                </>
                                :
                                <>
                                    <Link href="/profile/my-account" className="text-white hover:text-gray-300 text-[13px] font-[600] md:text-[13px] md:font-[700] tracking-[1px] capitalize" >{dealerData?.fullname}</Link>
                                </>
                            }
                        </>
                        :
                        <>
                            <Link href="/login" className="text-white hover:text-gray-300 text-[13px] font-[600] md:text-[13px] md:font-[700] tracking-[1px]">Login / Signup</Link>
                        </>
                    }

                    <IconButton color="inherit">
                        <Badge badgeContent={cartCounter} color="error">
                            <Link href='/cart'>
                                <ShoppingCartIcon className='text-white' />
                            </Link>
                        </Badge>
                    </IconButton>
                    <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div id="mega-menu" className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isAlloyDropdownOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col items-center mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <a href="#" className="text-[13px] text-[600] text-white hover:text-[#e5bc56] " aria-current="page">SHOP BY CARS</a>
                        </li>
                        <li>
                            <button onClick={toggleAlloyDropdown} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                ALLOY WHEELS
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={toggleExteriorDropdown} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                EXTERIOR
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] justify-evenly overflow-scroll h-[300px] ${isExteriorDropdownOpen ? 'block' : 'hidden'} md:grid-cols-3 border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'EXTERIOR').map((e, i) =>
                                    <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={i}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'EXTERIOR').map((ee, index) =>
                                                    <li key={index}>
                                                        <Link href={`/product/super_sub_category_id=${ee.id}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                            {ee.super_sub_category_name}
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                        <li>
                            <button onClick={toggleInteriorDropdown} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                INTERIORS
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] justify-evenly overflow-scroll h-[300px] ${isInteriorDropdownOpen ? 'block' : 'hidden'} md:grid-cols-3 border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'INTERIOR').map((e, i) =>
                                    <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={i}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'INTERIOR').map((ee, index) =>
                                                    <li key={index}>
                                                        <Link href={`/product/super_sub_category_id=${ee.id}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                            {ee.super_sub_category_name}
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar1
