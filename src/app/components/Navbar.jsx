'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Autocomplete, Avatar, Badge, Box, Collapse, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Person, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Dropdown, Navbar } from "flowbite-react";
import axios from '../../../axios';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Navbar1 = () => {

    const [cartCounter, setCartCounter] = useContext(CartContext)
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    const [openCategories, setOpenCategories] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [openAccordion, setOpenAccordion] = useState(null);

    const handleAccordionToggle = (accordionName) => {
        setOpenAccordion(openAccordion === accordionName ? null : accordionName);
    };

    const [openSubcategory, setOpenSubcategory] = useState(null);

    const handleSubcategoryToggle = (subcategoryName) => {
        setOpenSubcategory(openSubcategory === subcategoryName ? null : subcategoryName);
    };


    const [dropdownOpen, setDropdownOpen] = useState('');

    const toggleDropdown = (dropdownId) => {
        setDropdownOpen(dropdownOpen === dropdownId ? '' : dropdownId);
    };



    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchCategoryData()
            fetchSubCategoryData()
            fetchSuperSubCategoryData()
            fetchUserRoleData()
            fetchAllProductData()
        }

        return () => { unmounted = true };
    }, [])

    const [role, setRole] = useState('')
    const fetchUserRoleData = useCallback(
        () => {
            if (typeof window !== 'undefined' && localStorage.getItem('kardifywebtoken')) {
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
                            localStorage.setItem('kardifylogintype', 'logout')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.response && err.response.data.statusCode === 400) {
                            openSnackbar(err.response.data.message, 'error');
                        }
                    })
            }
        },
        [],)

    const [customerData, setCustomerData] = useState(null)
    const [dealerData, setDealerData] = useState(null)
    useEffect(() => {
        if (role === 'CUSTOMER') {
            if (typeof window !== 'undefined' && localStorage.getItem('kardifywebtoken')) {
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
            }
        } else if (role === 'DEALER') {
            if (typeof window !== 'undefined' && localStorage.getItem('kardifywebtoken')) {
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
        }
    }, [role])


    const [userId, setUserId] = useState(null)
    useEffect(() => {
        setUserId(typeof window !== 'undefined' ? localStorage.getItem('kardifyuserid') : null);
    }, [])

    // ------------------------------------ Category Fetch ---------------------------------------
    const [categoryData, setCategoryData] = useState([])
    const fetchCategoryData = useCallback(
        () => {
            axios.get(`/api/fetch-categories-customer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setCategoryData(res.data.categories)
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

    // ------------------------------------ Category Fetch Ends---------------------------------------


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


    // fetch all product 
    const [allProductData, setAllProductData] = useState([])
    const fetchAllProductData = useCallback(
        () => {
            axios.get(`/api/get-products-customer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setAllProductData(res.data.products)
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

    // const productOptions = allProductData.map(product => ({
    //     id: product.id,
    //     label: product.product_name,
    //     image: product.images[0]?.image_url
    // }));

    const mergedOptions = [
        ...allProductData.map(product => ({
            id: product.id,
            type: 'product',
            label: product.product_name,
            image: product.images[0]?.image_url,
            link: `/details/${product.id}`
        })),
        ...categoryData.map(category => ({
            id: category.id,
            type: 'category',
            label: category.category_name,
            image: category.image_url,
            link: `/product/category_id=${category.id}`
        })),
        ...subCategoryData.map(subCategory => ({
            id: subCategory.id,
            type: 'subCategory',
            label: subCategory.sub_category_name,
            image: subCategory.image_url,
            link: `/product/sub_category_id=${subCategory.id}`
        })),
        ...superSubCategoryData.map(superSubCategory => ({
            id: superSubCategory.id,
            type: 'superSubCategory',
            label: superSubCategory.super_sub_category_name,
            image: superSubCategory.image_url,
            link: `/product/super_sub_category_id=${superSubCategory.id}`
        }))
    ];

    return (
        <nav className="bg-black">
            <div className="flex flex-wrap items-center  justify-between mx-auto p-4 ">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://kardify.netlify.app/assets/images/logo.png" className="h-[3em] md:h-[3em] lg:h-[4em]" alt="Flowbite Logo" />
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
                    {/* <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon className='text-white' />
                    </IconButton>


                    

                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                        PaperProps={{ sx: { width: '70%' } }}
                        className='overflow-y-auto'
                    >
                        <div
                            role="presentation"
                            className="bg-black h-full text-white"
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                                <Typography variant="h6">
                                    <Image src="https://kardify.netlify.app/assets/images/logo.png" alt="logo" width={60} height={60} />
                                </Typography>
                                <IconButton onClick={toggleDrawer}>
                                    <CloseIcon className='text-white' />
                                </IconButton>
                            </Box>
                            <List className='bg-[#cfa946] rounded-[3px]'>
                                <Link href='/vehicle-selection' className='text-black px-4 hover:text-gray-300 text-[13px] font-[400]  md:text-[15px] md:font-[700] tracking-[1px] capitalize' >SHOP BY CAR</Link>
                            </List>
                            <List>
                                <Accordion className='bg-[#cfa946] text-black' expanded={openAccordion === 'ALLOY WHEELS'} onChange={() => handleAccordionToggle('ALLOY WHEELS')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography className='text-[13px]'>ALLOY WHEELS</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#cfa946] text-black overflow-y-auto'>
                                        <List>
                                            {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'ALLOY WHEELS').map((e, i) =>
                                                <Accordion key={i} className='bg-black text-white' expanded={openSubcategory === e.sub_category_name} onChange={() => handleSubcategoryToggle(e.sub_category_name)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                                        aria-controls={`panel-content`}
                                                        id={`panel-header`}
                                                    >
                                                        <Typography className='text-[13px]'>{e.sub_category_name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className='bg-black text-white overflow-y-auto z-10'>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'ALLOY WHEELS').map((es, i) =>
                                                            <List key={i} >
                                                                <Link href={`/product/super_sub_category_id=${es.id}/${encodeURIComponent(es.super_sub_category_name)}`} className="text-[13px] text-[600] text-white hover:text-[#e5bc56]">
                                                                    {es.super_sub_category_name}
                                                                </Link>
                                                            </List>
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                            <List>
                                <Accordion className='bg-[#cfa946] text-black' expanded={openAccordion === 'EXTERIOR'} onChange={() => handleAccordionToggle('EXTERIOR')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography className='text-[13px]'>EXTERIOR</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#cfa946] text-black overflow-y-auto'>
                                        <List>
                                            {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'EXTERIOR').map((e, i) =>
                                                <Accordion key={i} className='bg-black text-white' expanded={openSubcategory === e.sub_category_name} onChange={() => handleSubcategoryToggle(e.sub_category_name)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                                        aria-controls={`panel-content`}
                                                        id={`panel-header`}
                                                    >
                                                        <Typography className='text-[13px]'>{e.sub_category_name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className='bg-black text-white overflow-y-auto z-10'>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'EXTERIOR').map((es, i) =>
                                                            <List key={i} >
                                                                <Link href={`/product/super_sub_category_id=${es.id}/${encodeURIComponent(es.super_sub_category_name)}`} className="text-[13px] text-[600] text-white hover:text-[#e5bc56]">
                                                                    {es.super_sub_category_name}
                                                                </Link>
                                                            </List>
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                            <List>
                                <Accordion className='bg-[#cfa946] text-black' expanded={openAccordion === 'INTERIOR'} onChange={() => handleAccordionToggle('INTERIOR')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography className='text-[13px]'>INTERIOR</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#cfa946] text-black overflow-y-auto'>
                                        <List>
                                            {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'INTERIOR').map((e, i) =>
                                                <Accordion key={i} className='bg-black text-white' expanded={openSubcategory === e.sub_category_name} onChange={() => handleSubcategoryToggle(e.sub_category_name)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                                        aria-controls={`panel-content`}
                                                        id={`panel-header`}
                                                    >
                                                        <Typography className='text-[13px]'>{e.sub_category_name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className='bg-black text-white overflow-y-auto z-10'>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'INTERIOR').map((es, i) =>
                                                            <List key={i} >
                                                                <Link href={`/product/super_sub_category_id=${es.id}/${encodeURIComponent(es.super_sub_category_name)}`} className="text-[13px] text-[600] text-white hover:text-[#e5bc56]">
                                                                    {es.super_sub_category_name}
                                                                </Link>
                                                            </List>
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                            <List>
                                <Accordion className='bg-[#cfa946] text-black' expanded={openAccordion === 'CAR CARE'} onChange={() => handleAccordionToggle('CAR CARE')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography className='text-[13px]'>CAR CARE</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#cfa946] text-black overflow-y-auto'>
                                        <List>
                                            {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'CAR CARE').map((e, i) =>
                                                <Accordion key={i} className='bg-black text-white' expanded={openSubcategory === e.sub_category_name} onChange={() => handleSubcategoryToggle(e.sub_category_name)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                                        aria-controls={`panel-content`}
                                                        id={`panel-header`}
                                                    >
                                                        <Typography className='text-[13px]'>{e.sub_category_name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className='bg-black text-white overflow-y-auto z-10'>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'CAR CARE').map((es, i) =>
                                                            <List key={i} >
                                                                <Link href={`/product/super_sub_category_id=${es.id}/${encodeURIComponent(es.super_sub_category_name)}`} className="text-[13px] text-[600] text-white hover:text-[#e5bc56]">
                                                                    {es.super_sub_category_name}
                                                                </Link>
                                                            </List>
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                            <List>
                                <Accordion className='bg-[#cfa946] text-black' expanded={openAccordion === 'LIGHTS'} onChange={() => handleAccordionToggle('LIGHTS')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='text-white' />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography className='text-[13px]'>LIGHTS</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#cfa946] text-black overflow-y-auto'>
                                        <List>
                                            {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'LIGHTS').map((e, i) =>
                                                <List key={i} className='bg-black text-white p-2'>
                                                    <Link href={`/product/sub_category_id=${e.id}`} className="text-[13px] text-[600] text-white hover:text-[#e5bc56]">
                                                        {e.sub_category_name}
                                                    </Link>
                                                </List>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                            <Divider />
                        </div>
                    </Drawer>
                </div>

                <div className='w-full block md:hidden lg:hidden py-2'>
                        <Autocomplete
                            options={mergedOptions}
                            getOptionLabel={(option) => option.label}
                            noOptionsText="No Products Found"
                            renderOption={(props, option) => (
                                <Link href={option.link ? option.link : '#'}>
                                    <div {...props} >
                                        <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${option.image}`} alt={option.label} style={{ marginRight: '8px', width: '30px', height: '30px' }} />
                                        <span className='text-[14px] text-gray-700 font-[600]'>{option.label}</span>
                                    </div>
                                </Link>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search"
                                    className='w-full !text-[14px]'
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        sx: { fontColor: 'red', height: '55px', borderRadius: '10px' }
                                    }}
                                />
                            )}
                        />
                    </div>

                <div id="mega-menu" className={`!w-[70%] items-center justify-between w-full md:flex gap-8 md:w-auto md:order-1  ${dropdownOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col items-center mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <Link href="/vehicle-selection/" className="text-[13px] text-[600] text-white hover:text-[#e5bc56] " aria-current="page">SHOP BY CAR</Link>
                        </li>
                        <li>
                            <button onClick={() => toggleDropdown('alloy')} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                ALLOY WHEELS
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => toggleDropdown('exterior')} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                EXTERIOR
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] justify-evenly overflow-scroll h-[300px] ${dropdownOpen === 'exterior' ? 'block' : 'hidden'} md:grid-cols-3 border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'EXTERIOR').map((e, index) =>
                                <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={index}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'EXTERIOR').length > 0 ?
                                                    <>
                                                        <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'EXTERIOR').map((ee, index) =>
                                                            <li key={index}>
                                                                <Link href={`/product/super_sub_category_id=${ee.id}/${encodeURIComponent(ee.super_sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {ee.super_sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                    :
                                                    <>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'EXTERIOR').length === 0 && (
                                                            <li>
                                                                <Link href={`/product/sub_category_id=${e.id}/${encodeURIComponent(e.sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {e.sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                }

                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                        <li>
                            <button onClick={() => toggleDropdown('interior')} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                INTERIOR
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] justify-evenly overflow-scroll h-[300px] ${dropdownOpen === 'interior' ? 'block' : 'hidden'} md:grid-cols-3 border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'INTERIOR').map((e, i) =>
                                    <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={i}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'INTERIOR').length > 0 ?
                                                    <>
                                                        <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'INTERIOR').map((ee, index) =>
                                                            <li key={index}>
                                                                <Link href={`/product/super_sub_category_id=${ee.id}/${encodeURIComponent(ee.super_sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {ee.super_sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                    :
                                                    <>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'INTERIOR').length === 0 && (
                                                            <li>
                                                                <Link href={`/product/sub_category_id=${e.id}/${encodeURIComponent(e.sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {e.sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                }

                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                        <li>
                            <button onClick={() => toggleDropdown('carcare')} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                CAR CARE
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] justify-evenly overflow-scroll h-[300px] ${dropdownOpen === 'carcare' ? 'block' : 'hidden'} md:grid-cols-3 border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'CAR CARE').map((e, i) =>
                                    <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={i}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'CAR CARE').length > 0 ?
                                                    <>
                                                        <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'CAR CARE').map((ee, index) =>
                                                            <li key={index}>
                                                                <Link href={`/product/super_sub_category_id=${ee.id}/${encodeURIComponent(ee.super_sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {ee.super_sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                    :
                                                    <>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'CAR CARE').length === 0 && (
                                                            <li>
                                                                <Link href={`/product/sub_category_id=${e.id}/${encodeURIComponent(e.sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {e.sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                }

                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                        <li>
                            <button onClick={() => toggleDropdown('lights')} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center text-[13px] text-[600] text-white hover:text-[#e5bc56] ">
                                LIGHTS
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10  w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px]  grid grid-cols-4 gap-4 justify-between overflow-scroll h-[300px] ${dropdownOpen === 'lights' ? 'block' : 'hidden'} border-gray-700`}>
                                {subCategoryData && subCategoryData.filter(e => e.category.category_name === 'LIGHTS').map((e, i) =>
                                    <>
                                        <div className="p-4 pb-0  md:pb-4 text-white" key={i}>
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'LIGHTS').length > 0 ?
                                                    <>
                                                        <span className='text-gray-700 font-[600] hover:text-blue-600 py-2'>{e.sub_category_name}</span>
                                                        <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${e.image_url}`} alt={e.sub_category_name} width={200} height={200} />
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'LIGHTS').map((ee, index) =>
                                                            <li key={index}>
                                                                <Link href={`/product/super_sub_category_id=${ee.id}/${encodeURIComponent(ee.super_sub_category_name)}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    {ee.super_sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                    :
                                                    <>
                                                        {superSubCategoryData && superSubCategoryData.filter(ee => ee.subCategory.sub_category_name === e.sub_category_name && ee.category.category_name === 'LIGHTS').length === 0 && (
                                                            <li>
                                                                <Link href={`/product/sub_category_id=${e.id}/${encodeURIComponent(e.sub_category_name)}`} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${e.image_url}`} alt={e.sub_category_name} width={30} height={30} />
                                                                    {e.sub_category_name}
                                                                </Link>
                                                            </li>
                                                        )}

                                                    </>
                                                }

                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>

                    <div className='w-[30%]'>
                        <Autocomplete
                            options={mergedOptions}
                            getOptionLabel={(option) => option.label}
                            noOptionsText="No Products Found"
                            renderOption={(props, option) => (
                                <Link href={option.link ? option.link : '#'}>
                                    <div {...props} >
                                        <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${option.image}`} alt={option.label} style={{ marginRight: '8px', width: '30px', height: '30px' }} />
                                        <span className='text-[14px] text-gray-700 font-[600]'>{option.label}</span>
                                    </div>
                                </Link>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search"
                                    className='w-full !text-[14px]'
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        sx: { fontColor: 'red', height: '55px', borderRadius: '10px' }
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>


            </div>
        </nav>


    )
}

export default Navbar1
