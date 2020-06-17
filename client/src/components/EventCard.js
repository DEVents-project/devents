import React from 'react';
import '../style/EventCard.scss';

const EventCard = ({ setIsEventClicked, setEventInfo, _id, authorId, title, img, date, time, location, coordinates, description, url }) => {

    return (
        <div className="event-card scale-in-center">
            {
                img ? (
                    <div className="event-image to-back" style={{ backgroundImage: `url('http://localhost:4000${img}')` }} alt="test-image" />) : null

            }
            <h3 className="event-title to-back">{title}</h3>
            <p className="event-date to-back" >Date <span style={{ color: '#256eac' }}>{date}</span></p>
            <p className="event-time to-back" >Time <span style={{ color: '#256eac' }}>{time}</span></p>
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
                        description: description,
                        url: url,
                        authorId: authorId,
                        _id: _id
                    }
                );
                setIsEventClicked(true);
            }} className="button see-more">See more</button>
        </div>
    );
}

export default EventCard;
