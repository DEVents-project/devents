import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

const EventInformation = (props) => {
    const history = useHistory();

    const { lat, setLat, lng, setLng, getOneEvent, meetups, setMeetups, eventInfo, setEventInfo, userData, token } = useContext(Context);

    // By clicking on EDIT:
    const [editMode, setEditMode] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newCoordinates, setNewCoordinates] = useState('');


    useEffect(() => {

        window.scrollTo(0, 0);

        const event = localStorage.getItem('event-info')
        if (event) {
            setEventInfo(JSON.parse(event))
        }

    }, []);


    const deleteEvent = async (e) => {
        e.preventDefault();

        const eventToDelete = meetups.filter(meetup => meetup._id === eventInfo._id)[0];
        // console.log('EVENT TO DELETE', eventToDelete);
        const deletedEvent = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(eventToDelete)
        };

        const request = await fetch('http://localhost:4000/events', deletedEvent);
        const response = await request.json();
        // console.log('EVent Deleted - Response: ', response);
        if (response.success) {
            setMeetups(response.event);
            setEditMode(false);
            localStorage.removeItem('event-info');
            setIsEventDeleted(true);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('NEW COORDINATES: ', newCoordinates);

        const newInfo = {
            date: newDate === '' ? eventInfo.date : newDate,
            time: newTime === '' ? eventInfo.time : newTime,
            title: newTitle === '' ? eventInfo.title : newTitle,
            description: newDescription === '' ? eventInfo.description : newDescription,
            location: newLocation === '' ? eventInfo.location : newLocation,
            coordinates: newCoordinates === '' ? eventInfo.coordinates : JSON.stringify(newCoordinates),
            _id: eventInfo._id,
            lat: JSON.stringify(newCoordinates) === '' ? lat : newCoordinates.lat,
            lng: JSON.stringify(newCoordinates) === '' ? lng : newCoordinates.lng
        };

        console.log('NEW INFO: ', newInfo);

        const newEventInfo = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const request = await fetch('http://localhost:4000/events', newEventInfo);
        const response = await request.json();
        // console.log('EVent infoRmAtioN - Response: ', response);
        if (response.success) {
            setEventInfo(response.event);
            localStorage.setItem('event-info', JSON.stringify(response.event));
            setEditMode(false);
        };
    };


    const [isEventDeleted, setIsEventDeleted] = useState(false);
    useEffect(() => {
        isEventDeleted && history.push('/account');
    });


    console.log('INFORMATION EVENT: ', eventInfo);


    return (

        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">

                {
                    eventInfo ?

                        <Fragment>
                            {
                                userData && eventInfo && userData._id === eventInfo.authorId ?

                                    <Fragment>

                                        {
                                            editMode ?

                                                <form onSubmit={handleSubmit} className="event-information-container edit-form">
                                                    <label htmlFor="date" className="edit-label event-information-date">Date
                                            <input type="date" placeholder={eventInfo && eventInfo.date} onChange={(e) => setNewDate(e.target.value)} />
                                                    </label>
                                                    <label htmlFor="time" className="edit-label event-information-time">Time
                                            <input type="time" placeholder={eventInfo && eventInfo.time} onChange={(e) => setNewTime(e.target.value)} />
                                                    </label>
                                                    <label htmlFor="title" className="edit-label event-information-title">Title
                                            <input type="text" placeholder={eventInfo && eventInfo.title} onChange={(e) => setNewTitle(e.target.value)} />
                                                    </label>
                                                    <div className="event-information-box-one">
                                                        {
                                                            eventInfo.imgUrl && eventInfo.imgUrl.includes('http') ?
                                                                <img className="event-information-image" src={eventInfo.imgUrl} alt="event-image" />
                                                                :
                                                                <img className="event-information-image" src={`http://localhost:4000${eventInfo.imgUrl}`} alt="event-image" />
                                                        }
                                                    </div>
                                                    <div className="event-information-box-two">
                                                        <label htmlFor="description" className="edit-label event-information-description">Description
                                                <textarea type="text" placeholder={eventInfo && eventInfo.description} onChange={(e) => setNewDescription(e.target.value)} />
                                                        </label>
                                                    </div>
                                                    <div className="google-map">
                                                        <label className="event-information-location">Location
                                                <GoogleMapsAutocomplete isRequired={false} setLocation={setNewLocation} setCoordinates={setNewCoordinates} setLat={setLat} setLng={setLng} />
                                                        </label>
                                                        {
                                                            eventInfo ?
                                                                <Map
                                                                    google={props.google}
                                                                    center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                                    height='350px'
                                                                    width='1000px'
                                                                    zoom={15}
                                                                />
                                                                : null
                                                        }
                                                    </div>
                                                    <button type="submit" className="button link-to-site save-button">SAVE</button>
                                                </form>

                                                :

                                                <Fragment>
                                                    <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                                                    <p className="event-information-time">Time: <strong>{eventInfo.time.includes('M') ? eventInfo.time : eventInfo.time + ' H.'}</strong></p>
                                                    <h2 className="event-information-title">{eventInfo.title}</h2>
                                                    <div className="event-information-box-one">
                                                        {
                                                            eventInfo.imgUrl && eventInfo.imgUrl.includes('http') ?
                                                                <img className="event-information-image" src={eventInfo.imgUrl} alt="event-image" />
                                                                :
                                                                <img className="event-information-image" src={eventInfo.imgUrl ? `http://localhost:4000${eventInfo.imgUrl}` : `http://localhost:4000${eventInfo.imgUrlUrl}`} alt="event-image" />
                                                        }
                                                        <div className="editing-buttons">
                                                            <button className="button link-to-site" onClick={() => { setEditMode(true); localStorage.removeItem('event-info') }}>EDIT</button>
                                                            <button className="button link-to-site delete-button" onClick={(e) => { if (window.confirm('Are you sure you want to delete this event?')) { deleteEvent(e) } }}>DELETE</button>
                                                        </div>
                                                    </div>
                                                    <div className="event-information-box-two">
                                                        <p className="event-information-description">{eventInfo.description}</p>
                                                        <p className="event-information-location">{eventInfo.address}</p>
                                                    </div>
                                                    <div className="google-map">
                                                        {
                                                            eventInfo.location ?
                                                                <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.location}</p>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            eventInfo ?
                                                                <Map
                                                                    google={props.google}
                                                                    center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                                    height='350px'
                                                                    width='1000px'
                                                                    zoom={15}
                                                                />
                                                                : null
                                                        }
                                                    </div>
                                                </Fragment>
                                        }

                                    </Fragment>

                                    :

                                    <Fragment>
                                        <p className="event-information-date">Date: <strong>{eventInfo.date.includes('valid') ? 'More information following the link' : eventInfo.date}</strong></p>
                                        <p className="event-information-time">Time: <strong>{eventInfo.time.includes('valid') ? 'More information following the link' : eventInfo.time.includes('M') ? eventInfo.time : eventInfo.time + ' H.'}</strong></p>
                                        <h2 className="event-information-title">{eventInfo.title}</h2>
                                        <div className="event-information-box-one">
                                            {
                                                eventInfo.imgUrl && eventInfo.imgUrl.includes('http') ?
                                                    <img className="event-information-image" src={eventInfo.imgUrl} alt="event-image" />
                                                    :
                                                    <img className="event-information-image" src={`http://localhost:4000${eventInfo.imgUrl}`} alt="event-image" />
                                            }
                                            {
                                                eventInfo.url ?
                                                    <a href={eventInfo.url} target='_blank' className="button link-to-site" >GO TO EVENT</a>
                                                    : null
                                            }
                                        </div>
                                        <div className="event-information-box-two">
                                            <p className="event-information-description">{eventInfo.description}</p>
                                            <p className="event-information-location">{eventInfo.address}</p>
                                        </div>
                                        <div className="google-map">
                                            {
                                                eventInfo.location ?
                                                    <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.location}</p>
                                                    :
                                                    null
                                            }
                                            {
                                                eventInfo.coordinates ?
                                                    <Map
                                                        google={props.google}
                                                        center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                        height='350px'
                                                        width='1000px'
                                                        zoom={15}
                                                    />
                                                    : null
                                            }
                                        </div>
                                    </Fragment>

                            }

                        </Fragment>

                        :

                        null
                }

            </div>
        </div>
    );
}

export default EventInformation;
