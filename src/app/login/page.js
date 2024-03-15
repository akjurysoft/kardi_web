"use client"
import axios from '../../../axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSnackbar } from '../SnackbarProvider'
import Footer from '../components/Footer'
import { Carousel } from 'react-responsive-carousel';

const Page = () => {

    const { openSnackbar } = useSnackbar();
    const router = useRouter()

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = () => {
        axios.post('/api/login-user-dealer?type=CUSTOMER',{
            username:mobile,
            password: password
        })
        .then(res => {
            if(res.data.status === 'success'){
                openSnackbar(res.data.message, 'success')
                localStorage.setItem('kardifywebtoken', res.data.token)
                localStorage.setItem('kardifyuserid', res.data.user_id)
                router.push('/')
            }else{
                openSnackbar(res.data.message, 'error')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        
            <section className='pt-[40px] pb-[70px] relative'>
                <div className='container mx-auto'>
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="text-center">
                                    <h3 className="text-xl font-[400] text-[30px]">Login</h3>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="mobile" className='text-sm'>Enter Mobile Number</label>
                                        <input type='text' id="mobile" placeholder='Enter Your Mobile Number' className='inputText' onChange={e => setMobile(e.target.value)}/>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='text-sm'>Password</label>
                                        <input type='password' id="password" placeholder='Enter Password' className='inputText' onChange={e => setPassword(e.target.value)}/>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            

        <Footer/>

        
        </>
    )
}

export default Page
