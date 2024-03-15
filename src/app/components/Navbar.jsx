'use client'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Avatar, Badge, Hidden, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Person, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Dropdown, Navbar } from "flowbite-react";
const Navbar1 = () => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        //         <nav class="bg-gray-800">
        //             <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        //                 <div class="relative flex h-16 items-center justify-between">
        //                     <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        //                         <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
        //                             <span class="absolute -inset-0.5"></span>
        //                             <span class="sr-only">Open main menu</span>
        //                             <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        //                             </svg>
        //                             <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        //                             </svg>
        //                         </button>
        //                     </div>
        //                     <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        //                         <div class="flex flex-shrink-0 items-center">
        //                             <img class="h-8 w-auto" src="https://kardify.netlify.app/assets/images/logo.png" alt="Your Company" />
        //                         </div>
        //                         <div class="hidden sm:ml-6 sm:block">
        //                             <div class="flex space-x-4">
        //                                 {/* <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a> */}
        //                                 <div class="relative group">
        //                                     <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Shop By Car</a>
        //                                     <div class="absolute z-10 hidden bg-gray-800 text-white rounded-md py-1 mt-2 group-hover:block">
        //                                         <a href="#" class="block px-4 py-2 text-sm">Dropdown Item 1</a>
        //                                         <a href="#" class="block px-4 py-2 text-sm">Dropdown Item 2</a>
        //                                         <a href="#" class="block px-4 py-2 text-sm">Dropdown Item 3</a>
        //                                     </div>
        //                                 </div>
        //                                 <details class="relative" id="dashboard-dropdown">
        //                                     <summary class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Alloy Wheels</summary>
        //                                     <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="dashboard-dropdown">
        //                                         <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Dashboard 1</a>
        //                                         <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Dashboard 2</a>
        //                                     </div>
        //                                 </details>
        //                                 <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Exteriors</a>
        //                                 <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Interiors</a>
        //                                 <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Installation</a>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        //                         <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        //                             <span class="absolute -inset-1.5"></span>
        //                             <span class="sr-only">View notifications</span>
        //                             <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        //                             </svg>
        //                         </button>

        //                         <div class="relative ml-3">
        //                             <div>
        //                                 <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        //                                     <span class="absolute -inset-1.5"></span>
        //                                     <span class="sr-only">Open user menu</span>
        //                                     <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        //                                 </button>
        //                             </div>
        //                             {/* <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

        // <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
        // <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
        // <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
        // </div> */}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             <div class="sm:hidden" id="mobile-menu">
        //                 <div class="space-y-1 px-2 pb-3 pt-2">
        //                     <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
        //                     <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
        //                     <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
        //                     <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
        //                 </div>
        //             </div>
        //         </nav>

        // <AppBar position="static" className='bg-black'>
        //     <Toolbar>
        //         <Typography variant="h6" style={{ flexGrow: 1 }}>
        //             <Image src="https://kardify.netlify.app/assets/images/logo.png" height={50} width={50} alt='logo' />
        //         </Typography>

        //         <Hidden mdUp>
        //             <div>
        //                 <IconButton color="inherit" onClick={handleMenuOpen}>
        //                     <MenuIcon />
        //                 </IconButton>
        //                 <Menu
        //                     anchorEl={anchorEl}
        //                     keepMounted
        //                     open={Boolean(anchorEl)}
        //                     onClose={handleMenuClose}
        //                 >
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 1</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 2</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 3</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 4</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 5</MenuItem>
        //                 </Menu>
        //             </div>
        //         </Hidden>

        //         <Hidden smDown>
        //             <div>
        //                 <IconButton color="inherit" onClick={handleMenuOpen}>
        //                     <MenuIcon />
        //                 </IconButton>
        //                 <Menu
        //                     anchorEl={anchorEl}
        //                     keepMounted
        //                     open={Boolean(anchorEl)}
        //                     onClose={handleMenuClose}
        //                 >
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 1</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 2</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 3</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 4</MenuItem>
        //                     <MenuItem onClick={handleMenuClose}>Menu Item 5</MenuItem>
        //                 </Menu>
        //             </div>

        //             <div style={{ flexGrow: 1 }}>
        //                 <Search />
        //             </div>
        //             <IconButton color="inherit">
        //                 <Badge badgeContent={3} color="secondary">
        //                     <ShoppingCartIcon />
        //                 </Badge>
        //             </IconButton>

        //             <IconButton color="inherit">
        //                 <Avatar>
        //                     <Person />
        //                 </Avatar>
        //             </IconButton>
        //         </Hidden>
        //     </Toolbar>
        // </AppBar>



        // <nav className="bg-gray-800">
        //     <div className="max-w-7xl mx-auto px-4">
        //         <div className="flex items-center justify-between h-16">
        //             {/* Logo */}
        //             <div className="flex-shrink-0">
        //                 <a href="https://flowbite.com/" className="flex items-center">
        //                     <img
        //                         className="block lg:hidden h-8 w-auto"
        //                         src="https://flowbite.com/docs/images/logo.svg"
        //                         alt="Workflow"
        //                     />
        //                     <img
        //                         className="hidden lg:block h-8 w-auto"
        //                         src="https://flowbite.com/docs/images/logo.svg"
        //                         alt="Workflow"
        //                     />
        //                     <span className="ml-2 text-white text-xl font-semibold">Flowbite</span>
        //                 </a>
        //             </div>

        //             {/* Menu */}
        //             <div className="hidden md:block">
        //                 <div className="ml-10 flex items-baseline space-x-4">
        //                     <a href="/navbars" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        //                         Home
        //                     </a>

        //                     <a href="/navbars" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        //                         About
        //                     </a>

        //                     <a href="/navbars" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onMouseEnter={() => setShowMegaMenu(true)}
        //                         onMouseLeave={() => setShowMegaMenu(false)}>
        //                         Services
        //                     </a>

        //                     <a href="/navbars" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        //                         Pricing
        //                     </a>

        //                     <a href="/navbars" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        //                         Contact
        //                     </a>
        //                 </div>
        //             </div>

        //             <div className="hidden md:block">
        //                 <div className="flex items-center ml-4 md:ml-6">
        //                     <input
        //                         type="text"
        //                         className="bg-gray-600 focus:outline-none focus:bg-white focus:text-gray-900 rounded-md px-3 py-1"
        //                         placeholder="Search"
        //                     />
        //                     <button className="ml-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md">
        //                         Search
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Mega Menu */}
        //     {showMegaMenu && (
        //         <div className="hidden md:block bg-gray-800">
        //             <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        //                 <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        //                     <div className="col-span-2 md:col-span-1">
        //                         <h2 className="text-gray-300 text-sm font-medium mb-2">Shop by Car</h2>
        //                         <ul className="space-y-2">
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Sedan</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">SUV</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Truck</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Van</a></li>
        //                         </ul>
        //                     </div>
        //                     <div className="col-span-2 md:col-span-1">
        //                         <h2 className="text-gray-300 text-sm font-medium mb-2">Installation</h2>
        //                         <ul className="space-y-2">
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Roof Racks</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Running Boards</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Tow Hitch</a></li>
        //                         </ul>
        //                     </div>
        //                     <div className="col-span-2 md:col-span-1">
        //                         <h2 className="text-gray-300 text-sm font-medium mb-2">Interior</h2>
        //                         <ul className="space-y-2">
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Floor Mats</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Seat Covers</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Dash Covers</a></li>
        //                         </ul>
        //                     </div>
        //                     <div className="col-span-2 md:col-span-1">
        //                         <h2 className="text-gray-300 text-sm font-medium mb-2">Exterior</h2>
        //                         <ul className="space-y-2">
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Car Covers</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Windshield Wipers</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Bug Deflectors</a></li>
        //                         </ul>
        //                     </div>
        //                     <div className="col-span-2 md:col-span-1">
        //                         <h2 className="text-gray-300 text-sm font-medium mb-2">Car Care</h2>
        //                         <ul className="space-y-2">
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Car Wash</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Wax & Polish</a></li>
        //                             <li><a href="#" className="text-gray-400 hover:text-white">Detailing Kits</a></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </nav>

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://kardify.netlify.app/assets/images/logo.png" className="h-8" alt="Flowbite Logo" />
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
                    <button onClick={toggleDropdown} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded={isDropdownOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div id="mega-menu" className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <a href="#" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">SHOP BY CARS</a>
                        </li>
                        <li>
                            <button onClick={toggleDropdown} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                ALLOY WHEELS
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="mega-menu-dropdown" className={`absolute z-10 flex w-[999px] gap-[20px] text-sm bg-white border left-[300px] top-[70px] ${isDropdownOpen ? 'block' : 'hidden'} md:grid-cols-3 dark:border-gray-700`}>
                                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                    <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Library
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Resources
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Pro Version
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                    <ul className="space-y-4">
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Newsletter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Playground
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                License
                                            </a>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                    <ul className="space-y-4">
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Newsletter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Playground
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                License
                                            </a>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                    <ul className="space-y-4">
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Newsletter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                Playground
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                License
                                            </a>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">EXTERIORS</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">INTERIORS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar1
