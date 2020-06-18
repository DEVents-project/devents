import React, { useState, useEffect, useContext } from 'react';
import '../style/EventCard.scss';
import Context from './Context';

const EventCard = ({ el, setIsEventClicked }) => {

    const { setEventInfo } = useContext(Context);

    console.log('THIS IS THE EVENT INFO: ', el);

    return (
        <div className="event-card scale-in-center">
            {
                el &&
                <div className="event-image to-back" style={{ backgroundImage: `url('http://localhost:4000${el.imgUrl}')` }} alt="test-image" />
            }
            <h3 className="event-title to-back">{el.title}</h3>
            <p className="event-date to-back" >Date <span style={{ color: '#256eac' }}>{el.date}</span></p>
            <p className="event-time to-back" >Time <span style={{ color: '#256eac' }}>{el.time}</span></p>
            <p className="event-address to-back">{el.location}</p>
            <button onClick={() => {
                setEventInfo(el);
                localStorage.setItem('event-info', JSON.stringify(el));
                setIsEventClicked(true);
            }} className="button see-more">See more</button>
        </div>
    );
}

export default EventCard;
