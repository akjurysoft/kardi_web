import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="text-black">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <div className="fotr-media-item">
                                <h3>Quick Links</h3>
                                <ul className="list-none fotr-menu">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/quick-links/about us">About us</a></li>
                                    <li><a href="/contact-us">Contact us</a></li>
                                    <li><a href="/profile/my-account">My account</a></li>
                                    {/* <li><a href="/catalogs">Catalogs</a></li>
                                    <li><a href="/new-designs-or-products">New Designs Or Products</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <div className="fotr-media-item">
                                <h3>Customised Services</h3>
                                <ul className="list-none fotr-menu">
                                    <li><a href="/quick-links/privacy policy">Privacy policy</a></li>
                                    <li><a href="/quick-links/return policy">Return policy</a></li>
                                    <li><a href="/quick-links/shipping policy">Shipping policy</a></li>
                                    <li><a href="/terms-of-us">Terms of us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <div className="fotr-media-item">
                                <h3>Social Accounts</h3>
                                <ul className="list-none hdr-social-link">
                                    <li><a className="fb" href="https://www.facebook.com"><FaFacebookF /></a></li>
                                    <li><a className="tw" href="https://twitter.com"><FaTwitter /></a></li>
                                    <li><a className="linkdn" href="https://www.linkedin.com"><FaLinkedinIn /></a></li>
                                </ul>
                            </div>
                            <div className="fotr-media-item">
                                <h4>Pay Using</h4>
                                <ul className="list-none payment-icon flex space-x-2">
                                    <li><a href="#" className='w-[45px] block'><img src="https://kardify.netlify.app/assets/images/paypal.png" alt="PayPal" /></a></li>
                                    <li><a href="#" className='w-[45px] block'><img src="https://kardify.netlify.app/assets/images/maestro.png" alt="Maestro" /></a></li>
                                    <li><a href="#" className='w-[45px] block'><img src="https://kardify.netlify.app/assets/images/discover.png" alt="Discover" /></a></li>
                                    <li><a href="#" className='w-[45px] block'><img src="https://kardify.netlify.app/assets/images/visa.png" alt="Visa" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 md:text-right">
                            <div className="fotr-media-item fotr-Subscribe">
                                <h3>Subscribe to Newsletter</h3>
                                <p>Subscribe to our newsletter and get 10% off your first purchase</p>
                                <div className="">
                                    <div className="">
                                        <input type="text" className="form-control" name="email" placeholder="Please enter your email" />
                                        <button type="submit" className="btn btn-primary">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="cpyrgt-wrap text-white">
                    <div className="container mx-auto py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="col-span-1 md:col-span-1">
                                <p>© {new Date().getFullYear()}, <b>Kardify</b> | All rights reserved.</p>
                            </div>
                            <div className="col-span-1 md:col-span-1 text-right">
                                <p>Powered By <a href="https://jurysoft.com/" target="_blank" className='hover:underline'>Jurysoft</a></p>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>

        </>
    )
}

export default Footer
