import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Events.scss';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Events = () => {
    const history = useHistory();

    const { userData, fetchEvents, setEventInfo, events, meetups, workshops, conventions, citiesWithEvent } = useContext(Context);
    // console.log('CITIES WITH EVENTS: ', citiesWithEvent);

    // number of events that will show after clicking on 'SEE MORE':
    const [isVisible, setIsVisible] = useState(9);
    const [isEventClicked, setIsEventClicked] = useState(false);
    const [eventType, setEventType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const loadMore = () => {
        setIsVisible(isVisible + 9);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [userData]);

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    useEffect(() => {
        setSelectedCity(citiesWithEvent[0]);
    }, [citiesWithEvent]);

    // console.log('SELECTED CITY: ', selectedCity);
    // console.log('WORKSHOPS: ', workshops);

    return (
        <div className="events-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-types">
                <h2 className="underline" style={{ color: eventType === 'meetups' ? '#256eac' : null }} onClick={() => setEventType('meetups')}>Meetups</h2>
                <h2 className="underline" style={{ color: eventType === 'workshops' ? '#256eac' : null }} onClick={() => setEventType('workshops')}>Workshops</h2>
                <h2 className="underline" style={{ color: eventType === 'conventions' ? '#256eac' : null }} onClick={() => setEventType('conventions')}>Conventions</h2>

                {
                    events ?
                        <select className="checkout" onChange={(e) => setSelectedCity(e.target.value)}>
                            <option value="" disabled>Select city</option>
                            {
                                citiesWithEvent &&
                                citiesWithEvent.map((city, i) => <option key={i} value={city}>{city}</option>)
                            }
                        </select>
                        :
                        null
                }
            </div>
            <div className="pool-event">
                {
                    events ?
                        <Fragment>
                            {
                                eventType === '' ?
                                    events.filter(event => event.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} _id={el._id} authorId={el.authorId} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} url={el.url} />)
                                    : events && eventType === 'meetups' ?
                                        meetups.filter(meetup => meetup.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} _id={el._id} authorId={el.authorId} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} url={el.url} />)
                                        : events && eventType === 'workshops' ?
                                            workshops.filter(workshop => workshop.city === selectedCity).filter(workshop => workshop.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} _id={el._id} authorId={el.authorId} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} url={el.url} />)
                                            : events && eventType === 'conventions' ?
                                                conventions.filter(convention => convention.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} _id={el._id} authorId={el.authorId} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} url={el.url} />)
                                                : null
                            }
                        </Fragment>
                        :
                        <div className="loading-message">
                            <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(37, 110, 172)" }} /> Searching for events...</p>
                        </div>
                }
            </div>
            {
                events ?
                    <Fragment>
                        {
                            events && eventType === '' && isVisible >= events.filter(event => event.city === selectedCity).length ?
                                null :
                                eventType === 'meetups' && isVisible >= meetups.filter(meetup => meetup.city === selectedCity).length ?
                                    null :
                                    eventType === 'workshops' && isVisible >= workshops.filter(workshop => workshop.city === selectedCity).length ?
                                        null :
                                        eventType === 'conventions' && isVisible >= conventions.filter(convention => convention.city === selectedCity).length ?
                                            null :
                                            <button className="button load-more" onClick={loadMore}>Load more</button>
                        }
                    </Fragment>
                    :
                    null
            }
        </div>
    );
}

export default Events;
