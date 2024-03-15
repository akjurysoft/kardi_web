'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar1 from '../components/Navbar'
import { Breadcrumbs, Pagination, Rating } from '@mui/material'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import Image from 'next/image'
import Footer from '../components/Footer'
import { useSnackbar } from '../SnackbarProvider'
import axios from '../../../axios'

const Page = () => {
    const { openSnackbar } = useSnackbar();

    const [storyData , setStoryData] = useState([])
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

    const [page, setPage] = useState(1);
    const rowsPerPage = 8;
    const totalRows = storyData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = storyData.filter((e) =>
        e.heading.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const paginatedRows = filteredRows.slice(startIndex, endIndex);
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
                    >
                        stories
                    </Link>
                </Breadcrumbs>
            </div>

            <div className='container mx-auto py-[20px]'>
                <div className='flex flex-col space-y-3 text-center'>
                    <h4 className='text-[40px] font-[300]'>Stories</h4>
                    <p className='text-[#4f4e4e] mb-[15px] text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className='flex justify-center'>
                    <Link href='/stories/upload'>
                        <span className='px-[30px] py-[9px] rounded-[30px] bg-[#222] border-[#222] text-[#fff] cursor-pointer text-[14px] hover:opacity-80'>Upload your story</span>
                    </Link>
                    </div>
                </div>

            </div>
            <div className='py-[30px] border-t-[1px]'>
                <div className="container mx-auto">
                    <div className="py-[50px]">
                        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                            {paginatedRows.map((story, index) => (
                                <li key={index} className="p-[10px] bg-[#FAF6F6] z-[0]">
                                    <div className="nc-ProductCard relative flex flex-col bg-transparent ">
                                        <div className="relative flex-shrink-0 bg-slate-50 h-[180px] lg:h-[250px] rounded-3xl overflow-hidden z-0 group">
                                            <div className=" aspect-w-11 aspect-h-12 w-full">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${story.image_url}`}
                                                    alt="subham jena"
                                                    width={300}
                                                    height={300}
                                                    className="object-cover w-full h-full drop-shadow-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between px-2.5 pt-5 pb-2.5">
                                            <div >
                                                <Link href="#" className='font-[500] text-[16px] text-left'>{story.heading}</Link>
                                            </div>
                                            <div className="flex justify-left">
                                                <p className='text-[#4f4e4e] text-[14px]'>{story.description.slice(0,25)}...</p>
                                            </div>
                                            <span className='text-[14px] text-[#000] py-2 cursor-pointer hover:text-[#E3BB54]'>View more</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {totalPages > 1 && (
                            <div className="flex justify-left mt-3">
                                <Pagination count={totalPages} page={page} onChange={handleChangePage} shape="rounded" />
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <Footer/>
        </>
    )
}

export default Page
