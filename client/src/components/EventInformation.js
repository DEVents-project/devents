import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/EventInformation.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMapMarkerAlt, faHeart as faFullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import Moment from 'moment';


const EventInformation = (props) => {
    const history = useHistory();

    const { lat, setLat, lng, setLng, unfilteredMeetups, setMeetups, eventInfo, setEventInfo, userData, setUserData, token } = useContext(Context);

    // By clicking on EDIT:
    const [editMode, setEditMode] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newCoordinates, setNewCoordinates] = useState('');
    const [newHostedBy, setNewHostedBy] = useState('');
    const [newWebsite, setNewWebsite] = useState('');

    const [likedEvent, setLikedEvent] = useState(false);

    const [isOnlineEvent, setIsOnlineEvent] = useState(false);
    console.log('IS ONLINE EVENT? ', isOnlineEvent);

    useEffect(() => {

        window.scrollTo(0, 0);

        const event = localStorage.getItem('event-info');
        if (event) {
            setEventInfo(JSON.parse(event));
        }
    }, []);

    useEffect(() => {
        if (userData && userData.favoriteMeetups.filter(meetup => meetup._id === eventInfo._id).length > 0 ||
            userData && userData.favoriteWorkshops.filter(workshop => workshop._id === eventInfo._id).length > 0 ||
            userData && userData.favoriteConventions.filter(convention => convention._id === eventInfo._id).length > 0) {
            setLikedEvent(true);
        }
    });

    const deleteEvent = async (e) => {
        e.preventDefault();

        const eventToDelete = unfilteredMeetups.filter(meetup => meetup._id === eventInfo._id)[0];
        // console.log('EVENT TO DELETE', eventToDelete);
        const deletedEvent = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(eventToDelete)
        };

        const request = await fetch('/events', deletedEvent);
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
            date: newDate === '' ? eventInfo.date : new Moment(newDate).format('DD MMMM YYYY'),
            time: newTime === '' ? eventInfo.time : newTime,
            title: newTitle === '' ? eventInfo.title : newTitle,
            description: newDescription === '' ? eventInfo.description : newDescription,
            location: isOnlineEvent ? 'Online event' : newLocation === '' && isOnlineEvent ? 'Online event' : newLocation === '' && !isOnlineEvent ? eventInfo.location : newLocation && isOnlineEvent ? newLocation : newLocation,
            coordinates: newCoordinates === '' ? eventInfo.coordinates : JSON.stringify(newCoordinates),
            _id: eventInfo._id,
            hostedBy: newHostedBy === '' ? eventInfo.hostedBy : newHostedBy,
            website: newWebsite === '' ? eventInfo.website : newWebsite,
            lat: JSON.stringify(newCoordinates) === '' ? lat : newCoordinates.lat,
            lng: JSON.stringify(newCoordinates) === '' ? lng : newCoordinates.lng
        };

        // console.log('NEW INFO: ', newInfo);
        console.log('NEW LOCATION: ', newLocation);

        const newEventInfo = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)
        };

        const request = await fetch('/events', newEventInfo);
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


    const handleFavorite = async () => {
        const eventId = eventInfo._id;

        const newFavoriteEvent = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            }
        };

        const request = await fetch(`/users/${eventId}`, newFavoriteEvent);
        const response = await request.json();
        console.log('Event added to favorites - Response: ', response);
        if (response.success) {
            setUserData(response.user)
            setLikedEvent(response.star);
        };
    };


    console.log('INFORMATION EVENT: ', eventInfo);
    // console.log('USER DATA: ', userData);
    // console.log('EVENT INFO AUTHOR-ID: ', eventInfo.authorId);
    // console.log('EVENT INFO AUTHOR-ID = USER DATA ID ? ', userData._id === eventInfo.authorId);


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
                                                    <label htmlFor="host" className="edit-label event-information-host">Hosted by
                                            <input type="text" placeholder={eventInfo && eventInfo.hostedBy} onChange={(e) => setNewHostedBy(e.target.value)} />
                                                    </label>
                                                    <label htmlFor="title" className="edit-label event-information-title">Title
                                            <input type="text" placeholder={eventInfo && eventInfo.title} onChange={(e) => setNewTitle(e.target.value)} />
                                                    </label>
                                                    <div className="event-information-box-one">
                                                        {
                                                            eventInfo.imgUrl &&
                                                            <img className="event-information-image" src={`${eventInfo.imgUrl}`} alt="event-image" />
                                                        }
                                                    </div>
                                                    <div className="event-information-box-two">
                                                        <label htmlFor="description" className="edit-label event-information-description">Description
                                                <textarea type="text" placeholder={eventInfo && eventInfo.description} onChange={(e) => setNewDescription(e.target.value)} />
                                                        </label>
                                                    </div>
                                                    <label htmlFor="website" className="edit-label event-information-website">Website
                                                <input type="url" placeholder={eventInfo && eventInfo.website} onChange={(e) => setNewWebsite(e.target.value)} />
                                                    </label>
                                                    <label for="online-event-checkbox" className="online-event-checkbox"><strong>Change it to online event?  </strong>
                                                        <input type="checkbox" id="online-event-checkbox" name="online-event-checkbox" value={'Online event'} onChange={() => setIsOnlineEvent(!isOnlineEvent)} />
                                                    </label>
                                                    <div className="google-map">
                                                        <label className="event-information-location">Location
                                                <GoogleMapsAutocomplete placeholder={''} setLocation={setNewLocation} setCoordinates={setNewCoordinates} setLat={setLat} setLng={setLng} />
                                                        </label>
                                                        {
                                                            eventInfo.lat && eventInfo.lng && eventInfo.location !== 'Online event' ?
                                                                <Map
                                                                    google={props.google}
                                                                    center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                                    height='350px'
                                                                    width='1000px'
                                                                    zoom={15}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <button type="submit" className="button link-to-site save-button">SAVE</button>
                                                </form>

                                                :

                                                <Fragment>
                                                    <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                                                    <p className="event-information-time">Time: <strong>{eventInfo.time}</strong></p>
                                                    {
                                                        eventInfo.hostedBy ?
                                                            <p className="event-information-host">Hosted by: <strong>{eventInfo.hostedBy}</strong></p>
                                                            :
                                                            null
                                                    }
                                                    <h2 className="event-information-title">{eventInfo.title}</h2>
                                                    <div className="event-information-box-one">
                                                        {
                                                            eventInfo.imgUrl &&
                                                            <img className="event-information-image" src={eventInfo.imgUrl ? `${eventInfo.imgUrl}` : `${eventInfo.imgUrlUrl}`} alt="event-image" />
                                                        }
                                                        {
                                                            eventInfo.website ?
                                                                <a href={eventInfo.website} target='_blank' className="button link-to-site link-to-website" >GO TO WEBSITE</a>
                                                                : null
                                                        }
                                                        <div className="editing-buttons">
                                                            <button className="button link-to-site" onClick={() => { setEditMode(true); localStorage.removeItem('event-info') }}>EDIT</button>
                                                            <button className="button link-to-site delete-button" onClick={(e) => { if (window.confirm('Are you sure you want to delete this event?')) { deleteEvent(e) } }}>DELETE</button>
                                                        </div>
                                                        <div className="share-buttons">
                                                            <FacebookShareButton
                                                                url={window.location.href}
                                                                quote="Check out this event!"
                                                                hashtag="#whoscomingwith">
                                                                <FacebookIcon className="fb-icon" size={40} />
                                                            </FacebookShareButton>
                                                            <TwitterShareButton
                                                                url={window.location.href}
                                                                quote="Check out this event!"
                                                                hashtag="#whoscomingwith">
                                                                <TwitterIcon className="fb-icon" size={40} />
                                                            </TwitterShareButton>
                                                        </div>
                                                    </div>
                                                    <div className="event-information-box-two">
                                                        <p className="event-information-description">{eventInfo.description}</p>
                                                        <p className="event-information-location">{eventInfo.address}</p>
                                                    </div>
                                                    <div className="google-map">
                                                        {
                                                            eventInfo.location && eventInfo.location.includes('nline') ?
                                                                <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faDesktop} /> Online event</p>
                                                                :
                                                                <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.location}</p>

                                                        }
                                                        {
                                                            eventInfo.lat && eventInfo.lng && eventInfo.location !== 'Online event' ?
                                                                <Map
                                                                    google={props.google}
                                                                    center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                                    height='350px'
                                                                    width='1000px'
                                                                    zoom={15}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </Fragment>
                                        }

                                    </Fragment>

                                    : userData && eventInfo && token && userData._id !== eventInfo.authorId ?

                                        <Fragment>
                                            {
                                                likedEvent ?
                                                    <div className="add-to-favorite">
                                                        <FontAwesomeIcon onClick={handleFavorite} className="full-star jello-horizontal" icon={faFullHeart} />
                                                    </div>
                                                    :
                                                    <div className="add-to-favorite">
                                                        <FontAwesomeIcon onClick={handleFavorite} className="star" icon={faHeart} />
                                                    </div>
                                            }
                                            <p className="event-information-date">Date: <strong>{eventInfo.date}</strong></p>
                                            <p className="event-information-time">Time: <strong>{eventInfo.time}</strong></p>
                                            {
                                                eventInfo.hostedBy ?
                                                    <p className="event-information-host">Hosted by: <strong>{eventInfo.hostedBy}</strong></p>
                                                    :
                                                    null
                                            }
                                            <h2 className="event-information-title">{eventInfo.title}</h2>
                                            <div className="event-information-box-one">
                                                {
                                                    eventInfo.imgUrl &&
                                                    <img className="event-information-image" src={eventInfo.imgUrl ? `${eventInfo.imgUrl}` : `${eventInfo.imgUrlUrl}`} alt="event-image" />
                                                }
                                                {
                                                    eventInfo.website ?
                                                        <a href={eventInfo.website} target='_blank' className="button link-to-site" >GO TO WEBSITE</a>
                                                        : eventInfo.url ?
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
                                                    eventInfo.location && eventInfo.location.includes('nline') ?
                                                        <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faDesktop} /> Online event</p>
                                                        :
                                                        <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.location ? eventInfo.location : eventInfo.city}</p>
                                                }
                                                {
                                                    eventInfo.lat && eventInfo.lng ?
                                                        <Map
                                                            google={props.google}
                                                            center={{ lat: eventInfo.lat, lng: eventInfo.lng }}
                                                            height='350px'
                                                            width='1000px'
                                                            zoom={15}
                                                        />
                                                        :
                                                        null
                                                }
                                            </div>
                                        </Fragment>

                                        :

                                        <Fragment>
                                            <p className="event-information-date">Date: <strong>{eventInfo.date.includes('valid') ? 'More information following the link' : eventInfo.date}</strong></p>
                                            <p className="event-information-time">Time: <strong>{eventInfo.time.includes('valid') ? 'More information following the link' : eventInfo.time}</strong></p>
                                            {
                                                eventInfo.hostedBy ?
                                                    <p className="event-information-host">Hosted by: <strong>{eventInfo.hostedBy}</strong></p>
                                                    :
                                                    null
                                            }
                                            <h2 className="event-information-title">{eventInfo.title}</h2>
                                            <div className="event-information-box-one">
                                                {
                                                    eventInfo.imgUrl &&
                                                    <img className="event-information-image" src={`${eventInfo.imgUrl}`} alt="event-image" />
                                                }
                                                {
                                                    eventInfo.website ?
                                                        <a href={eventInfo.website} target='_blank' className="button link-to-site" >GO TO WEBSITE</a>
                                                        : eventInfo.url ?
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
                                                    eventInfo.location && eventInfo.location.length > 1 ?
                                                        <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.location}</p>
                                                        : eventInfo.location && eventInfo.location.length < 1 ?
                                                            <p className="map-address"><FontAwesomeIcon style={{ fontSize: '1.2rem' }} icon={faMapMarkerAlt} /> {eventInfo.city}</p>
                                                            :
                                                            null
                                                }
                                                {
                                                    eventInfo.lat && eventInfo.lng && eventInfo.location !== 'Online event' ?
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
