'use client'
import { useSnackbar } from '@/app/SnackbarProvider';
import Footer from '@/app/components/Footer';
import Navbar1 from '@/app/components/Navbar';
import axios from '../../../../axios';
import Image from 'next/image'
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Page = () => {
  const { openSnackbar } = useSnackbar();
  const router = useRouter()

  const [showFirstSection, setShowFirstSection] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [userId, setUserId] = useState('')
  const [getUserData, setGetUserData] = useState({
    fullname: '',
    username: '',
    password: '',
    cpassword: ''
  })
  const getData = (e) => {
    const { value, name } = e.target;

    setGetUserData((pevData) => ({
      ...pevData,
      [name]: value
    }))
  }

  const handleRegister = () => {
    axios.post(`/api/register-customer-dealer?type=CUSTOMER`, {
      fullname: getUserData.fullname,
      username: getUserData.username,
      password: getUserData.password,
      confirm_password: getUserData.cpassword
    })
      .then(res => {
        if (res.data.status === 'success') {
          openSnackbar(res.data.message, 'success')
          setUserId(res.data.created_user.id)
          setShowFirstSection(false)
          setShowOTPSection(true)
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
  const [showOTPSection, setShowOTPSection] = useState(false);
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
    axios.post(`/api/verify-otp-customer-dealer?type=CUSTOMER`, {
      user_id: userId,
      otp: otp
    })
      .then(res => {
        if (res.data.status === 'success') {
          openSnackbar(res.data.message, 'success')
          setShowFirstSection(false)
          router.push('/login')
        } else {
          openSnackbar(res.data.message, 'error')
        }
      })
      .catch(err => {
        openSnackbar(err.response.data.message, 'error')
      })
  }

  return (
    <>
      <Navbar1 />

      <div className='container mx-auto py-[30px]'>
        {showFirstSection && (
          <div className='flex justify-center'>
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
              <div className="bg-black text-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center">
                  <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-[400] text-[30px]"> Sign Up</h3>
                </div>
                <div className='mt-4'>
                  <div className='mb-4'>
                    <label htmlFor="fullname" className='text-sm'>Enter Full Name</label>
                    <input type='text' id="fullname" name='fullname' placeholder='Enter Your Full Name' className='inputText' onChange={getData} />
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='mb-4'>
                    <label htmlFor="mobile" className='text-sm'>Enter Username</label>
                    <input type='text' id="username" name='username' placeholder='Enter Mobile Number or Email' className='inputText' onChange={getData} />
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='mb-4'>
                    <label htmlFor="password" className='text-sm'>Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='Enter Password' className='inputText' onChange={getData} />
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
                      <input type={showConfirmPassword ? 'text' : 'password'} id="cpassword" name='cpassword' placeholder='Enter Confirm Password' className='inputText' onChange={getData} />
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
                  <span className='button' onClick={handleRegister}>Send Otp</span>
                </div>

                <div className='flex flex-col space-y-3 justify-center mt-4'>
                  <span className='text-center cursor-pointer text-[15px]'>Already have an account? <Link href="/login" className='text-[#FFBE26] font-[500] underline hover:opacity-80'>Login</Link></span>
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
                    containerStyle="justify-center text-white"
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
                <div className='flex flex-col space-y-3 justify-center mt-4'>
                  <span className='text-center cursor-pointer text-[15px]'>Already have an account? <Link href="/login" className='text-[#FFBE26] font-[500] underline hover:opacity-80'>Login</Link></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Page
