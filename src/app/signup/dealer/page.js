'use client'
import { useSnackbar } from '@/app/SnackbarProvider';
import Footer from '@/app/components/Footer'
import axios from '../../../../axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import OtpInput from 'react-otp-input';
import Image from 'next/image';
import Navbar1 from '@/app/components/Navbar';


const Page = () => {
    const { openSnackbar } = useSnackbar();
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fisrtFormSection, setFirstFormSection] = useState(true)
    const [secondFormSection, setSecondFormSection] = useState(false)
    const [showOTPSection, setShowOTPSection] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const [userId, setUserId] = useState('')

    const [getDealerData, setGetDealerData] = useState({
        fullname: '',
        username: '',
        password: '',
        cpassword: '',
        first_name:'',
        last_name:'',
        personal_email:'',
        personal_mobile:'',
        add1: '',
        add2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        landmark: '',
        area: ''
    })
    const getData = (e) => {
        const { value, name } = e.target;

        setGetDealerData((pevData) => ({
            ...pevData,
            [name]: value
        }))
    }

    const handleFirstFormSubmit = () => {
        if (getDealerData.fullname === '' || getDealerData.username === '' || getDealerData.password === '' || getDealerData.cpassword === '') {
            openSnackbar('Please fill all the fields', 'error')
            return
        }
        setFirstFormSection(false);
        setSecondFormSection(true)
        setShowOTPSection(false);
    };

    const handleSecondFormSubmit = () => {
        setSecondFormSection(false);
        setShowOTPSection(true);
    };

    const handlePreviousPage = () => {
        setFirstFormSection(true);
        setSecondFormSection(false);
        setShowOTPSection(false);
    };

    const handleRegister = () => {
        axios.post(`/api/register-customer-dealer?type=DEALER`, {
            fullname: getDealerData.fullname,
            username: getDealerData.username,
            password: getDealerData.password,
            confirm_password: getDealerData.cpassword
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    setUserId(res.data.created_user.id)
                    handleSecondFormSubmit()
                    setResendTimer(60)
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                openSnackbar(err.response.data.message, 'error')
            })
    }

    


    // -------------------------------------------- Otp Section ---------------------------------------
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let intervalId;

        if (resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);

    }, [resendTimer]);

    const handleResendOTP = () => {
        handleRegister()
    };

    const handleVerifyOTP = () => {
        if (otp === '') {
            openSnackbar('Please enter OTP', 'error')
            return
        }
        axios.post(`/api/verify-otp-customer-dealer?type=DEALER`, {
            user_id: userId,
            otp: otp
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    handleDetailsSubmit()
                    
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                openSnackbar(err.response.data.message, 'error')
            })
    }

    const handleDetailsSubmit = () => {
        axios.post('/api/dealer-personal-details',{
            dealer_id: userId,
            first_name: getDealerData.first_name,
            last_name: getDealerData.last_name,
            personal_email: getDealerData.username,
            personal_mobile: getDealerData.username,
            add1: getDealerData.add1,
            add2: getDealerData.add2,
            city: getDealerData.city,
            state: getDealerData.state,
            country: getDealerData.country,
            pincode: getDealerData.pincode,
            landmark: getDealerData.landmark,
            area: getDealerData.area
        })
        .then(res => {
            if (res.data.status === 'success') {
                openSnackbar(res.data.message, 'success')
                router.push('/login')
            } else {
                openSnackbar(res.data.message, 'error')
            }
        })
    }
    return (
        <>
        <Navbar1/>
        <section className='pt-[40px] pb-[70px] relative'>
            <div className='container mx-auto py-[40px]'>
                {fisrtFormSection && (
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-black text-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-center">
                                    <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-xl font-[400] text-[30px]"> Dealer Registration Form</h3>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="fullname" className='text-sm'>Enter Full Name</label>
                                        <input type='text' id="fullname" name='fullname' placeholder='Enter Your Full Name' value={getDealerData.fullname} className='inputText' onChange={getData} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="mobile" className='text-sm'>Enter Username</label>
                                        <input type='text' id="username" name='username' placeholder='Enter Mobile Number or Email' value={getDealerData.username} className='inputText' onChange={getData} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='text-sm'>Password</label>
                                        <div className="relative">
                                            <input type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='Enter Password' value={getDealerData.password} className='inputText' onChange={getData} />
                                            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                                                {showPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEyeSlash />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="cpassword" className='text-sm'>Confirm Password</label>
                                        <div className="relative">
                                            <input type={showConfirmPassword ? 'text' : 'password'} id="cpassword" name='cpassword' placeholder='Enter Confirm Password' value={getDealerData.cpassword} className='inputText' onChange={getData} />
                                            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEyeSlash />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 flex items-center gap-4'>
                                    <span className='button' onClick={handleFirstFormSubmit}>Next Page</span>
                                </div>

                                <div className='flex flex-col space-y-3 justify-center mt-4'>
                                    <span className='text-center cursor-pointer text-[15px]'>Already have an account? <Link href="/login" className='text-[#FFBE26] font-[500] underline hover:opacity-80'>Login</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {secondFormSection && (
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-black text-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-center">
                                    <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                                </div>
                                <div className='mt-4 grid grid-cols-2 gap-4'>
                                    <div className=''>
                                        <label htmlFor="fullname" className='text-sm'>Enter First Name</label>
                                        <input type='text' id="firstname" name='first_name' placeholder='Enter Your First Name' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="fullname" className='text-sm'>Enter Last Name</label>
                                        <input type='text' id="lastname" name='last_name' placeholder='Enter Your Last Name' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="email" className='text-sm'>Enter Email</label>
                                        <input type='email' id="email" name='personal_email' placeholder='Enter Your Email' disabled value={getDealerData.username}  className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="email" className='text-sm'>Enter Mobile</label>
                                        <input type='text' id="mobile" name='mobile' disabled value={getDealerData.username} placeholder='Enter Your mobile' className='inputText' onChange={getData} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="address" className='text-sm'>Enter Address 1</label>
                                    <input type='text' id="add1" name='add1' placeholder='Enter Your Address' className='inputText' onChange={getData} />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="address" className='text-sm'>Enter Address 2</label>
                                    <input type='text' id="add2" name='add2'  placeholder='Enter Your Address' className='inputText' onChange={getData} />
                                </div>
                                <div className='mt-4 grid grid-cols-2 gap-4'>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter Area</label>
                                        <input type='text' id="area" name='area' placeholder='Enter Your Area' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter Landmark</label>
                                        <input type='text' id="landmark" name='landmark' placeholder='Enter Your Landmark' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter city</label>
                                        <input type='text' id="city" name='city' placeholder='Enter Your City' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter state</label>
                                        <input type='text' id="state" name='state' placeholder='Enter Your State' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter pincode</label>
                                        <input type='text' id="pincode" name='pincode' placeholder='Enter Your Pincode' className='inputText' onChange={getData} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="area" className='text-sm'>Enter country</label>
                                        <input type='text' id="country" name='country' placeholder='Enter Your Country' className='inputText' onChange={getData} />
                                    </div>
                                </div>
                                <div className='mt-4 flex items-center gap-4'>
                                    <button className='button' onClick={handlePreviousPage}>Previous Page</button>
                                    <button className='button' onClick={handleRegister}>Next Page</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showOTPSection && (
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-black text-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-center">
                                    <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-xl font-[400] text-[30px]">Verify Otp</h3>
                                </div>
                                <div className='mt-4'>
                                    <OtpInput
                                        inputStyle="inputStyle"
                                        containerStyle="justify-center"
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        inputType='text'
                                        placeholder={0}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                        shouldAutoFocus
                                    />
                                </div>

                                <div className='mt-4 text-center'>
                                    {resendTimer > 0 ? (
                                        <p className='text-[13px] text-slate-500'>Resend OTP in {resendTimer} seconds</p>
                                    ) : (
                                        <button className='text-blue-500 underline text-[13px]' onClick={handleResendOTP}>Resend OTP</button>
                                    )}
                                </div>

                                <div className='mt-4'>
                                    <span className='button' onClick={handleVerifyOTP}>Verify</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer/>
        </section>
        </>
    )
}

export default Page
