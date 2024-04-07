'use client'
import { Disclosure, RadioGroup, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaAngleRight, FaRegEdit, FaTrash } from 'react-icons/fa'
import { useSnackbar } from '../SnackbarProvider'
import axios from '../../../axios'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineLocalOffer } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';
import { IoMdClose } from "react-icons/io";
import { DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import Image from 'next/image'
import Footer from '../components/Footer'
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Navbar1 from '../components/Navbar'
import { CartContext } from '../context/CartContext'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Page = () => {
    const router = useRouter()
    const { openSnackbar } = useSnackbar()
    const [cartCounter, setCartCounter] = useContext(CartContext)


    function formatDate(apiTimestamp) {
        const date = new Date(apiTimestamp);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchCartData()
            fetchDeliveryTypeData()
            fetchCouponData()
            fetchUserRoleData()
            fetchAddressData()
        }

        return () => { unmounted = true };
    }, [])

    const [role, setRole] = useState('')
    const fetchUserRoleData = useCallback(
        () => {
            axios.get(`/api/fetch-roles`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setRole(res.data.role)
                    } else if (res.data.message === 'Session expired') {
                        localStorage.removeItem('kardifyuserid')
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                })
        },
        [],)

    const [dealerData, setDealerData] = useState(null)
    useEffect(() => {
        if (role === 'DEALER') {
            axios.get(`/api/fetch-dealer-details`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        setDealerData(res.data.dealer_data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (err.response && err.response.data.statusCode === 400) {
                        openSnackbar(err.response.data.message, 'error');
                    }
                });
        }
    }, [role])




    // ----------------------------------------Address data fetch--------------------------------------------
    const [addressData, setAddressData] = useState([])
    const [selected, setSelected] = useState(null)
    const [addressDetails, setAddressDetails] = useState({})


    useEffect(() => {
        setAddressDetails(addressData.find((item) => item.id === selected));
    }, [addressData, selected])

    const handleAddressChange = (address) => {
        setSelected(address);
    };

    const fetchAddressData = async () => {
        try {
            const response = await axios.get(`/api/get-all-addresses`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            });

            if (response.data.code === 200) {
                setAddressData(response.data.addresses);
                if (response.data.addresses.length > 0) {
                    setSelected(response.data.addresses[0].id);
                }
            } else if (response.data.message === 'Session expired') {
                openSnackbar(response.data.message, 'error');
                localStorage.removeItem('kardifyuserid')
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.statusCode === 400) {
                openSnackbar(error.response.data.message, 'error');
            }
        }
    };





    const [getAddressData, setGetAddressData] = useState({
        fullname: '',
        add_type: '',
        phone: '',
        add1: '',
        add2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        landmark: '',
        area: '',
    })
    const getData = (e) => {
        const { value, name } = e.target;

        setGetAddressData((pevData) => ({
            ...pevData,
            [name]: value
        }))
    }

    const reset = () => {
        setGetAddressData({
            fullname: '',
            add_type: '',
            phone: '',
            add1: '',
            add2: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            landmark: '',
            area: '',
        })

        document.getElementById('fullname').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('add1').value = ''
        document.getElementById('city').value = ''
        document.getElementById('state').value = ''
        document.getElementById('country').value = ''
        document.getElementById('zipcode').value = ''
        document.getElementById('landmark').value = ''
        document.getElementById('area').value = ''
    }

    const handleAddressSubmit = () => {
        axios.post('/api/add-addresses', {
            fullname: getAddressData.fullname,
            add_type: getAddressData.add_type,
            mobile: getAddressData.phone,
            add1: getAddressData.add1,
            add2: getAddressData.add2,
            city: getAddressData.city,
            state: getAddressData.state,
            country: getAddressData.country,
            pincode: getAddressData.zipcode,
            landmark: getAddressData.landmark,
            area: getAddressData.area
        }, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
            }
        })
            .then(res => {
                if (res.data.code === 200) {
                    openSnackbar(res.data.message, 'success');
                    fetchAddressData();
                    reset()
                } else if (res.data.message === 'Session expired') {
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
    }


    // -------------------------------Delivery Type--------------------
    const [deliveryTypeData, setDeliveryTypeData] = useState([])
    const fetchDeliveryTypeData = useCallback(
        () => {
            axios.get(`/api/get-delivery-types`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setDeliveryTypeData(res.data.delivery_types);
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
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
    const [shippingOption, setShippingOption] = useState(2);

    const handleOptionChange = (option) => {
        setShippingOption(option);
    };




    // -------------------------Cart Data------------------------
    const [cartData, setCartData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)

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
                            const weight = res.data.cartItems.reduce((acc, cart) => {
                                const productWeight = Number(cart.product.weight) * Number(cart.quantity);
                                return acc + productWeight;
                            }, 0);
                            setTotalWeight(weight);
                        }
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
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

    // -------------------------shiprocket data------------------------

    const [shiprocketToken, setShiprocketToken] = useState(null)
    useEffect(() => {
        const fetchShiprocketToken = async () => {
            try {
                const response = await axios.get(`/api/get-token?email=${process.env.NEXT_PUBLIC_SHIPROCKET_EMAIL}&password=${process.env.NEXT_PUBLIC_SHIPROCKET_PASSWORD}`, {});
                if (response.data.code === 200) {
                    setShiprocketToken(response.data.token);
                } else if (response.data.message === 'Session expired') {
                    openSnackbar(response.data.message, 'error');
                    router.push('/login');
                }
            } catch (error) {
                console.error(error);
                if (error.response && error.response.data.statusCode === 400) {
                    openSnackbar(error.response.data.message, 'error');
                }
            }
        }
        fetchShiprocketToken()
    }, [])

    const [getAllShippingCharge, setGetAllShippingCharge] = useState([])
    useEffect(() => {
        const fetchShippingCharge = async () => {
            try {
                if (shiprocketToken && addressDetails.zipcode) {
                    const response = await axios.post(`/api/get-shipping-price`, {
                        pickup_pincode: process.env.NEXT_PUBLIC_SHIPROCKET_PICKUP_PINCODE,
                        delivery_pincode: addressDetails.zipcode,
                        COD: false,
                        weight: '2',
                        token: shiprocketToken
                    });

                    if (response.data.code === 200) {
                        setGetAllShippingCharge(response.data.data);
                    } else if (response.data.message === 'Session expired') {
                        openSnackbar(response.data.message, 'error');
                        router.push('/login');
                    }
                }
            } catch (error) {
                console.error(error);
                if (error.response && error.response.data.statusCode === 400) {
                    openSnackbar(error.response.data.message, 'error');
                }
            }
        };

        fetchShippingCharge()
    }, [addressDetails, shiprocketToken, totalWeight]);

    const [shippingCharge, setShippingCharge] = useState(0);
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const lowestShippingCharge = getAllShippingCharge.reduce((minCharge, shippingOption) => {
            return shippingOption.charge < minCharge ? shippingOption.charge : minCharge;
        }, Infinity);

        const lowestShippingData = getAllShippingCharge.reduce((minCharge, shippingOption) => {
            return shippingOption.charge < minCharge ? shippingOption.charge : minCharge;
        }, getAllShippingCharge[0]);

        setShippingData(lowestShippingData)

        if (totalPrice > 1000) {
            setShippingCharge(0);
        } else if (shippingOption === 1) {
            setShippingCharge(0);
        } else {
            setShippingCharge(lowestShippingCharge);
        }
    }, [getAllShippingCharge, totalPrice, calculateGST, cartData, shippingOption]);


    // -----------------------------------Coupon Data--------------------------------
    const [openCoupon, setOpenCoupon] = useState(false)
    const [couponData, setCouponData] = useState([])
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [couponAmount, setCouponAmount] = useState(0)

    const handleClickOpenCoupon = () => {
        fetchCouponData()
        setOpenCoupon(true);
    };
    const handleCloseCoupon = () => {
        setOpenCoupon(false);
    };

    const fetchCouponData = useCallback(
        () => {
            axios.get(`/api/get-coupons`, {
                headers: {
                    Authorization: localStorage.getItem('kardifywebtoken'),
                }
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setCouponData(res.data.coupons)
                    } else if (res.data.message === 'Session expired') {
                        openSnackbar(res.data.message, 'error');
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


    const handleApplyCoupon = (coupon) => {
        if (totalPrice >= coupon.min_order_amount) {
            let discountAmount = 0;
            setAppliedCoupon(coupon)
            if (coupon.discount_type === "Percent") {
                discountAmount = (coupon.discount / 100) * totalPrice;
                discountAmount = Math.min(discountAmount, coupon.max_discount);
            } else if (coupon.discount_type === "Amount") {
                discountAmount = coupon.discount;
                discountAmount = Math.min(discountAmount, coupon.max_discount);
            }
            const newCumulativeDiscountAmount = discountAmount.toFixed(2);

            openSnackbar(`Coupon applied successfully`, 'success')
            handleCloseCoupon()
            setCouponAmount(newCumulativeDiscountAmount);
        } else {
            openSnackbar(`Minimum order amount is ${coupon.min_order_amount}`, 'error')
        }

    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponAmount(0)
    };

    // -----------------------------------place order-------------------------------
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    let totalAmountWithoutCoupon = totalPrice + shippingCharge;
    if (appliedCoupon) {
        totalAmountWithoutCoupon -= parseFloat(couponAmount);
    }
    const formattedTotalAmount = parseFloat(totalAmountWithoutCoupon).toFixed(2);
    console.log(formattedTotalAmount)

    const placeOrder = () => {
        if (role === 'CUSTOMER') {
            if (!selected) {
                openSnackbar('Please select address', 'error')
                return
            }

            const productData = cartData.map(cartItem => ({
                product_id: cartItem.product_id,
                quantity: cartItem.quantity
            }));

            const couponId = appliedCoupon ? appliedCoupon.id : null;

            const razorpay = new window.Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                currency: 'INR',
                amount: parseFloat(parseFloat(formattedTotalAmount).toFixed(2)) * 100,
                name: 'Kardify',
                description: 'Payment for your product',
                image: '/images/logo.png',
                theme: {
                    color: '#cfaa4c',
                },
                handler: (response) => {
                    console.log(response)
                    axios.post('/api/place-order', {
                        address_id: selected,
                        delivery_type_id: shippingOption,
                        payment_id: response.razorpay_payment_id,
                        coupon_id: couponId,
                        shipping_charge: shippingCharge,
                        total_product_amount: totalPrice,
                        products: productData,
                        total_amount: (totalPrice + (totalPrice * calculateGST(cartData) / 100) + shippingCharge).toFixed(2)
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('kardifywebtoken'),
                        }
                    })
                        .then(res => {
                            console.log(res)
                            if (res.data.status === 'success') {
                                openSnackbar(res.data.message, 'success')
                                router.push('/')
                            } else {
                                openSnackbar(res.data.message, 'error')
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                },
                prefill: {
                    email: addressDetails.email,
                    contact: addressDetails.mobile,
                    name: addressDetails.fullname,
                },
            });

            razorpay.open();
        } else if (role === 'DEALER') {
            const productData = cartData.map(cartItem => ({
                product_id: cartItem.product_id,
                quantity: cartItem.quantity
            }));

            const couponId = appliedCoupon ? appliedCoupon.id : null;

            const razorpay = new window.Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                currency: 'INR',
                amount: formattedTotalAmount * 100,
                name: 'Kardify',
                description: 'Payment for your product',
                image: '/images/logo.png',
                theme: {
                    color: '#cfaa4c',
                },
                handler: (response) => {
                    axios.post('/api/place-order', {
                        delivery_type_id: shippingOption,
                        payment_id: response.razorpay_payment_id,
                        coupon_id: couponId,
                        shipping_charge: shippingCharge,
                        total_product_amount: totalPrice,
                        products: productData,
                        total_amount: (totalPrice + (totalPrice * calculateGST(cartData) / 100) + shippingCharge).toFixed(2)
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('kardifywebtoken'),
                        }
                    })
                        .then(res => {
                            console.log(res)
                            if (res.data.status === 'success') {
                                openSnackbar(res.data.message, 'success')
                                router.push('/')
                            } else {
                                openSnackbar(res.data.message, 'error')
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                },
                prefill: {
                    email: dealerData?.personal_email,
                    contact: dealerData?.personal_mobile,
                    name: dealerData?.fullname,
                },
            });
            razorpay.open();
        }
    }


    return (
        <div className='nc-CheckoutPage'>
            <Navbar1 />
            <div className='container mx-auto py-16 lg:pb-28 lg:pt-20'>
                <div className='mb-12 sm:mb-16'>
                    <h2 className='block text-2xl sm:text-3xl lg:text-4xl font-semibold'>Checkout</h2>
                    <div className='block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700'>
                        <Link href="/">Home</Link>
                        <span className='text-xs mx-1 sm:mx-1.5'>/</span>
                        <Link href='/cart'>Cart</Link>
                        <span className='text-xs mx-1 sm:mx-1.5'>/</span>
                        <span>Checkout</span>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row'>
                    {/* Left side starts */}
                    {role === 'DEALER' ?
                        <div className='flex-1'>
                            <div className='space-y-8'>
                                <div className='w-full rounded-2xl space-y-2.5'>
                                    <RadioGroup className='space-y-5 pb-[20px]' >
                                        <RadioGroup.Label className="space-y-10 font-[600]">Dealer Default Address</RadioGroup.Label>
                                        <div className="space-y-2 space-y-scroll p-[10px]  max-h-100">
                                            <RadioGroup.Option
                                                // value={e.id}
                                                className={({ active, checked }) =>
                                                    `${active
                                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-[#cfaa4c]'
                                                        : ''
                                                    }
                                            ${checked ? 'bg-[#cfaa4c] bg-opacity-75 text-white' : 'bg-white'
                                                    }
                                                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <div className="flex w-full items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                            }`}
                                                                    >
                                                                        <span className='uppercase font-bold'>{dealerData?.fullname}</span><br />
                                                                    </RadioGroup.Label>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className={`inline ${checked ? 'text-[#fff] font-[600]' : 'text-gray-500'
                                                                            }`}
                                                                    >
                                                                        <span >
                                                                            {dealerData?.personal_mobile}
                                                                        </span> <br />
                                                                        <span>{dealerData?.add1}</span><br />
                                                                        <span>{dealerData?.add2}</span> , <span>{dealerData?.area}</span> <br />
                                                                        <span>{dealerData?.landmark}</span> <br />
                                                                        <span>{dealerData?.city}</span> , <span>{dealerData?.state}</span> , <span>{dealerData?.country}</span> <br />
                                                                        <span>{dealerData?.pincode}</span>

                                                                    </RadioGroup.Description>
                                                                </div>
                                                            </div>
                                                            {checked && (
                                                                <div className="shrink-0 text-white flex items-center gap-[10px]">
                                                                    <FaRegEdit className='z-9 text-[20px] opacity-70 hover:opacity-90' />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        </div>

                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                        :
                        <>

                            <div className='flex-1'>
                                {addressData && addressData.length > 0 ?
                                    <div className='space-y-8'>
                                        <div className='w-full rounded-2xl space-y-2.5'>
                                            <RadioGroup className='space-y-5 pb-[20px]' value={selected} onChange={(id) => handleAddressChange(id)}>
                                                <RadioGroup.Label className="space-y-10 font-[600]">Select Address</RadioGroup.Label>
                                                <div className="space-y-2 space-y-scroll p-[10px]  max-h-30">
                                                    {addressData && addressData.map((e, i) => (
                                                        <RadioGroup.Option
                                                            key={i}
                                                            value={e.id}
                                                            className={({ active, checked }) =>
                                                                `${active
                                                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-[#cfaa4c]'
                                                                    : ''
                                                                }
                                            ${checked ? 'bg-[#cfaa4c] bg-opacity-75 text-black' : 'bg-white'
                                                                }
                                                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <div className="flex w-full items-center justify-between">
                                                                        <div className="flex items-center">
                                                                            <div className="text-sm">
                                                                                <RadioGroup.Label
                                                                                    as="p"
                                                                                    className={`font-medium  ${checked ? 'text-black' : 'text-gray-900'
                                                                                        }`}
                                                                                >
                                                                                    <span className='uppercase font-bold'>{e.add_type}</span><br />
                                                                                </RadioGroup.Label>
                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className={`inline ${checked ? 'text-slate-600 font-[600]' : 'text-gray-500'
                                                                                        }`}
                                                                                >
                                                                                    <span >
                                                                                        {e.fullname}
                                                                                    </span> <br />
                                                                                    <span>{e.mobile}</span><br />
                                                                                    <span>{e.add1}</span> , <span>{e.add2}</span> <br />
                                                                                    <span>{e.area}</span> , <span>{e.landmark}</span> , <span>{e.city}</span> <br />
                                                                                    <span>{e.state}</span> , <span>{e.zipcode}</span>

                                                                                </RadioGroup.Description>
                                                                            </div>
                                                                        </div>
                                                                        {checked && (
                                                                            <div className="shrink-0 text-white flex items-center gap-[10px]">
                                                                                <FaRegEdit className='z-9 text-[15px] opacity-70 hover:opacity-90' />
                                                                                <FaTrash className='z-9 text-[15px] opacity-70 hover:opacity-90' />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>

                                            </RadioGroup>
                                        </div>
                                    </div>
                                    :
                                    <p className='text-center py-10'>No address found</p>
                                }
                                <Disclosure defaultOpen={true}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex  items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60   rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                                                <span>Add Shipping Address</span>
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
                                                <Disclosure.Panel className="p-4 pt-3 border border-slate-200 last:pb-0 text-slate-600 text-sm leading-6">
                                                    <div className=' px-6 py-7 space-y-4 sm:space-y-6 block'>

                                                        <>
                                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3'>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Full Name *</label>
                                                                    <input id='fullname' type='text' name="fullname" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                                <div className='space-y-2'>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Phone *</label>
                                                                    <input id='phone' type='text' name="phone" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />

                                                                </div>
                                                            </div>
                                                            <div className='sm:flex space-y-4 sm:space-y-0 sm:space-x-3'>
                                                                <div className='flex-1'>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Building name / flat no.</label>
                                                                    <input id='add1' type='text' name="add1" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                                <div className='sm:w-1/3'>
                                                                    <label className="nc-Label text-base font-medium text-neutral-900 text-sm">Landmark</label>
                                                                    <input id='landmark' type='text' name="landmark" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                            </div>

                                                            <div className='grid grid-cols-1 gap-4 sm:gap-3'>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Area *</label>
                                                                    <input id='area' type='text' name="area" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                            </div>

                                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3'>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>City *</label>
                                                                    <input id='city' type='text' name="city" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>State *</label>
                                                                    <input id='state' type='text' name="state" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                            </div>

                                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3'>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Pincode *</label>
                                                                    <input id='zipcode' type='text' name="zipcode" onChange={getData} className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   disabled:bg-neutral-200  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5' />
                                                                </div>
                                                                <div>
                                                                    <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Country *</label>
                                                                    <select name="country" id="country" onChange={getData} className='nc-Select h-11 mt-1.5 block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white'>
                                                                        <option>Select</option>
                                                                        <option value='India'>India</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className='nc-Label text-base font-medium text-neutral-900 text-sm'>Address type</label>
                                                                <div className='mt-1.5 grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3'>
                                                                    <div className='flex items-center text-sm sm:text-base '>
                                                                        <input id="Address-type-home" name="add_type" value='home' type="radio" onChange={getData} className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-6 h-6 `} />
                                                                        <label htmlFor='Address-type-home' className='pl-2.5 sm:pl-3 block text-slate-900 select-none'>
                                                                            <span className='text-sm font-medium'>Home</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className='flex items-center text-sm sm:text-base '>
                                                                        <input id="Address-type-office" name="add_type" value='office' type="radio" onChange={getData} className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-6 h-6 `} />
                                                                        <label htmlFor='Address-type-office' className='pl-2.5 sm:pl-3 block text-slate-900 select-none'>
                                                                            <span className='text-sm font-medium'>Office</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className='flex items-center text-sm sm:text-base '>
                                                                        <input id="Address-type-other" name="add_type" value='other' type="radio" onChange={getData} className='focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-6 h-6' />
                                                                        <label htmlFor="Address-type-other" className='pl-2.5 sm:pl-3 block text-slate-900 select-none'>
                                                                            <span className='text-sm font-medium'>Others</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='flex space-x-3'>
                                                                <button onClick={handleAddressSubmit} className='nc-Button button  relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl sm:!px-7 shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000'>Save Address</button>
                                                            </div>
                                                        </>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}

                                </Disclosure>
                            </div>

                        </>
                    }

                    {/* Left side Ends */}

                    <div className='flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200  my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 '></div>

                    {/* Right side starts */}
                    <div className='w-full lg:w-[36%] '>
                        <div className='w-full sticky top-[100px]'>
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
                                                            <div className='relative flex items-center' key={index}>
                                                                <div className='relative h-[70px] w-[50px] sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'>

                                                                    <Image src={cart.images[0]?.image_url ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${cart.images[0]?.image_url}` : '/images/logo.png'} fill className='h-full w-full object-contain object-center' alt='subhame' />
                                                                    <Link href={`/details/${cart.product?.id}`} className='absolute inset-0'></Link>
                                                                </div>

                                                                <div className='ml-3 sm:ml-6 flex flex-1 flex-col'>
                                                                    <div>
                                                                        <div className='flex justify-between '>
                                                                            <div className='flex-[1.5] '>
                                                                                <h3 className='text-base font-semibold'>
                                                                                    <Link href={`/details/${cart.product?.id}`} className='text-[12px]'>{cart.product?.product_name}</Link>
                                                                                </h3>
                                                                            </div>
                                                                            <div className='hidden flex-1 sm:flex justify-end'>
                                                                                <div className='mt-0.5'>
                                                                                    {cart.product?.discount_type === 'amount' ? (
                                                                                        <>
                                                                                            <span className='text-slate-500 !leading-none text-[12px] font-[600]'>
                                                                                                ₹{(cart.product?.default_price - cart.product?.discount).toFixed(2)}
                                                                                            </span>
                                                                                            <span className='text-slate-500 !leading-none text-[10px] font-[600] line-through ml-1'>
                                                                                                ₹{cart.product?.default_price}
                                                                                            </span>
                                                                                        </>
                                                                                    ) : cart.product?.discount_type === 'percent' ? (
                                                                                        <>
                                                                                            <span className='text-slate-500 !leading-none text-[12px] font-[600]'>
                                                                                                ₹{(cart.product?.default_price - (cart.product?.default_price * cart.product?.discount / 100)).toFixed(2)}
                                                                                            </span>
                                                                                            <span className='text-slate-500 !leading-none text-[10px] font-[600] line-through ml-1'>
                                                                                                ₹{cart.product?.default_price}
                                                                                            </span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <span className='text-slate-500 !leading-none text-[12px] font-[600]'>
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
                            <div className='mt-4 pt-6 text-sm text-slate-500'>
                                <div onClick={handleClickOpenCoupon} className="group ">
                                    <div id="couponButton" className='flex items-center justify-between cursor-pointer group-hover:shadow-md px-[10px] py-[13px]'>
                                        <div className='flex items-center space-x-3'>
                                            <MdOutlineLocalOffer />
                                            <div className='flex flex-col'>
                                                <span className='text-[15px] text-slate-600'>Add a coupon code</span>
                                                <span className='text-[13px] text-green-700'>Avail offers and discounts on your order</span>
                                            </div>
                                        </div>
                                        <FaAngleRight />
                                    </div>
                                </div>

                                {appliedCoupon && (
                                    <div className='mt-5'>
                                        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                                            <span className='flex items-center justify-between px-[20px] py-[10px] bg-[#8d96a0] rounded-[15px] text-slate-200'>{appliedCoupon.coupon_name} applied
                                                <span onClick={handleRemoveCoupon}><IoMdClose className="text-[16px] font-bold cursor-pointer" /></span>
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <hr className='w-[100%] mx-auto border-slate-200 my-5 xl:my-4' />
                                <div className='mt-4 flex items-center justify-between py-2.5'>
                                    <span>Shipping Option</span>
                                    {deliveryTypeData && deliveryTypeData.map((deliveryType, index) => (
                                        <div key={index}>
                                            <label htmlFor={deliveryType.delivery_type_name}>
                                                <input
                                                    type="radio"
                                                    id={deliveryType.delivery_type_name}
                                                    name="shippingOption"
                                                    value={deliveryType.id}
                                                    checked={shippingOption === deliveryType.id}
                                                    onChange={() => handleOptionChange(deliveryType.id)}
                                                />
                                                <span className='ml-1'>{deliveryType.delivery_type_name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* <div className='mt-4 flex justify-between py-2.5'>
                                    <span>Subtotal</span>
                                    <span className='font-semibold text-slate-900'>₹{(totalPrice).toFixed(2)}</span>
                                </div> */}
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
                                {appliedCoupon && (
                                    <div className='mt-4 flex justify-between py-2.5'>
                                        <span>Coupon Discount ({appliedCoupon.coupon_name})</span>
                                        <span className='font-semibold text-slate-900'>- ₹{couponAmount}</span>
                                    </div>
                                )}

                                {/* <div className='mt-4 flex justify-between py-2.5'>
                                    <span>Tax</span>
                                    <span className='font-semibold text-slate-900'>{calculateGST(cartData)}%</span>
                                </div> */}

                                {shippingCharge > 0 && (
                                    <div className='mt-4 flex items-center justify-between py-2.5'>
                                        <span>Shipping Charge</span>
                                        <span className='flex flex-col text-end font-semibold text-slate-900'>₹{shippingCharge} <span className='text-[10px] text-green-500'>Delivery with in {shippingData?.estimate_del_in_days} days, {shippingData?.city}</span></span>
                                    </div>
                                )}
                                {shippingCharge == 0 && shippingOption == 2 && (
                                    <div className='mt-4 flex items-center justify-between py-2.5'>
                                        <span>Shipping Charge</span>
                                        <span className='flex flex-col text-end font-semibold text-green-600'> Free</span>
                                    </div>
                                )}

                                <div className='flex justify-between font-semibold text-slate-900 text-base pt-4'>
                                    <span>Order Total</span>
                                    {/* <span>₹{(totalPrice + (totalPrice * calculateGST(cartData) / 100) + shippingCharge - couponAmount).toFixed(2)}</span> */}
                                    <span>₹{formattedTotalAmount}</span>
                                </div>
                            </div>
                            <button onClick={placeOrder} className={`nc-Button button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 `}>
                                Confirm Order
                            </button>
                        </div>
                    </div>
                    {/* Right side ends */}



                    {/* Coupon popup */}
                    <BootstrapDialog
                        onClose={handleCloseCoupon}
                        fullWidth
                        aria-labelledby="customized-dialog-title"
                        open={openCoupon}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='!font-inherit'>
                            Apply Coupon
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseCoupon}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers className='!py-[10px] !px-[28px]'>
                            <div className='py-[24px] space-y-4'>
                                {couponData && couponData.length == 0 && <p className='text-center'>No coupon available</p>}
                                {couponData && couponData.map((e, i) =>
                                    <div class="coupon-card" key={i}>
                                        <h3 className='font-[500] capitalize'>{e.coupon_title}</h3>
                                        <di class="coupon-row">
                                            <span id="cpnCode" className='font-[600] uppercase'>{e.coupon_name}</span>
                                            <span id="cpnBtn" className='font-[500]' onClick={() => handleApplyCoupon(e)}>Apply</span>
                                        </di>
                                        <p className='font-[400]'>Valid Till: <span className='font-[500]'>{formatDate(e.expiry_date)}</span></p>
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </BootstrapDialog>

                </div>
            </div>
            <Footer />
        </div>


    )
}

export default Page
