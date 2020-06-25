import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/CarouselSlide.scss';

const CarouselSlide = ({ event }) => {
    const history = useHistory();

    const { setEventInfo } = useContext(Context);

    const [linkToEvent, setLinkToEvent] = useState(false);

    useEffect(() => {
        linkToEvent && history.push('/event');
    });

    // console.log('EVENT:', event);

    return (
        <div className="slide-container" >
            <div className="oneSlide" style={{ backgroundImage: `url("${event.imgUrl}")` }}>
                <div className="slide-text">
                    <h2 className="titleAdvert">{event.title}</h2>
                    <p className="textAdvert">{event.location}</p>

                    <button className="button checkButton" onClick={() => {
                        setEventInfo(event);
                        localStorage.setItem('event-info', JSON.stringify(event))
                        setLinkToEvent(true)
                    }}>Check it out!</button>
                </div>
            </div>
        </div>
    );
}

export default CarouselSlide;
