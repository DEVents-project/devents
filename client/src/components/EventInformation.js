import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { setLanguage } from 'react-geocode';

const EventInformation = (props) => {
    const history = useHistory();

    const { lat, setLat, lng, setLng, getOneEvent, getUserData, fetchEvents, meetups, setMeetups, eventInfo, setEventInfo, userData, setUserData, token } = useContext(Context);

    // By clicking on EDIT:
    const [editMode, setEditMode] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newCoordinates, setNewCoordinates] = useState('');

    const [eventType, setEventType] = useState(localStorage.getItem('eventType'));
    const [eventId, setEventId] = useState(localStorage.getItem('eventId'));



    const [refresh, setRefresh] = useState(false);
    useEffect(() => {

        window.scrollTo(0, 0);

        setLat(localStorage.getItem('lat'));
        setLng(localStorage.getItem('lng'));

        const getOneEvent = async () => {

            const options = {
                method: 'GET',
                headers: {
                    'eventId': eventId,
                    'lan': lat,
                    'lng': lng,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            if (eventType === 'meetup') {
                const response = await fetch('http://localhost:4000/events/event', options);
                const data = await response.json();
                setEventInfo(
                    {
                        title: data.event.title,
                        img: data.event.imgUrl,
                        date: data.event.date,
                        time: data.event.time,
                        location: data.event.location,
                        coordinates: data.event.coordinates,
                        description: data.event.description,
                        url: data.event.url,
                        authorId: data.event.authorId,
                        _id: data.event._id,
                        type: data.event.type
                    });

                console.log('RESPONSE: ', data)

            } else if (eventType === 'workshop') {
                const response = await fetch('http://localhost:4000/workshops', options);
                const data = await response.json();
                setEventInfo(
                    {
                        title: data.event.title,
                        img: data.event.imgUrl,
                        date: data.event.date,
                        time: data.event.time,
                        location: data.event.location,
                        coordinates: data.event.coordinates,
                        description: data.event.description,
                        url: data.event.url,
                        authorId: data.event.authorId,
                        _id: data.event._id,
                        type: data.event.type
                    });

            } else if (eventType === 'convention') {
                const response = await fetch('http://localhost:4000/conventions', options);
                const data = await response.json();
                setEventInfo(
                    {
                        title: data.event.title,
                        img: data.event.imgUrl,
                        date: data.event.date,
                        time: data.event.time,
                        location: data.event.location,
                        coordinates: data.event.coordinates,
                        description: data.event.description,
                        url: data.event.url,
                        authorId: data.event.authorId,
                        _id: data.event._id,
                        type: data.event.type
                    });
            }
        };

        if (eventInfo) {
            console.log('EVENTINFO === TRUE', eventInfo.coordinates);
            setLat(parseFloat(eventInfo.coordinates.split(',')[0].slice(7, 14)));
            setLng(parseFloat(eventInfo.coordinates.split(',')[1].slice(6, 13)));
            localStorage.setItem('eventType', eventInfo.type);
            localStorage.setItem('eventId', eventInfo._id);
            localStorage.setItem('lat', lat);
            localStorage.setItem('lng', lng);
        } else {
            console.log('EVENTINFO === FALSE');
            getOneEvent();
            setRefresh(true)
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
            setIsEventDeleted(true);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newInfo = {
            date: newDate === '' ? eventInfo.date : newDate,
            time: newTime === '' ? eventInfo.time : newTime,
            title: newTitle === '' ? eventInfo.title : newTitle,
            description: newDescription === '' ? eventInfo.description : newDescription,
            location: newLocation === '' ? eventInfo.location : newLocation,
            coordinates: newCoordinates === '' ? eventInfo.coordinates : newCoordinates,
            _id: eventInfo._id
        };

        // console.log('NEW INFO: ', newInfo);

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
            setEditMode(false);
        };
    };


    const [isEventDeleted, setIsEventDeleted] = useState(false);
    useEffect(() => {
        isEventDeleted && history.push('/account');
    });

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     setRefresh(true)

    //     localStorage.setItem('eventType', eventInfo.type);
    //     localStorage.setItem('eventId', eventInfo._id);
    //     localStorage.setItem('lat', lat);
    //     localStorage.setItem('lng', lng);
    // }, [])


    console.log('EVEnT TYPE: ', eventType)
    console.log('EVEnT ID: ', eventId)

    console.log('lat: ', lat);
    console.log('lng: ', lng);

    console.log('INFORMATION EVENT: ', eventInfo);
    // console.log('USER INFORMATION_userData: ', userData);
    // console.log('EVENT INFORMATION_eventInfo: ', eventInfo);
    // console.log('meetups: ', meetups);

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
                                                            eventInfo.img && eventInfo.img.includes('http') ?
                                                                <img className="event-information-image" src={eventInfo.img} alt="event-image" />
                                                                :
                                                                <img className="event-information-image" src={`http://localhost:4000${eventInfo.img}`} alt="event-image" />
                                                        }
                                                    </div>
                                                    <div className="event-information-box-two">
                                                        <label htmlFor="description" className="edit-label event-information-description">Description
                                                <textarea type="text" placeholder={eventInfo && eventInfo.description} onChange={(e) => setNewDescription(e.target.value)} />
                                                        </label>
                                                    </div>
                                                    <div className="google-map">
                                                        <label className="event-information-location">Location
                                                <GoogleMapsAutocomplete setLocation={setNewLocation} setCoordinates={setNewCoordinates} />
                                                        </label>
                                                        {
                                                            eventInfo.coordinates && lat && lng ?
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
                                                    <button type="submit" className="button link-to-site save-button">SAVE</button>
                                                </form>

                                                :

                                                <Fragment>
                                                    <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                                                    <p className="event-information-time">Time: <strong>{eventInfo.time.includes('M') ? eventInfo.time : eventInfo.time + ' H.'}</strong></p>
                                                    <h2 className="event-information-title">{eventInfo.title}</h2>
                                                    <div className="event-information-box-one">
                                                        {
                                                            eventInfo.img && eventInfo.img.includes('http') ?
                                                                <img className="event-information-image" src={eventInfo.img} alt="event-image" />
                                                                :
                                                                <img className="event-information-image" src={eventInfo.img ? `http://localhost:4000${eventInfo.img}` : `http://localhost:4000${eventInfo.imgUrl}`} alt="event-image" />
                                                        }
                                                        <div className="editing-buttons">
                                                            <button className="button link-to-site" onClick={() => setEditMode(true)}>EDIT</button>
                                                            <button className="button link-to-site" onClick={(e) => { if (window.confirm('Are you sure you want to delete this event?')) { deleteEvent(e) } }}>DELETE</button>
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
                                                            lat && lng ?
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
                                                eventInfo.img && eventInfo.img.includes('http') ?
                                                    <img className="event-information-image" src={eventInfo.img} alt="event-image" />
                                                    :
                                                    <img className="event-information-image" src={`http://localhost:4000${eventInfo.img}`} alt="event-image" />
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
                                        <button onClick={getOneEvent}>CLICK ME</button>
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
                                                        center={{ lat: lat, lng: lng }}
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
