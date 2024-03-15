'use client'
import Navbar from '@/app/components/Navbar';
// import { Disclosure, Transition } from '@headlessui/react';
import { Breadcrumbs, Button, CircularProgress, Rating, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { BsTruck } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import Footer from '@/app/components/Footer';
import { Disclosure, Transition } from '@headlessui/react';
import axios from '../../../../axios';
import { useRouter } from 'next/navigation';


const Page = ({params}) => {

    console.log(params)

    const router = useRouter()

    const [productData, setProductData] = useState({})
    const [prodImages , setProdImage] = useState([])
    console.log(productData)

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchbankData()
        }

        return () => { unmounted = true };
    }, [])

    const fetchbankData = useCallback(
        () => {
            axios.get(`/api/get-products-customer?product_name=${params.product_id}`)
                .then((res) => {
                    const fetchedProdData = res.data.products[0]
                    if (res.data.code == 200) {
                        setProductData(res.data.products[0])
                        if (fetchedProdData && fetchedProdData.images) {
                            const mappedImages = fetchedProdData.images.map((e) => ({
                                original:`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${e.image_url}`,
                                thumbnail:`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${e.image_url}`,
                            }));
                            setProdImage(mappedImages);
                        }
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                        router.push('/login')
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        router.push('/login')
                    }
                })
        },
        [],
    )



    const images = [
        {
            original: "https://kardify1.b2cinfohosting.in/uploads/products/IA-AF-IN-023_1.jpg",
            thumbnail: "https://kardify1.b2cinfohosting.in/uploads/products/IA-AF-IN-023_1.jpg",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const galleryOptions = {
        showFullscreenButton: false,
        showPlayButton: false,
        showThumbnails: true,
        thumbnailPosition: 'bottom',
        showNav: false,
    };

    const [pincode, setPincode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleButtonClick = () => {
        if (pincode.length !== 6 || isNaN(pincode)) {
            setError('Invalid pincode. Pincode must be a 6-digit number.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            if (pincode === '123456') {
                setError('');
            } else {
                setError('Invalid pincode');
            }
            setIsLoading(false);
        }, 2000);
    };

    const handlePincodeChange = (event) => {
        setPincode(event.target.value);
    };

    return (
        <>
            <Navbar />

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
                    >
                        {params.product_id}
                    </Link>
                </Breadcrumbs>
            </div>

            <div className='container mx-auto py-[50px]'>
                <div className='lg:flex'>
                    <div className='w-full lg:w-[50%]'>
                        <div className='gallery-container'>
                            <ImageGallery items={prodImages} {...galleryOptions} />
                        </div>
                    </div>

                    <div className='w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10'>
                        <div className='space-y-7 2xl:space-y-8'>
                            <div className='flex flex-col space-y-1'>
                                <h2 className='text-2xl sm:text-3xl font-semibold'>{productData.product_name}</h2>
                                <Rating name="read-only" value={3} readOnly />
                                <div className='flex items-center mt-5 space-x-4 sm:space-x-5'>
                                    <div className='flex items-baseline space-x-1'>
                                        <span className='text-[20px] font-[500]'>₹{productData.default_price}</span>
                                        <span className='text-[13px] line-through'>₹{productData.default_price}</span>
                                    </div>
                                    <div className='h-7 border-l border-slate-300'></div>
                                    <div className='flex items-center text-[20px] font-[500]'>
                                        {productData.discount}% OFF
                                    </div>
                                </div>
                                <span className='text-[12px] font-300'>inclusive of all taxes</span>
                            </div>

                            <div>
                                <h5><span className='text-sm font-medium'>Avalability: <span className='ml-1 text-md font-semibold text-green-600'>In Stock</span></span> </h5>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex w-full gap-3'>
                                    <TextField
                                        label="Enter Pincode to check availability"
                                        variant="outlined"
                                        className='w-[80%]'
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                    />
                                    <Button
                                        variant="contained"
                                        className='!bg-black'
                                        color="primary"
                                        onClick={handleButtonClick}
                                        sx={{
                                            backgroundColor: 'black',
                                            '&:hover': {
                                                backgroundColor: 'black',
                                            },
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <CircularProgress size={24} /> : "Check"}
                                    </Button>
                                </div>
                            </div>
                            {error && <p className="text-red-500 !mt-1 text-sm">{error}</p>}
                            <div>
                                <div className='hidden'>
                                    <div className='flex justify-between font-medium text-sm'>
                                        <label>
                                            <span className='text-sm font-medium'>Size: <span className='ml-1 font-semibold capitalize'>23</span></span>
                                        </label>
                                    </div>
                                    <div className='grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3'>
                                        <div className='relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000'>S</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-3.5'>
                                <button className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 `}>
                                    <AiOutlineShoppingCart />
                                    <span className='ml-3'>Buy Now</span>
                                </button>

                                <button className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 `}>
                                    <AiOutlineShoppingCart />
                                    <span className='ml-3'>Add to cart</span>
                                </button>

                            </div>

                            <hr className=' 2xl:!my-10 border-slate-200' />

                            <Disclosure defaultOpen="true">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60   rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                                            <span>Description</span>
                                            {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                        </Disclosure.Button>
                                        <Transition
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                            className="!mt-[0px]"
                                        >
                                            <Disclosure.Panel className="p-2 pt-2  last:pb-0 text-slate-600 text-sm leading-6">
                                            {productData.product_desc}
                                            </Disclosure.Panel>
                                        </Transition>
                                    </>
                                )}

                            </Disclosure>

                        </div>
                    </div>
                </div>
            </div>




            <Footer />
        </>
    )
}

export default Page
