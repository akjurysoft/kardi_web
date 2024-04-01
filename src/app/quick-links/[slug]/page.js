'use client'
import Navbar1 from '@/app/components/Navbar'
import { Breadcrumbs, CircularProgress } from '@mui/material'
import axios from '../../../../axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import Footer from '@/app/components/Footer'

const Page = ({ params }) => {

    const decode = decodeURIComponent(params.slug)
    const [staticData, setStaticData] = useState({})
    const [aboutImage, setAboutImage] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchStaticData()
        }
        return () => { unmounted = true };
    }, [])

    const fetchStaticData = useCallback(
        () => {
            axios.get(`/api/fetch-static-data`)
                .then((res) => {
                    if (res.data.code == 200) {
                        const staticData1 = res.data.data;
                        if (decode === 'about us' && staticData1.about_status == 1) {
                            setStaticData(staticData1.about_us)
                            setAboutImage(staticData1.image_url)
                        }

                        if (decode === 'shipping policy' && staticData1.shipping_status == 1) {
                            setStaticData(staticData1.shipping_policy)
                        }

                        if (decode === 'privacy policy' && staticData1.privacy_status == 1) {
                            setStaticData(staticData1.privacy_policy)
                        }

                        if (decode === 'refund policy' && staticData1.refund_status == 1) {
                            setStaticData(staticData1.refund_policy)
                        }

                        if (decode === 'return policy' && staticData1.return_status == 1) {
                            setStaticData(staticData1.return_policy)
                        }

                        if (decode === 'cancellation policy' && staticData1.cancellation_status == 1) {
                            setStaticData(staticData1.cancellation_policy)
                        }
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        []
    )

    return (
        <>
            <Navbar1 />

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
                        className='capitalize'
                    >
                        {decode}
                    </Link>
                </Breadcrumbs>
            </div>

            <section className='container mx-auto py-[30px]'>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <span className='capitalize text-2xl font-bold '>{decode}</span>
                        {aboutImage && <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${aboutImage}`} className='w-full h-[350px] object-cover py-5' />}
                        <div className='py-5' dangerouslySetInnerHTML={{ __html: staticData }} />
                    </>
                )}
            </section>

            <Footer />
        </>
    )
}

export default Page
