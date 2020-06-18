import React, { useState, useEffect } from 'react';
import '../style/EventCard.scss';

const EventCard = ({ lat, setLat, lng, setLng, getUserData, fetchEvents, setIsEventClicked, eventInfo, setEventInfo, _id, authorId, title, img, date, time, location, coordinates, description, url, type }) => {

    return (
        <div className="event-card scale-in-center">
            {
                img &&
                    img.includes('http') ?
                    <div className="event-image to-back" style={{
                        backgroundImage: `url('${img}')`
                    }} alt="test-image" />
                    :
                    <div className="event-image to-back" style={{ backgroundImage: `url('http://localhost:4000${img}')` }} alt="test-image" />
            }
            <h3 className="event-title to-back">{title}</h3>
            <p className="event-date to-back" >Date <span style={{ color: '#256eac' }}>{date.includes('valid') ? 'Information in the link' : date}</span></p>
            <p className="event-time to-back" >Time <span style={{ color: '#256eac' }}>{time.includes('valid') ? 'Information in the link' : time.includes('M') ? time : time + ' H.'}</span></p>
            <p className="event-address to-back">{location}</p>
            <button onClick={() => {
                setEventInfo(
                    {
                        title: title,
                        img: img,
                        date: date,
                        time: time,
                        location: location,
                        coordinates: coordinates,
                        lat: lat,
                        lng: lng,
                        description: description,
                        url: url,
                        authorId: authorId,
                        _id: _id,
                        type: type
                    }
                );
                setIsEventClicked(true);
            }} className="button see-more">See more</button>
        </div>
    );
}

export default EventCard;
