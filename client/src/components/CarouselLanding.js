import React, { useContext, useEffect } from 'react';
import Context from './Context';
import '../style/CarouselLanding.scss';
import CarouselSlide from './CarouselSlide';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Carousel = require('react-responsive-carousel').Carousel;


const CarouselLanding = () => {

    const { allEventsTogether } = useContext(Context);


    return (
        <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            stopOnHover={false}
            interval={3500}
            transitionTime={600}
            className="carousel"
        >
            {
                allEventsTogether &&
                allEventsTogether.slice(0, 8).map((event, i) => <CarouselSlide key={i} event={event} />)
            }
        </Carousel>
    );
}

export default CarouselLanding;
