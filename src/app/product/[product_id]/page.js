'use client'
import Navbar from "@/app/components/Navbar";
import { Box, Breadcrumbs, LinearProgress, Pagination, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
    AiFillHeart,
    AiOutlineClose,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import Footer from "@/app/components/Footer";
import axios from "../../../../axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useSnackbar } from "@/app/SnackbarProvider";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/CartContext";

const Page = ({ params }) => {
    const [cartCounter, setCartCounter] = useContext(CartContext)
    const decodedProductId = decodeURIComponent(params.product_id);
    const { openSnackbar } = useSnackbar();
    const router = useRouter()

    const [productData, setProductData] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchProductData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchProductData = useCallback(
        () => {
            axios.get(`/api/get-products-customer?${decodedProductId}`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setProductData(res.data.products)
                    } 
                    // else if (res.data.message === 'Session expired') {
                    //     openSnackbar(res.data.message, 'error');
                    //     router.push('/login')
                    // }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],
    )

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const totalRows = productData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = productData.filter((e) =>
        e.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const paginatedRows = filteredRows.slice(startIndex, endIndex);


    const convertInRupee = (number) => {
        return number.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    const addToCart = (data) => {
        axios.post('/api/add-to-cart', {
            product_id: data.id,
            quantity: 1
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    setCartCounter(prev => prev + 1)
                } else {
                    openSnackbar('Login Requires', 'error')
                    router.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    // wishlist Logic
    const [wishListData, setWishListData] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchWishListData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchWishListData = useCallback(
        () => {
            axios.get(`/api/get-all-wishlists`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken')
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setWishListData(res.data.data)
                    } 
                    // else if (res.data.message === 'Session expired') {
                    //     openSnackbar(res.data.message, 'error');
                    //     router.push('/login')
                    // }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],
    )

    const addToWish = (data) => {
        axios.post('/api/add-to-wishlist', {
            product_id: data.id,
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    fetchWishListData()
                } else {
                    openSnackbar('Login Requires', 'error')
                    router.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const removeFromWish = (data) => {
        axios.post('/api/remove-from-wishlist', {
            product_id: data.id,
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    fetchWishListData()
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const isProductInWishlist = (productId) => {
        return wishListData.some(item => item.product_id === productId);
    }

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
                        {paginatedRows.length > 0 ?
                            <>
                                {paginatedRows.map((product, index) => (
                                    <li key={index} className="p-[10px] bg-[#FAF6F6] z-[0]">
                                        <div className="nc-ProductCard relative flex flex-col bg-transparent ">
                                            <div className="relative flex-shrink-0 bg-slate-50 h-[180px] lg:h-[250px] rounded-3xl overflow-hidden z-0 group">
                                                <Swiper
                                                    key={index}
                                                    spaceBetween={50}
                                                    slidesPerView={1}
                                                    navigation={false}
                                                    pagination={{ clickable: true }}
                                                    loop={true}
                                                    className="h-full"
                                                >
                                                    {product.images.map((image, imageIndex) => (
                                                        <SwiperSlide key={imageIndex}>

                                                            <div className="aspect-w-11 aspect-h-12 w-full h-full">
                                                                <Link href={`/details/${image.product_id}`}>
                                                                    <Image
                                                                        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image.image_url}`}
                                                                        alt={image.id}
                                                                        width={300}
                                                                        height={300}
                                                                        className="object-cover w-full h-full drop-shadow-xl"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white  text-neutral-700  nc-shadow-lg absolute top-3 left-3 z-10">
                                                    <p className="w-5 h-5">
                                                        <AiFillHeart
                                                            onClick={() => {
                                                                if (isProductInWishlist(product.id)) {
                                                                    removeFromWish(product);
                                                                } else {
                                                                    addToWish(product);
                                                                }
                                                            }}
                                                            color={isProductInWishlist(product.id) ? '#E3BB54' : 'black'}
                                                        />
                                                    </p>
                                                </button>

                                                <span className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#E3BB54]  text-neutral-700  nc-shadow-lg absolute top-3 right-3 z-10">
                                                    {product.discount_type === "amount" ? (
                                                        <p className="w-[40px] text-[12px] font-[600]">₹{(product.discount)} <span className="text-[10px] font-[500] text-[#404040]">off</span></p>
                                                    ) : (
                                                        <p className="w-[40px] text-[12px] font-[600]">{product.discount}% <span className="text-[10px] font-[500] text-[#404040]">off</span></p>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                                                <div className="text-center">
                                                    <Link href="#" className='font-[500] text-[16px] text-center'>{product.product_name}</Link>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Rating name="read-only" value={product.rating} readOnly />
                                                </div>
                                                <div className="flex justify-center items-baseline gap-1">
                                                    {product.discount_type === "amount" ? (
                                                        <>
                                                            <span className="text-black font-[500] text-[20px]">
                                                                {convertInRupee(product.default_price - product.discount)}
                                                            </span>
                                                            <span className="text-[#bbb8b8] font-[500] text-[13px] line-through">
                                                                {convertInRupee(product.default_price)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-black font-[500] text-[20px]">
                                                                {convertInRupee(product.default_price * (1 - product.discount / 100))}
                                                            </span>
                                                            <span className="text-[#bbb8b8] font-[500] text-[13px] line-through">
                                                                {convertInRupee(product.default_price)}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2 justify-center bg-black hover:opacity-80 cursor-pointer py-[12px] px-[15px] text-white rounded-full" onClick={() => addToCart(product)}>
                                                    <FaShoppingCart />
                                                    <div className=" bottom-0  space-x-1.5 rtl:space-x-reverse flex justify-center opacity-1" >
                                                        Add to Cart
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </>
                            : <p>No Products Found</p>}
                    </ul>
                    {totalPages > 1 && (
                        <div className="flex justify-left mt-3">
                            <Pagination count={totalPages} page={page} onChange={handleChangePage} shape="rounded" />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
