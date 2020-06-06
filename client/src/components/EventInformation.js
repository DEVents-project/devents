import React from 'react';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';

const EventInformation = (props) => {

    return (
        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">
                <p className="event-information-date">Date</p>
                <h2 className="event-information-title">Event title</h2>
                <img className="event-information-image" src="https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/meetup.jpg" alt="test-image" />
                <div className="event-information-box">
                    <p className="event-information-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio cumque nesciunt totam nostrum dolores animi. Ullam vero accusantium temporibus hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, temporibus.</p>
                    <p className="event-information-location">Location</p>
                    {/* <Map
                        google={props.google}
                        center={{ lat: 52.5200, lng: 13.4050 }}
                        height='300px'
                        zoom={8}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default EventInformation;
