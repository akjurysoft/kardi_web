import React, { useRef } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banners = () => {
  return (
   <>
     <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            interval={5000} 
            showArrows={false} 
            showStatus={false} 
            showIndicators={true} 
            showThumbs={false}
            swipeable={true}
            emulateTouch={true}
            stopOnHover={false}
        >
            <div>
                <img src="/images/banner1.jpg" alt="Banner 1" />
            </div>
            <div>
                <img src="/images/banner2.jpg" alt="Banner 2" />
            </div>
        </Carousel>
   </>
  )
}

export default Banners
