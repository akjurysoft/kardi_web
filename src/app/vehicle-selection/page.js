'use client'
import Footer from '@/app/components/Footer'
import Navbar1 from '@/app/components/Navbar'
import axios from '../../../axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/app/SnackbarProvider'
import { Breadcrumbs } from '@mui/material'

const Page = ({ params }) => {
    const decodedProductId = decodeURIComponent(params.slug);
    const router = useRouter()
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            fetchBrandData()
        }

        return () => { unmounted = true };
    }, [])

    const [selectedBrand, setSelectedBrand] = useState('');
    useEffect(() => {
        if (selectedBrand) {
            fetchCarModelData(selectedBrand);
        }
    }, [selectedBrand]);

    const [brandData, setBrandData] = useState([])
    const fetchBrandData = useCallback(
        () => {
            axios.get(`/api/fetch-car-brands-customers`)
                .then((res) => {
                    if (res.data.code == 200) {
                        setBrandData(res.data.brandName)
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

    const [carModels, setCarModels] = useState([]);
    const fetchCarModelData = useCallback((brandId) => {
        axios.get(`/api/fetch-car-models-customers?brand_id=${brandId}`)
            .then((res) => {
                if (res.data.code == 200) {
                    setCarModels(res.data.modelName);
                } else if (res.data.message === 'Session expired') {
                    openSnackbar(res.data.message, 'error');
                    router.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data.statusCode === 400) {
                    openSnackbar(err.response.data.message, 'error');
                }
            });
    }, []);

    const [selectedModel, setSelectedModel] = useState('');
    const [carYears, setCarYears] = useState([]);
    const fetchCarYears = useCallback((modelId) => {
        axios.get(`/api/fetch-car-models-customers?id=${modelId}`)
            .then((res) => {
                if (res.data.code === 200) {
                    const modelData = res.data.modelName[0];
                    const startYear = parseInt(modelData.start_year);
                    const endYear = parseInt(modelData.end_year);
                    const years = [];
                    for (let year = startYear; year <= endYear; year++) {
                        years.push(year);
                    }
                    setCarYears(years);
                } else if (res.data.message === 'Session expired') {
                    openSnackbar(res.data.message, 'error');
                    router.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data.statusCode === 400) {
                    openSnackbar(err.response.data.message, 'error');
                }
            });
    }, []);

    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value;
        setSelectedBrand(selectedBrandId);
    };


    const handleModelChange = (e) => {
        const selectedModelId = e.target.value;
        setSelectedModel(selectedModelId);
        fetchCarYears(selectedModelId);
    };

    const [year, setYear] = useState('');

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);
    };
    const handleSubmit = () => {
        if (!selectedBrand && !selectedModel) {
            openSnackbar('Please select brand & model', 'error')
        } else if (!year) {
            openSnackbar('Please select year', 'error')
        } else {
            openSnackbar('Vehicle selected successfully', 'success')
            router.push(`/vehicle-selection/product/car_brand_id=${selectedBrand}&car_model_id=${selectedModel}&year=${year}`)
        }
    }

    return (
        <>
            <Navbar1 />
            <section className='pt-[40px] pb-[70px] relative'>
                <div className='container mx-auto'>
                    <Breadcrumbs aria-label="breadcrumb" className='py-[20px] text-sm'>
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href='#'
                            aria-current="page"
                        >
                            Vehicle Selection
                        </Link>
                    </Breadcrumbs>
                    <div className='flex justify-center'>
                        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                            <div className="bg-black text-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-center">
                                    <Image src="/images/logo.png" width={100} height={100} alt="logo" />
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-xl font-[600] text-[30px]">Vehicle Selection</h3>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4 flex flex-col space-y-1'>
                                        <label htmlFor="mobile" className='text-sm'>Choose Car Make/Brand</label>
                                        <select name='brand' className='bg-white text-black' id='brand' onChange={handleBrandChange}>
                                            <option>Choose Car</option>
                                            {brandData && brandData.map((brand, index) => (
                                                <option key={index} value={brand.id}>{brand.brand_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4 flex flex-col space-y-1'>
                                        <label htmlFor="password" className='text-sm'>Choose Car Model</label>
                                        <select name='model' id='model' className='bg-white text-black' onChange={handleModelChange} value={selectedModel}>
                                            <option>Choose Car Model</option>
                                            {carModels && carModels.map((model, index) => (
                                                <option key={index} value={model.id}>{model.model_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='mb-4 flex flex-col space-y-1'>
                                        <label htmlFor="password" className='text-sm'>Choose Year</label>
                                        <select name='year' id='year' className='bg-white text-black' onChange={handleYearChange} value={year}>
                                            <option value=''>Choose Year</option>
                                            {carYears && carYears.map((year, index) => (
                                                <option key={index} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <span className='button' onClick={handleSubmit}>SUBMIT</span>
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
