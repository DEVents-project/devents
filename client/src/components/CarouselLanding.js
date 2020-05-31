import React from 'react';
import '../style/CarouselLanding.scss';
import CarouselSlide from './CarouselSlide';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Carousel = require('react-responsive-carousel').Carousel;


const CarouselLanding = () => {

    const content = [
        {
            title: 'May the force be with you',
            subtitle: 'The Force is a metaphysical and ubiquitous power in the Star Wars universe.',
            image: 'https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/meetup.jpg'
        },
        {
            title: 'This is a very cool feature',
            subtitle: 'Just using this will blow your mind.',
            image: 'https://res.cloudinary.com/jimbocloud/image/upload/v1590935125/devents/coding-office.jpg'
        },
        {
            title: 'Ever wanted to be popular?',
            subtitle: 'Well just mix two colors and your are good to go!',
            image: 'https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/conference2.jpg'
        },
        {
            title: 'This is another event',
            subtitle: "I'm pretty sure this is a good one",
            image: 'https://res.cloudinary.com/jimbocloud/image/upload/v1590935046/devents/conference1.jpg'
        }
    ];

    return (
        <Carousel
            showArrows={true}
            showIndicators={true}
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
                content.map((el, i) => <CarouselSlide key={i} content={content[i]} />)
            }
        </Carousel>
    );
}

export default CarouselLanding;
