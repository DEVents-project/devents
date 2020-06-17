import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const EventInformation = (props) => {
    const history = useHistory();

    const { getUserData, fetchEvents, meetups, setMeetups, eventInfo, setEventInfo, userData, setUserData, token } = useContext(Context);

    // By clicking on EDIT:
    const [editMode, setEditMode] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newCoordinates, setNewCoordinates] = useState('');

    // getting the coordinates to pass them to the google maps:
    const lat = eventInfo.coordinates && parseFloat(eventInfo.coordinates.split(',')[0].slice(7, 14));
    const lng = eventInfo.coordinates && parseFloat(eventInfo.coordinates.split(',')[1].slice(6, 13));
    // console.log('lat: ', lat);
    // console.log('lng: ', lng);

    // console.log('EVEnt INFO NOW: ', eventInfo);

    const [isEventDeleted, setIsEventDeleted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchEvents();
    }, [])

    useEffect(() => {
        isEventDeleted && history.push('/account');
    });

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

    useEffect(() => {
        getUserData();
    }, []);

    // console.log('USER INFORMATION_userData: ', userData);
    // console.log('EVENT INFORMATION_eventInfo: ', eventInfo);
    // console.log('meetups: ', meetups);

    return (

        <div className="space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-information-container">
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
                                        <button type="submit" className="button link-to-site save-button">SAVE</button>
                                    </form>

                                    :

                                    <Fragment>
                                        <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                                        <p className="event-information-time">Time: <strong>{eventInfo.time} H</strong></p>
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
                                    </Fragment>
                            }

                        </Fragment>

                        :

                        <Fragment>
                            <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                            <p className="event-information-time">Time <strong>{eventInfo.time} H</strong></p>
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
                        </Fragment>
                }
            </div>
        </div>
    );
}

export default EventInformation;
