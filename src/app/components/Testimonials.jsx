import React, { useCallback, useEffect, useState } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { FaQuoteLeft } from "react-icons/fa";
import axios from '../../../axios';
import { useSnackbar } from '../SnackbarProvider';
import { Rating } from '@mui/material';

SwiperCore.use([Navigation, Pagination]);

const Testimonials = () => {
    const { openSnackbar } = useSnackbar();


    const [testimonialData, setTestimonialData] = useState([])
    const [expandedIndex, setExpandedIndex] = useState(null);
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchStoryData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchStoryData = useCallback(
        () => {
            axios.get(`/api/fetch-all-testimonials-customers`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setTestimonialData(res.data.testimonials)
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                        // router.push('/login')
                    }
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

    useEffect(() => {
        const swiper = new SwiperCore('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: false,
            autoplay: {
                delay: 6000,
                disableOnInteraction: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }, []);
    return (
        <>
            {testimonialData.length > 0 &&(
            <section className="py-[60px]">
                <div className="container mx-auto">
                    <div className="title text-center">
                        <h3>Testimonials</h3>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
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
                        {testimonialData && testimonialData.map((item, index) =>
                            <SwiperSlide key={index}>
                                <div className="item">
                                    <div className="single-testimonial-item">
                                        <div className="testimonial-dec overflow-scroll">
                                            <FaQuoteLeft />
                                            <p className='text-[#605e5e] text-[13px] font-[500] '>
                                                {item.description.length > 330 && expandedIndex !== index
                                                    ? `${item.description.slice(0, 330)}...`
                                                    : item.description}
                                            </p>
                                            {item.description.length > 200 && (
                                                <button
                                                    onClick={() =>
                                                        setExpandedIndex(expandedIndex === index ? null : index)
                                                    }
                                                    className="text-[13px] text-[#faaf00] font-[600] hover:opacity-80"
                                                >
                                                    {expandedIndex === index ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </div>
                                        <div className="media flex flex-col items-left space-x-2">
                                            <div className="media-left">
                                                <Rating readOnly value={item.rating} />
                                                <h4 className='text-[14px] text-black capitalize'>{item.customer.fullname}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </section>
            )}
        </>
    )
}

export default Testimonials
