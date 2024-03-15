import React from 'react'

const Brands = () => {
    return (
        <>
            <section className="py-[80px]">
                <div className="container mx-auto">
                    <div className="relative mb-[35px] text-center">
                        <h3 className='text-[40px] font-[300] '>Brands </h3>
                    </div>

                    {/* <ul className="list-inline brands-list">
                        <li>
                            <a href="#" className="partner-logo">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' />
                            </a>
                        </li>
                    </ul> */}

                    <ul className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
                        <li>
                            <a href="#" className="partner-logo flex justify-center items-center">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1674028647-987.jpg' className="w-20 h-20 transition-transform hover:scale-125 sm:h-[10] sm:w-[10]" alt="Brand" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo flex justify-center items-center">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545535-125.png' className="w-20 h-20 transition-transform hover:scale-125" alt="Brand" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo flex justify-center items-center">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676439962-731.png' className="w-20 h-20 transition-transform hover:scale-125" alt="Brand" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo flex justify-center items-center">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545622-167.png' className="w-20 h-20 transition-transform hover:scale-125" alt="Brand" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="partner-logo flex justify-center items-center">
                                <img src='https://kardify1.b2cinfohosting.in/uploads/brand/logo/1676545733-331.png' className="w-20 h-20 transition-transform hover:scale-125" alt="Brand" />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Brands
