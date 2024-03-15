'use client'
import Navbar from "@/app/components/Navbar";
import { Box, Breadcrumbs, LinearProgress, Pagination, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
    AiFillHeart,
    AiOutlineClose,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import Footer from "@/app/components/Footer";

const Page = () => {
    const products = [
        {
            id: 1,
            name: "Product 1",
            discount: 15,
            rating: 3,
            description: "This is product 1 description.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Product 2",
            discount: 10,
            rating: 5,
            description: "This is product 2 description.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Product 3",
            discount: 25,
            rating: 4,
            description: "This is product 3 description.",
            image: "https://via.placeholder.com/150",
        },
    ];

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const totalRows = products.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = products.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const paginatedRows = filteredRows.slice(startIndex, endIndex);

    return (
        <>
            <Navbar />

            <div className="container mx-auto py-[20px]">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href='#'
                        aria-current="page"
                    >
                        Products
                    </Link>
                </Breadcrumbs>
            </div>

            <div className="container mx-auto">
                <div className="py-[50px]">
                    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {paginatedRows.map((product, index) => (
                            <li key={index} className="p-[10px] bg-[#FAF6F6] z-[0]">
                                <div className="nc-ProductCard relative flex flex-col bg-transparent ">
                                    <div className="relative flex-shrink-0 bg-slate-50 h-[180px] lg:h-[250px] rounded-3xl overflow-hidden z-0 group">
                                        <div className=" aspect-w-11 aspect-h-12 w-full h-0">
                                            <Link href="https://kardify1.b2cinfohosting.in/uploads/products/IA-AF-IN-022_1.jpg" className="block">
                                                <Image
                                                    src="https://kardify1.b2cinfohosting.in/uploads/products/IA-AF-IN-023_1.jpg"
                                                    alt="subham jena"
                                                    width={300}
                                                    height={300}
                                                    className="object-cover w-full !h-[80%] drop-shadow-xl"
                                                />
                                            </Link>
                                        </div>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white  text-neutral-700  nc-shadow-lg absolute top-3 left-3 z-10">
                                            <p className="w-5 h-5">
                                                <AiFillHeart />
                                            </p>
                                        </button>
                                        <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E3BB54]  text-neutral-700  nc-shadow-lg absolute top-3 right-3 z-10">
                                            <p className="w-5 h-5 text-[12px]">{product.discount}%</p>
                                        </span>
                                    </div>
                                    <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                                        <div className="text-center">
                                            <Link href="#" className='font-[500] text-[16px] text-center'>{product.name}</Link>
                                        </div>
                                        <div className="flex justify-center">
                                            <Rating name="read-only" value={product.rating} readOnly />
                                        </div>
                                        <div className="flex justify-center items-baseline gap-1">
                                            <span className="text-black font-[500] text-[20px]">
                                                ₹400
                                            </span>
                                            <span className="text-[#bbb8b8] font-[500] text-[13px] line-through">
                                                ₹600
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 justify-center bg-black hover:opacity-80 cursor-pointer py-[12px] px-[15px] text-white rounded-full">
                                            <FaShoppingCart />
                                            <div className=" bottom-0  space-x-1.5 rtl:space-x-reverse flex justify-center opacity-1">
                                                Add to Cart
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex justify-left mt-3'>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                            shape="rounded"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
