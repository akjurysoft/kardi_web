import React, { useCallback, useEffect, useState } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { FaQuoteLeft } from "react-icons/fa";
import axios from '../../../axios';
import { useSnackbar } from '../SnackbarProvider';
import { Rating } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const TopCategories = () => {
    const { openSnackbar } = useSnackbar();


    const [categoryData, setCategoryData] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchCategoryData()
            fetchSubCategoryData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchCategoryData = useCallback(
        () => {
            axios.get(`/api/fetch-categories-customer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setCategoryData(res.data.categories)
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                    }
                })
        },
        [],
    )

    const [subCategoryData, setSubCategoryData] = useState([])
    const fetchSubCategoryData = useCallback(
        () => {
            axios.get(`/api/fetch-subcategories-customers`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setSubCategoryData(res.data.subcategories)
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                    }
                })
        },
        [],
    )

    const mergedData = [...categoryData, ...subCategoryData];
    return (
        <>

            {mergedData && mergedData.length > 0 && (
                <section className="py-[20px]">
                    <div className="container mx-auto">
                        <div className="title text-center mb-[20px]">
                            <h3>Top Selling Products</h3>
                        </div>
                        <Swiper
                            slidesPerView={3}
                            modules={[Autoplay]}
                            autoplay={{ delay: 5000 }}
                            spaceBetween={10}
                            loop={true}
                            navigation={false}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 6,
                                },
                            }}
                        >
                            {mergedData && mergedData.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <Link href={!item.category_name ? `/product/sub_category_id=${item.id}` : `/product/category_id=${item.id}`}>
                                        <div className="py-[20px] flex flex-col items-center">
                                            {item.image_url && <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${item.image_url}`} width={80} height={70} alt="image" className='rounded-[18px]  h-[50px] object-cover md:h-[70px] lg:h-[70px]' />}
                                            <div className="text-center py-3 capitalize">
                                                <h3 className="font-[500] text-[#000]">{item.category_name && item.category_name}</h3>
                                                <h3 className="font-[500] text-[#000]">{item.sub_category_name && item.sub_category_name}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </section>
            )}
        </>
    )
}

export default TopCategories
