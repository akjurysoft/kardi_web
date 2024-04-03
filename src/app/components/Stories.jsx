'use client'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import axios from '../../../axios';

SwiperCore.use([Navigation, Pagination]);
const Stories = () => {

    const [storyData, setStoryData] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchStoryData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchStoryData = useCallback(
        () => {
            axios.get(`/api/fetch-all-stories-customer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setStoryData(res.data.allStories)
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
            <section className="py-20 bg-black">
                <div className="container mx-auto">
                    <div className="title stories-title text-center flex flex-col items-center space-y-[20px]">
                        <h1 className='text-[2.5cm] text-white font-bold lg:text-[4cm] xl:text-[5cm]'>STORIES</h1>
                        <h3 className="text-[1.5cm] font-bold lg:text-[2.5cm] xl:text-[3cm]">Driving Social Network</h3>
                        <Link href="/stories" className="btn">
                            View Stories
                        </Link>
                    </div>

                    <div className="swiper-container py-[80px]">
                        <div className="swiper-wrapper">
                            {storyData.length > 0 ?
                                <>
                                    {storyData.map((story, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="item">
                                                <div className="item-box">
                                                    {story.story_type === 'image' ? (
                                                        <div className="thumbnail tmb">
                                                            <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${story.image_url}`} title={story.story_heading} alt={story.story_heading} />
                                                        </div>
                                                    ) : (
                                                        <div className="thumbnail tmb">
                                                            <video src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${story.image_url}`} title={story.story_heading} className='w-full h-full'></video>
                                                        </div>
                                                    )}
                                                    <div className="item-box-dec">
                                                        <div className="homeStoryDescription text-[14px]">{story.description.slice(0, 50)}...</div>
                                                        <Link href="#" className='btn-link'>Read More</Link>
                                                        {/* {story.upload_type === 1 && (
                                                    <a className="btn btn-link" href={`./stories/customer_story/${story.id}/${story.story_heading}`}>
                                                        <i className="fa fa-angle-right"></i> Read more
                                                    </a>
                                                )} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </>
                                :
                                <div className='flex justify-center w-full'>
                                    <span className='text-center text-[18px] text-white font-[600]'>No Stories Found</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Stories
