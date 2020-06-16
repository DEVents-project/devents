import React from 'react';
import '../style/EventCard.scss';

const EventCard = ({ setIsEventClicked, setEventInfo, _id, authorId, title, img, date, location, coordinates, description, url }) => {

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
            <p className="event-date to-back">{date}</p>
            <p className="event-address to-back">{location}</p>
            <button onClick={() => {
                setEventInfo(
                    {
                        title: title,
                        img: img,
                        date: date,
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
