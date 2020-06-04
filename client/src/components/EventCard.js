import React from 'react';
import '../style/EventCard.scss';

const EventCard = ({ setIsEventClicked }) => {

    return (
        <div className="event-card">
            <h3 className="event-title to-back">Name of the event</h3>
            <img className="event-image to-back" src="https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/meetup.jpg" alt="test-image" />
            <p className="event-date to-back">Date of the event</p>
            <p className="event-address to-back">Address of the event</p>
            <button onClick={() => setIsEventClicked(true)} className="button see-more">See more</button>
        </div>
    );
}

export default EventCard;
