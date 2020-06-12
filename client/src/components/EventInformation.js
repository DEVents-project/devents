import React, { useContext } from 'react';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';

const EventInformation = (props) => {
    const { eventInfo, setEventInfo } = useContext(Context);

    // getting the coordinates to pass them to the google maps:
    const lat = eventInfo.coordinates && parseFloat(eventInfo.coordinates.split(',')[0].slice(7, 14));
    const lng = eventInfo.coordinates && parseFloat(eventInfo.coordinates.split(',')[1].slice(6, 13));
    // console.log('lat: ', lat);
    // console.log('lng: ', lng);

    return (
        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">
                <p className="event-information-date">{eventInfo.date}</p>
                <h2 className="event-information-title">{eventInfo.title}</h2>
                <div className="event-information-box-one">
                    {
                        eventInfo.img && eventInfo.img.includes('/image/') ?
                            <img className="event-information-image" src={`http://localhost:4000${eventInfo.img}`} alt="event-image" />
                            :
                            <img className="event-information-image" src='https://res.cloudinary.com/jimbocloud/image/upload/v1590935043/devents/conference2.jpg' alt="event-image" />
                    }
                    <a href={eventInfo.url} target='_blank' className="button link-to-site" >GO TO EVENT</a>
                </div>
                <div className="event-information-box-two">
                    <p className="event-information-description">{eventInfo.description}</p>
                    <p className="event-information-location">{eventInfo.address}</p>
                </div>
                <div className="google-map">
                    <p className="map-address">{eventInfo.location ?
                        eventInfo.location
                        :
                        null}</p>
                    {
                        eventInfo.coordinates ?
                            <Map
                                google={props.google}
                                center={{ lat: lat, lng: lng }}
                                height='350px'
                                width='1000px'
                                zoom={15}
                            />
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

export default EventInformation;
