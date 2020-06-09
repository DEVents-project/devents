import React, { useContext } from 'react';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';

const EventInformation = (props) => {
    const { eventInfo, setEventInfo } = useContext(Context);

    // console.log('eventInfo: ', eventInfo)

    return (
        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">
                <p className="event-information-date">{eventInfo.date}</p>
                <h2 className="event-information-title">{eventInfo.title}</h2>
                {
                    eventInfo.img.includes('http') ?
                        <div className="event-information-box-one">
                            <img className="event-information-image" src={eventInfo.img} alt="event-image" />
                            <a href={eventInfo.url} target='_blank' className="button link-to-site" >GO TO EVENT</a>
                        </div>
                        :
                        <div className="event-information-box-one">
                            <img className="event-information-image" src="https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/meetup.jpg" alt="backup-image" />
                            <a href={eventInfo.url} target='_blank' className="button link-to-site" >GO TO EVENT</a>
                        </div>
                }
                <div className="event-information-box-two">
                    <p className="event-information-description">{eventInfo.description}</p>
                    <p className="event-information-location">{eventInfo.address}</p>
                </div>
                <div className="google-map">
                    <Map
                        google={props.google}
                        center={{ lat: 52.5200, lng: 13.4050 }}
                        height='350px'
                        width='1000px'
                        zoom={8}
                    />
                </div>
            </div>
        </div>
    );
}

export default EventInformation;
