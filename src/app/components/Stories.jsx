'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);
const Stories = () => {
    const stories = [
        {
            story_img: 'https://kardify1.b2cinfohosting.in/uploads/story/banner/PHOTO-2023-04-20-19-55-00.jpg',
            story_heading: 'Story 1',
            story_description: '<p>Description 1</p>',
            upload_type: 1,
            id: 1,
        },
        {
            story_img: 'https://kardify1.b2cinfohosting.in/uploads/story/banner/sdfdsvdsvdsv.jpg',
            story_heading: 'Story 2',
            story_description: '<p>Description 2</p>',
            upload_type: 2,
            id: 2,
        },
        {
            story_img: 'https://kardify1.b2cinfohosting.in/uploads/story/banner/1694412035799WhatsApp%20Image%202023-09-11%20at%2011.30.02%20AM.jpeg',
            story_heading: 'Story 3',
            story_description: '<p>Description 3</p>',
            upload_type: 1,
            id: 3,
        },
        {
            story_img: 'https://kardify1.b2cinfohosting.in/uploads/story/banner/sdfdsvdsv.jpg',
            story_heading: 'Story 3',
            story_description: '<p>Description 3</p>',
            upload_type: 1,
            id: 4,
        },
        {
            story_img: 'https://kardify1.b2cinfohosting.in/uploads/story/banner/PHOTO-2023-04-20-19-55-00.jpg',
            story_heading: 'Story 3',
            story_description: '<p>Description 3</p>',
            upload_type: 1,
            id: 5,
        },
    ];


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
                    <div className="title stories-title text-center">
                        <h1>Stories</h1>
                        <h3>Driving Social Network</h3>
                        <Link href="/stories" className="btn">
                            View Stories
                        </Link>
                    </div>

                    <div className="swiper-container py-[80px]">
                        <div className="swiper-wrapper">
                            {stories.map((story, index) => (
                                <SwiperSlide key={index}>
                                    <div className="item">
                                        <div className="item-box">
                                            <div className="thumbnail tmb">
                                                <img src={story.story_img} title={story.story_heading} alt={story.story_heading} />
                                            </div>
                                            <div className="item-box-dec">
                                                <div dangerouslySetInnerHTML={{ __html: story.story_description }} className="homeStoryDescription"></div>
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
                        </div>
                        {/* <div className="swiper-pagination"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Stories
