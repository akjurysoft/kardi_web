import { useRouter } from 'next/navigation';
import axios from '../../../axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Script from 'next/script';

import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination } from 'swiper/modules';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';


const Banners = () => {
    const router = useRouter();

    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchBannerData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchBannerData = useCallback(
        () => {
            axios.get(`/api/get-banners-customer`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setBannerData(res.data.banners)
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



    const handleClick = (banner) => {
        let href = '';

        if (banner.banner_type === 'category') {
            href += `/product/category_id=${banner.category_id}`;
            if (banner.sub_category_id) {
                href += `&sub_category_id=${banner.sub_category_id}`;
            } if (banner.super_sub_category_id) {
                href += `&super_sub_category_id=${banner.super_sub_category_id}`;
            }
        } if (banner.banner_type === 'product') {
            href += `/banner-products/${banner.id}/${banner.banner_name}`;
        }

        router.push(href);
    };


    const initSwiper = () => {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    };
    return (
        <>
         {/* hompage stories using plugin */}
         {/* <div className="render_lively_story_plugin" brand_id="a0ebd986a8" flow="others" placement="home"></div>
            <Script src="https://feed.lively.li/stories/bundle.js"/> */}
            {/* <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={5000}
                autoFocus={false}
                showArrows={true}
                showIndicators={true}
                showThumbs={false}
            >
                {bannerData && bannerData.map((banner, index) => (
                    <div key={index} onClick={() => handleClick(banner)} className='cursor-pointer'>
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${banner.web_image_url}`} alt={banner.banner_name} height={500} width={1920}/>
                    </div>
                ))}
            </Carousel> */}

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                freeMode={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Autoplay, FreeMode, Navigation, Pagination]}
                className="mySwiper"
            >
                {bannerData && bannerData.map((e, i) =>
                    <SwiperSlide key={i}>
                        <div onClick={() => handleClick(e)} className='cursor-pointer'>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${e.web_image_url}`} alt={e.banner_name} height={500} width={1920} />
                        </div>

                    </SwiperSlide>
                )}
                <div className="swiper-button-prev " style={{ color: 'black' }}></div>
                <div className="swiper-button-next" style={{ color: 'black' }}></div>
            </Swiper>
        </>
    )
}

export default Banners
