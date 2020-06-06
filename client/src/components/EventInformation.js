import React, { useContext } from 'react';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';

const EventInformation = (props) => {
    const { eventInfo, setEventInfo } = useContext(Context);
    console.log(eventInfo.img)
    return (
        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">
                <p className="event-information-date">{eventInfo.date}</p>
                <h2 className="event-information-title">{eventInfo.title}</h2>
                {
                    eventInfo.img.includes('http') ?
                        <img className="event-information-image" src={eventInfo.img} alt="event-image" />
                        :
                        <img className="event-information-image" src="https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/meetup.jpg" alt="backup-image" />
                }
                <div className="event-information-box">
                    <p className="event-information-description">{eventInfo.description}</p>
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
