'use client'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar1 from '../components/Navbar'
import Image from 'next/image'
import { Disclosure, Transition } from '@headlessui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../SnackbarProvider'
import axios from '../../../axios'
import { CartContext } from '../context/CartContext'

const Page = () => {
    const [cartCounter, setCartCounter] = useContext(CartContext)
    const router = useRouter()
    const { openSnackbar } = useSnackbar();

    const [cartData, setCartData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchCartData()
        }

        return () => { unmounted = true };
    }, [])


    const fetchCartData = useCallback(
        () => {
            axios.get(`/api/get-carts`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.cartItems.length === 0) {
                            router.push('/')
                        } else {
                            setCartData(res.data.cartItems)
                            setTotalPrice(res.data.totalPrice)
                        }
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
                        localStorage.removeItem('kardifyuserid')
                        router.push('/login')
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

    const handleIncrement = (data) => {
        axios.post('/api/cart-increament', {
            product_id: data.id,
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    setCartCounter(prev => prev + 1)
                    fetchCartData()
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDecrement = (data) => {
        axios.post('/api/cart-decreament', {
            product_id: data.id,
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    fetchCartData()
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRemoveProduct = (data) => {
        axios.post('/api/remove-from-cart', {
            product_id: data.id,
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    setCartCounter(prev => prev - 1)
                    fetchCartData()
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    const calculateGST = (carts) => {
        let totalPrice = 0;
        let totalGST = 0;

        for (const cart of carts) {
            const price = Number(cart.product.default_price) * Number(cart.quantity);
            const gst = (price * Number(cart.product.tax_rate)) / 100;

            totalPrice += price;
            totalGST += gst;
        }

        const percentage = (totalGST / totalPrice) * 100;
        return parseFloat(percentage).toFixed(2);
    };


    const handleCheckoutButton = () => {
        if (cartData.length == 0) {
            openSnackbar('Cart is empty', 'error')
        } else {
            router.push('/checkout')
        }
    }
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
                        <div>
                            {cartData && cartData.length > 0 ?
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
                                                <Disclosure.Panel className="p-4 pt-3 flex flex-col space-y-[30px] last:pb-0 text-slate-600 text-sm leading-6">
                                                    {cartData && cartData.map((cart, index) => (
                                                        <div className='relative flex' key={index}>
                                                            <div className='relative h-15 w-15 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'>
                                                                <Image src={cart.images[0]?.image_url ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${cart.images[0]?.image_url}` : '/images/logo.png'} fill className='h-full w-full object-contain object-center' alt='subhame' />
                                                                <Link href={`/details/${cart.product?.id}`} className='absolute inset-0'></Link>
                                                            </div>

                                                            <div className='ml-3 sm:ml-6 flex flex-1 flex-col'>
                                                                <div>
                                                                    <div className='flex justify-between '>
                                                                        <div className='flex-[1.5] '>
                                                                            <h3 className='text-base font-semibold'>
                                                                                <Link href={`/details/${cart.product?.id}`}>{cart.product?.product_name}</Link>
                                                                            </h3>
                                                                        </div>
                                                                        <div className='text-center relative'>
                                                                            <div className='nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10'>
                                                                                <div className='nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28'>
                                                                                    <button
                                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default `}
                                                                                        onClick={() => handleDecrement(cart.product)}
                                                                                    >
                                                                                        <AiOutlineMinus />
                                                                                    </button>
                                                                                    <span className='select-none block flex-1 text-center leading-none'>
                                                                                        {cart.quantity}
                                                                                    </span>
                                                                                    <button
                                                                                        onClick={() => handleIncrement(cart.product)}
                                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default `}
                                                                                    >
                                                                                        <AiOutlinePlus />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='hidden flex-1 sm:flex justify-end'>
                                                                            <div className='mt-0.5'>
                                                                                {cart.product?.discount_type === 'amount' ? (
                                                                                    <>
                                                                                        <span className='text-slate-500 !leading-none text-[15px] font-[600]'>
                                                                                            ₹{(cart.product?.default_price - cart.product?.discount).toFixed(2)}
                                                                                        </span>
                                                                                        <span className='text-slate-500 !leading-none text-[13px] font-[600] line-through ml-1'>
                                                                                            ₹{cart.product?.default_price}
                                                                                        </span>
                                                                                    </>
                                                                                ) : cart.product?.discount_type === 'percent' ? (
                                                                                    <>
                                                                                        <span className='text-slate-500 !leading-none text-[15px] font-[600]'>
                                                                                            ₹{(cart.product?.default_price - (cart.product?.default_price * cart.product?.discount / 100)).toFixed(2)}
                                                                                        </span>
                                                                                        <span className='text-slate-500 !leading-none text-[13px] font-[600] line-through ml-1'>
                                                                                            ₹{cart.product?.default_price}
                                                                                        </span>
                                                                                    </>
                                                                                ) : (
                                                                                    <span className='text-slate-500 !leading-none text-[15px] font-[600]'>
                                                                                        ₹{cart.product?.default_price}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='flex mt-auto pt-4 items-end justify-between text-sm'>
                                                                    <div className='rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 border border-slate-200'>
                                                                        <span className={`${cart.product?.stock > 0 ? 'text-green-700' : 'text-red-600'} font-[600]`}>{cart.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                                                    </div>
                                                                    <div className='relative z-10 flex items-center mt-3 font-medium cursor-pointer text-primary-6000 hover:text-primary-500 text-sm '>

                                                                        <Tooltip title="Remove">
                                                                            <IconButton>
                                                                                <DeleteIcon onClick={() => handleRemoveProduct(cart.product)} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Disclosure.Panel>
                                            </Transition>

                                        </>
                                    )}

                                </Disclosure>
                                : <span className='text-slate-500 text-[16px] font-[500] text-center'>No products added to cart</span>}

                        </div>
                    </div>
                    <div className='border-t lg:border-t-0 lg:border-l border-slate-200  my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0'></div>

                    <div className='flex-1'>
                        <div className='sticky top-28'>
                            <h3 className='text-lg font-semibold'>Order Summary</h3>
                            <div className='mt-7 text-sm text-slate-500 divide-y divide-slate-200/70'>
                                <div className='flex flex-col justify-between py-4'>
                                    <div className='flex justify-between '>
                                        <span>Subtotal</span>
                                        <span className='font-semibold text-slate-900'>₹{(totalPrice).toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between py-4'>
                                        <span className='font-semibold text-[12px]'>Price breakup:</span>
                                        <div className='flex justify-between flex-col'>
                                            <span className='flex justify-between text-slate-500 font-semibold text-[12px] gap-2'>Base Fare: <span>₹{(totalPrice / (1 + calculateGST(cartData) / 100)).toFixed(2)}</span></span>
                                            <span>+</span>
                                            <span className='flex justify-between text-slate-500 font-semibold text-[12px] gap-2'>Tax: <span>{calculateGST(cartData)}%</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className='flex justify-between py-4'>
                                    <span>Tax</span>
                                    <span className='font-semibold text-slate-900'>{calculateGST(cartData)}%</span>
                                </div> */}

                                <div className='flex justify-between font-semibold text-slate-900 text-base pt-4'>
                                    <span>Order Total</span>
                                    <span>₹{(totalPrice).toFixed(2)}</span>
                                </div>
                            </div>
                            <span className='nc-Button button cursor-pointer relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000' onClick={handleCheckoutButton}>Checkout</span>
                            {/* <span className='button' onClick={handleCheckoutButton}>Checkout</span> */}
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Page
