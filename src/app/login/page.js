"use client"
import axios from '../../../axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSnackbar } from '../SnackbarProvider'
import Footer from '../components/Footer'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'
import Navbar1 from '../components/Navbar'

const Page = () => {

    const { openSnackbar } = useSnackbar();
    const router = useRouter()

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const [isDealerLogin, setIsDealerLogin] = useState(false)
    const userLogin = () => {
        if (mobile === '' || password === '') {
            openSnackbar('Please fill all the fields', 'error')
            return
        }
        const loginType = isDealerLogin ? 'DEALER' : 'CUSTOMER';
        axios.post(`/api/login-user-dealer?type=${loginType}`, {
            username: mobile,
            password: password
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    localStorage.setItem('kardifywebtoken', res.data.token)
                    localStorage.setItem('kardifyuserid', res.data.user_id)
                    localStorage.setItem('kardifylogintype', 'logedin')
                    router.push('/')
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
                openSnackbar(err.response.data.message, 'error')
            })
    }

    const toggleLoginType = () => {
        setPassword('')
        setMobile('')
        setIsDealerLogin(prevState => !prevState);
    }

    return (
        <>

        <Navbar1/>
            <section className='pt-[40px] pb-[70px] relative'>
                <div className='container mx-auto'>
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-black text-white rounded-lg shadow-lg p-6 border">
                                <div className="flex justify-center">
                                    <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-xl font-[400] text-[30px]"> {isDealerLogin ? 'Dealer' : ''} Login</h3>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="mobile" className='text-sm'>Enter Username</label>
                                        <input type='text' id="mobile" placeholder='Mobile No. or Email' className='inputText' onChange={e => setMobile(e.target.value)} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='text-sm'>Password</label>
                                        <input type='password' id="password" placeholder='Enter Password' className='inputText' onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <Link href="#" className='text-[13px] text-[#FFBE26] font-[500] underline hover:opacity-80'>Forgot Password</Link>
                                </div>
                                <div className='mt-4'>
                                    <span className='button' onClick={userLogin}>SUBMIT</span>
                                </div>
                                <div className='or'>
                                    <span>OR</span>
                                </div>

                                <div className='flex flex-col space-y-3 justify-center'>
                                    <span className='text-center cursor-pointer text-[15px] text-[#FFBE26] font-[500] underline hover:opacity-80' onClick={toggleLoginType}>{isDealerLogin ? 'Login as Customer' : 'Login as Dealer'}</span>
                                    <span className='text-center text-[13px] font-[500]'> {isDealerLogin ? 'Want to be a Dealer?' : "Don't have an account"} <Link href={isDealerLogin ? '/signup/dealer' : '/signup/customer'} className='text-[13px] text-[#FFBE26] font-[500] underline hover:opacity-80 cursor-pointer hover:text-[#FFBE26]'>Sign Up</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />


        </>
    )
}

export default Page
