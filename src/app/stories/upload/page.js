'use client'
import Footer from '@/app/components/Footer'
import Navbar1 from '@/app/components/Navbar'
import { Breadcrumbs, CircularProgress } from '@mui/material'
import axios from '../../../../axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/app/SnackbarProvider'

const Page = () => {
    const router = useRouter()
    const { openSnackbar } = useSnackbar();
    const [uploadType, setUploadType] = useState('image');

    const handleTabChange = (type) => {
        setUploadType(type);
    };
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(file);
                setShowImage(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };


    const [getImageData, setImageData] = useState({
        imageHeading: '',
        imageDescription: ''
    })

    const getDataImage = (e) => {
        const { value, name } = e.target;

        setImageData(() => {
            return {
                ...getImageData,
                [name]: value
            }
        })
    }

    const resetImageData = () => {
        setImageData({
            imageHeading: '',
            imageDescription: ''
        })
    }

    const handleUploadImageStory = () => {
        if (!image) {
            openSnackbar('Please select image', 'error')
            return
        }

        if (getImageData.imageHeading === '' || getImageData.imageDescription === '') {
            openSnackbar('Please fill image heading and description', 'error')
            return
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('customer_id', localStorage.getItem('kardifyuserid'));
        formData.append('heading', getImageData.imageHeading)
        formData.append('description', getImageData.imageDescription)

        axios.post('/api/add-photo-stories', formData, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    resetImageData()
                    router.push('/stories')
                } else if (res.data.message === 'Session expired') {
                    router.push('/login')
                    openSnackbar(res.data.message, 'error')
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const [getVideoData, setVideoData] = useState({
        videoHeading: '',
        videoDescription: ''
    })

    const getDataVideo = (e) => {
        const { value, name } = e.target;

        setVideoData(() => {
            return {
                ...getVideoData,
                [name]: value
            }
        })
    }

    const resetVideoData = () => {
        setVideoData({
            videoHeading: '',
            videoDescription: ''
        })
    }


    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [video, setVideo] = useState(null);
    const [showVideo, setShowVideo] = useState(null)

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setVideo(file);
                setShowVideo(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadVideoStory = () => {
        if (!video) {
            openSnackbar('Please select video', 'error')
            return
        }

        if (getVideoData.videoHeading === '' || getVideoData.videoDescription === '') {
            openSnackbar('Please fill video heading and description', 'error')
            return
        }

        const formData = new FormData();
        formData.append('video', video);
        formData.append('customer_id', localStorage.getItem('kardifyuserid'));
        formData.append('heading', getVideoData.videoHeading)
        formData.append('description', getVideoData.videoDescription)

        setUploading(true);


        axios.post('/api/add-video-stories', formData, {
            headers: {
                Authorization: localStorage.getItem('kardifywebtoken'),
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const progressPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setProgress(progressPercent);
            },
        })
            .then(res => {
                if (res.data.status === 'success') {
                    openSnackbar(res.data.message, 'success')
                    resetVideoData()
                    router.push('/stories')
                } else if (res.data.message === 'Session expired') {
                    router.push('/login')
                    openSnackbar(res.data.message, 'error')
                } else {
                    openSnackbar(res.data.message, 'error')
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setUploading(false);
                setProgress(0);
            });
    }
    return (
        <>
            <Navbar1 />

            <div className="container mx-auto py-[20px]">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/stories">
                        stories
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href='#'
                        aria-current="page"
                    >
                        upload
                    </Link>
                </Breadcrumbs>
            </div>

            <div className='container mx-auto py-[20px] flex flex-col '>
                <div className='flex flex-col space-y-9 border-[#e5e7eb] border-[1px] p-4'>
                    <span className='text-[26px] font-[400]'>Upload Story</span>
                    <div className="flex space-x-4">
                        <button onClick={() => handleTabChange('image')} className={`px-4 py-2 ${uploadType === 'image' ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'} rounded-md`}>Upload Image</button>
                        <button onClick={() => handleTabChange('video')} className={`px-4 py-2 ${uploadType === 'video' ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'} rounded-md`}>Upload Video</button>
                    </div>
                    {uploadType === 'image' && (
                        <>
                            <div className="flex items-end">
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                    {image ? (
                                        <img src={showImage} alt="Profile Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="image-upload" className="ml-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </label>
                                <input type="file" id="image-upload" accept='image/*' className="hidden" onChange={handleImageUpload} />
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <lable>Story Heading</lable>
                                <input type='text' placeholder='Story Heading' className='w-full md:w-[70%] border border-gray-300 px-3 py-3 rounded text-[14px]' name='imageHeading' onChange={getDataImage} />
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <lable>Story Description</lable>
                                <textarea type='text' placeholder='Story Description' name='imageDescription' className='w-full md:w-[70%] border border-gray-300 px-3 py-3 rounded text-[14px]' onChange={getDataImage} />
                            </div>

                            <button className='w-full md:w-[70%] bg-[#212529] text-white px-3 py-3 rounded text-[14px] hover:bg-[#212529]/90 transition duration-300' onClick={handleUploadImageStory}>Upload</button>
                        </>
                    )}

                    {uploadType === 'video' && (
                        <>
                            <div className="flex items-end">
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                    {video ? (
                                        <video src={showVideo} alt="Profile Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Video</span>
                                        </div>
                                    )}
                                </div>
                                    {uploading && (
                                        <div className="flex items-center justify-center mt-4">
                                            <CircularProgress variant="determinate" value={progress} />
                                            <span className="ml-2">{progress}%</span>
                                        </div>
                                    )}
                                <label htmlFor="image-upload" className="ml-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </label>
                                <input type="file" id="image-upload" accept='video/*' className="hidden" onChange={handleVideoUpload} />
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <lable>Story Heading</lable>
                                <input type='text' placeholder='Story Heading' className='w-full md:w-[70%] border border-gray-300 px-3 py-3 rounded text-[14px]' name='videoHeading' onChange={getDataVideo} />
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <lable>Story Description</lable>
                                <textarea type='text' placeholder='Story Description' className='w-full md:w-[70%] border border-gray-300 px-3 py-3 rounded text-[14px]' name='videoDescription' onChange={getDataVideo} />
                            </div>

                            <button className='w-full md:w-[70%] bg-[#212529] text-white px-3 py-3 rounded text-[14px] hover:bg-[#212529]/90 transition duration-300' onClick={handleUploadVideoStory}>Upload</button>
                        </>
                    )}
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Page
