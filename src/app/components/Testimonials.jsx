import React, { useEffect } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { FaQuoteLeft } from "react-icons/fa";

SwiperCore.use([Navigation, Pagination]);

const Testimonials = () => {

    useEffect(() => {
        // Initialize Swiper when component mounts
        const swiper = new SwiperCore('.swiper-container', {
            slidesPerView: 1, // Number of slides per view
            spaceBetween: 10, // Space between slides (in pixels)
            loop: false,
            autoplay: {
                delay: 6000, // Delay between slides in milliseconds
                disableOnInteraction: true, // Enable autoplay even when user interacts with the carousel
            },
            breakpoints: {
                // Define breakpoints for different screen sizes
                640: {
                    slidesPerView: 2, // Show 2 slides per view on screens with width 640px or less
                },
                768: {
                    slidesPerView: 2, // Show 3 slides per view on screens with width 768px or less
                },
                1024: {
                    slidesPerView: 3, // Show 4 slides per view on screens with width 1024px or less
                },
            },
        });
    }, []);
    return (
        <>
            {/* <section className="py-[60px]">
                <div className="container-fluid">
                    <div className="title text-center">
                        <h3>Testimonials</h3>
                    </div>
                    <div className="tastimonial">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="item">
                                <div className="single-testimonial-item">
                                    <div className="testimonial-dec">
                                        <p>The container className also includes responsive variants like md:container by default that allow you to make something behave like a container at only a certain breakpoint and up:</p>
                                    </div>
                                    <div className="media flex items-center space-x-2">
                                        <div className="media-left">
                                            <div className="user-img"><img src="#" /></div>
                                        </div>
                                        <div className="media-body">
                                            <div className="user-name">
                                                <h4>Subham</h4>
                                                <h5>Jena</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-testimonial-item">
                                    <div className="testimonial-dec">
                                        <p>The container className also includes responsive variants like md:container by default that allow you to make something behave like a container at only a certain breakpoint and up:</p>
                                    </div>
                                    <div className="media flex items-center space-x-2">
                                        <div className="media-left">
                                            <div className="user-img"><img src="#" /></div>
                                        </div>
                                        <div className="media-body">
                                            <div className="user-name">
                                                <h4>Subham</h4>
                                                <h5>Jena</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-testimonial-item">
                                    <div className="testimonial-dec">
                                        <p>The container className also includes responsive variants like md:container by default that allow you to make something behave like a container at only a certain breakpoint and up:</p>
                                    </div>
                                    <div className="media flex items-center space-x-2">
                                        <div className="media-left">
                                            <div className="user-img"><img src="#" /></div>
                                        </div>
                                        <div className="media-body">
                                            <div className="user-name">
                                                <h4>Subham</h4>
                                                <h5>Jena</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

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
                    <SwiperSlide>
                        <div className="item">
                            <div className="single-testimonial-item">
                                <div className="testimonial-dec">
                                <FaQuoteLeft />
                                    <p className='text-[#605e5e] text-[13px] font-[500] '>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                                <div className="media flex items-center space-x-2">
                                    <div className="media-left">
                                        <div className="user-img "><img src="https://kardify1.b2cinfohosting.in/uploads/testimonial/banner/download%20(8).jpg" className='h-[50px] w-[50px] rounded-full'/></div>
                                    </div>
                                    <div className="media-body">
                                        <div className="user-name">
                                            <h4 className='text-[14px] text-black'>Subham</h4>
                                            <h5 className='text-[12px] text-[#5a5a5a]'>Jena</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
        </>
    )
}

export default Testimonials
