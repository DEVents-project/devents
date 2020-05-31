import React from 'react';
import '../style/CarouselSlide.scss';

const CarouselSlide = ({ content }) => {
    console.log(content.image);
    return (
        <div className="slide-container" >
            <div className="oneSlide" style={{ backgroundImage: `url("${content.image}")` }}>
                <div className="slide-text">
                    <h2 className="titleAdvert">{content.title}</h2>
                    <p className="textAdvert">{content.subtitle}</p>

                    <button className="button">
                        Check it out!
                </button>
                </div>
            </div>
        </div>
    );
}

export default CarouselSlide;
