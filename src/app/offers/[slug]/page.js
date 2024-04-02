'use client'
import { Breadcrumbs, Pagination, Rating } from '@mui/material'
import axios from '../../../../axios'
import React, { useCallback, useEffect, useState } from 'react'
import Footer from '@/app/components/Footer'
import Navbar1 from '@/app/components/Navbar'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillHeart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'

const Page = ({ params }) => {
    const discount_id = params.slug


    const [offerData, setOfferDate] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchOfferData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchOfferData = useCallback(
        () => {
            axios.get(`/api/get-all-discounts-like-offer?discount_id=${discount_id}`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setOfferDate(res.data.discounts)
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                    }
                })
        },
    )


    useEffect(() => {
        if (offerData && offerData.length > 0 && offerData[0]?.product_discount_associations) {
            const productsData = offerData && offerData.map(item => item.product);
            setProducts(productsData);
        } else  {
            let queryParams = '';

            if (offerData[0]?.product_brand_id) {
                queryParams += `product_brand_id=${offerData[0]?.product_brand_id}&`;
            }
            if (offerData[0]?.category_id) {
                queryParams += `category_id=${offerData[0]?.category_id}&`;
            }
            if (offerData[0]?.subcategory) {
                queryParams += `sub_category_id=${offerData[0]?.subcategory}&`;
            }
            if (offerData[0]?.superSubcategory) {
                queryParams += `super_sub_category_id=${offerData[0]?.superSubcategory}&`;
            }
            axios.get(`/api/get-products-customer?${queryParams}`)
                .then((res) => {
                    setProducts(res.data.products);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [offerData])

    console.log(products)
    return (
        <>
            <Navbar1 />

            {/* <div className="container mx-auto py-[20px]">
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
                Vehicle Selection
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
                                                <p className="w-[40px] text-[12px] font-[600] text-center">₹{(product.discount)} <span className="text-[10px] font-[500] text-[#404040]">off</span></p>
                                            ) : (
                                                <p className="w-[40px] text-[12px] font-[600] text-center">{product.discount}% <span className="text-[10px] font-[500] text-[#404040]">off</span></p>
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
    </div> */}

            <Footer />
        </>
    )
}

export default Page
