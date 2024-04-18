import React, { useCallback, useEffect, useState } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import {  Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { FaQuoteLeft } from "react-icons/fa";
import axios from '../../../axios';
import { useSnackbar } from '../SnackbarProvider';
import { Rating } from '@mui/material';
import Link from 'next/link';

const Offer = () => {
    const { openSnackbar } = useSnackbar();


    const [offerDate, setOfferDate] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchOfferData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchOfferData = useCallback(
        () => {
            axios.get(`/api/get-all-discounts-like-offer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setOfferDate(res.data.discounts)
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

    // useEffect(() => {
    //     const swiper = new SwiperCore('.swiper-container', {
    //         slidesPerView: 1,
    //         spaceBetween: 10,
    //         loop: false,
    //         autoplay: {
    //             delay: 6000,
    //             disableOnInteraction: true,
    //         },
    //         breakpoints: {
    //             640: {
    //                 slidesPerView: 2,
    //             },
    //             768: {
    //                 slidesPerView: 2,
    //             },
    //             1024: {
    //                 slidesPerView: 3,
    //             },
    //         },
    //     });
    // }, []);
    return (
        <>
        {offerDate && offerDate.length > 0 && (
            <section className="py-[20px]">
                <div className="container mx-auto">
                    <div className="title text-center mb-[20px]">
                        <h3>Offers</h3>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        modules={[Autoplay]}
                        autoplay={{ delay: 5000 }}
                        spaceBetween={10}
                        loop={true}
                        navigation={false}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {offerDate && offerDate.map((item, index) =>
                            <SwiperSlide key={index}>
                                <Link href={`/offers/${item.id}`}>
                                    <div className="py-[20px]">
                                        {item.image && <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${item.image}`} alt="image" className='rounded-[18px] w-full h-[210px] object-cover md:h-[220px] lg:h-[220px]' />}
                                        <div className="text-center py-2 capitalize">
                                            <h3 className="font-bold text-[#000]">{item.discount_name}</h3>
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

export default Offer
