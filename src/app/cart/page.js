'use client'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Navbar1 from '../components/Navbar'
import Image from 'next/image'
import { Disclosure, Transition } from '@headlessui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const Page = () => {
    return (
        <>
            <Navbar1 />
            <div className='container mx-auto py-16'>
                <div className='mb-12 sm:mb-16'>
                    <h2 className='block text-2xl sm:text-3xl lg:text-4xl font-semibold'>Cart</h2>
                    <div className='block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700'>
                        <Link href="/">Home</Link>
                        <span className='text-xs mx-1 sm:mx-1.5'>/</span>
                        <span>Cart</span>
                    </div>
                </div>


                <hr className='border-slate-200 my-10 xl:my-12' />

                <div className='flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-[60%] xl:w-[55%]'>
                        <div >
                            <Disclosure defaultOpen="true">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60   rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">

                                            <h3 className='text-base font-semibold'>Cart Items</h3>


                                            {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                        </Disclosure.Button>


                                        <Transition
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <Disclosure.Panel className="p-4 pt-3 last:pb-0 text-slate-600 text-sm leading-6">

                                                <div className='relative flex'>
                                                    <div className='relative h-15 w-15 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'>
                                                        <Image src='/' fill className='h-full w-full object-contain object-center' alt='subhame' />
                                                        <Link href='#' className='absolute inset-0'></Link>
                                                    </div>

                                                    <div className='ml-3 sm:ml-6 flex flex-1 flex-col'>
                                                        <div>
                                                            <div className='flex justify-between '>
                                                                <div className='flex-[1.5] '>
                                                                    <h3 className='text-base font-semibold'>
                                                                        <Link href="#">asd subham jena</Link>
                                                                    </h3>
                                                                </div>
                                                                <div className='text-center relative'>
                                                                    <div className='nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10'>
                                                                        <div className='nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28'>
                                                                            <button
                                                                                className={`w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default `}
                                                                            >
                                                                                <AiOutlineMinus />
                                                                            </button>
                                                                            <span className='select-none block flex-1 text-center leading-none'>
                                                                                2
                                                                            </span>
                                                                            <button
                                                                                className={`w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default `}
                                                                            >
                                                                                <AiOutlinePlus />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='hidden flex-1 sm:flex justify-end'>
                                                                    <div className='mt-0.5'>
                                                                        <div className='flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium'>
                                                                            <span className='text-green-500 !leading-none'>₹2323</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex mt-auto pt-4 items-end justify-between text-sm'>
                                                            <div className='rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 border border-slate-200'>
                                                                <span className={`${true ? 'text-green-700' : 'text-red-600'} font-[600]`}>In Stock</span>
                                                            </div>
                                                            <div className='relative z-10 flex items-center mt-3 font-medium cursor-pointer text-primary-6000 hover:text-primary-500 text-sm '>

                                                                <Tooltip title="Remove">
                                                                    <IconButton>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className='w-[50%] mx-auto border-slate-200 my-10 xl:my-12' />
                                            </Disclosure.Panel>
                                        </Transition>

                                    </>
                                )}

                            </Disclosure>
                        </div>
                    </div>
                <div className='border-t lg:border-t-0 lg:border-l border-slate-200  my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0'></div>

                        <div className='flex-1'>
                            <div className='sticky top-28'>
                                <h3 className='text-lg font-semibold'>Order Summary</h3>
                                <div className='mt-7 text-sm text-slate-500 divide-y divide-slate-200/70'>
                                    <div className='flex justify-between pb-4'>
                                        <span>Subtotal</span>
                                        <span className='font-semibold text-slate-900'>₹23423</span>
                                    </div>
                                    <div className='flex justify-between py-4'>
                                        <span>GST</span>
                                        <span className='font-semibold text-slate-900'>23423%</span>
                                    </div>

                                    <div className='flex justify-between font-semibold text-slate-900 text-base pt-4'>
                                        <span>Order Total</span>
                                        <span>₹32423</span>
                                    </div>
                                </div>
                                <span  className='nc-Button cursor-pointer relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000'>Checkout</span>
                            </div>
                        </div>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Page
