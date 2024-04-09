'use client'
import Footer from '@/app/components/Footer'
import Navbar1 from '@/app/components/Navbar'
import { Breadcrumbs } from '@mui/material'
import axios from '../../../../../../axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from '@/app/SnackbarProvider'

const Page = ({ params }) => {

    const { openSnackbar } = useSnackbar();


    const [storyDetailsData, setStoryDetailsData] = useState({})
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchStoryDetailsData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchStoryDetailsData = useCallback(
        () => {
            axios.get(`/api/fetch-all-stories-customer?story_id=${params.slug}`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setStoryDetailsData(res.data.allStories[0])
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                        // router.push('/login')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        [],
    )

    return (
        <>
            <Navbar1 />

            <div className="container mx-auto py-[20px]">
                <Breadcrumbs aria-label="breadcrumb" className="text-sm">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href='/stories'
                        aria-current="page"
                        className='capitalize'
                    >
                        stories
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href='#'
                        aria-current="page"
                        className='capitalize'
                    >
                        {storyDetailsData?.heading}
                    </Link>
                </Breadcrumbs>
            </div>

            <section className='container mx-auto py-[20px]'>
                <div className='flex flex-col space-y-3'>
                    {params.type === 'image' && (
                        <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${storyDetailsData?.image_url}`} alt='story image' width={200} height={200} className='w-full h-[300px] object-cover rounded-[18px]' />
                    )}

                    {params.type === 'video' && (
                        <video src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${storyDetailsData?.image_url}`} controls className='w-full  h-[300px] sm:h-[400px] object-cover rounded-[18px]' />
                    )}

                    <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
                        <div className='w-full md:w-3/5 flex flex-col space-y-2 items-start border-r-0 md:border-r-2 md:pr-4'>
                            <h1 className='text-[20px] md:text-[24px] font-[600] text-gray-700'>{storyDetailsData?.heading}</h1>
                            <p className='text-[14px] md:text-[16px] text-gray-700'>{storyDetailsData?.description}</p>
                        </div>
                        <div className='w-full md:w-2/5 flex flex-col space-y-3 md:space-y-1 justify-center items-center'>
                            <span className='text-[14px] md:text-[16px] text-gray-700 font-[600] mb-2 text-left md:text-center'>No Products Found</span>
                            {/* <span className='text-[14px] md:text-[16px] text-gray-700 font-[600]'>Products</span>
                            <div className='flex flex-col space-y-2 md:space-y-1'>
                                <div className='flex space-x-2 items-start hover:shadow-md p-2 rounded transition duration-300'>
                                    <img src='/images/logo.png' alt='asdsasd' style={{ marginRight: '8px', width: '60px', height: '60px' }} />
                                    <div className='flex flex-col space-y-1'>
                                        <span className='text-[14px] md:text-[16px] text-gray-700 font-[600]'>Product Name</span>
                                        <span className='text-[12px] md:text-[14px] text-gray-500 font-[500]'>Product Price</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Page
