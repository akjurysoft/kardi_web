'use client'
import Image from "next/image";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Banners from "./components/Banners";
import Stories from "./components/Stories";
import Brands from "./components/Brands";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navbar1 from "./components/Navbar";
import Offer from "./components/Offer";
import TopCategories from "./components/TopCategories";

export default function Home() {
    const [anchorEl, setAnchorEl] = useState(null);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <>
            <Navbar1 />

            <Banners />

            <Stories />

            <TopCategories/>

            <Offer/>

            <Brands />

            <Testimonials />

            <Footer />
        </>
    );
}
