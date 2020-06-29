import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Events.scss';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "react-scroll-to-top"

const Events = () => {
    const history = useHistory();

    const { meetups, meetupsCities, workshops, workshopsCities, conventions, conventionsCities } = useContext(Context);

    // number of events that will show after clicking on 'SEE MORE':
    const [isVisible, setIsVisible] = useState(9);
    const [isEventClicked, setIsEventClicked] = useState(false);
    const [eventType, setEventType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
        setEventType('meetups')
    }, [])

    const loadMore = () => {
        setIsVisible(isVisible + 9);
    };

    useEffect(() => {
        setSelectedCity('disabled')
    }, [eventType]);

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    // console.log('SELECTED CITY: ', selectedCity);
    // console.log('WORKSHOPS: ', workshops);

    return (
        <div className="events-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <ScrollToTop smooth top="700" />
            <div className="event-types">
                <h2 className="underline" style={{ color: eventType === 'meetups' ? '#256eac' : null }} onClick={() => setEventType('meetups')}>Meetups</h2>
                <h2 className="underline" style={{ color: eventType === 'workshops' ? '#256eac' : null }} onClick={() => setEventType('workshops')}>Workshops</h2>
                <h2 className="underline" style={{ color: eventType === 'conventions' ? '#256eac' : null }} onClick={() => setEventType('conventions')}>Conventions</h2>

                {
                    meetups && workshops && conventions ?
                        <select className="checkout" onChange={(e) => setSelectedCity(e.target.value)}>
                            <option value="disabled" selected={selectedCity === 'disabled' && true} disabled>Select city</option>
                            {
                                eventType === 'meetups' ?
                                    meetupsCities.map((city, i) => <option key={i} value={city}>{city}</option>)
                                    : eventType === 'workshops' ?
                                        workshopsCities.map((city, i) => <option key={i} value={city}>{city}</option>)
                                        :
                                        conventionsCities.map((city, i) => <option key={i} value={city}>{city}</option>)

                            }
                        </select>
                        :
                        null
                }
            </div>
            <div className="pool-event">
                {
                    meetups && workshops && conventions ?
                        <Fragment>
                            {
                                selectedCity !== 'disabled' ?
                                    <Fragment>
                                        {
                                            eventType === 'meetups' ?
                                                meetups.filter(meetup => meetup.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} el={el} setIsEventClicked={setIsEventClicked} />)
                                                : eventType === 'workshops' ?
                                                    workshops.filter(workshop => workshop.city === selectedCity).filter(workshop => workshop.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} el={el} setIsEventClicked={setIsEventClicked} />)
                                                    : eventType === 'conventions' ?
                                                        conventions.filter(convention => convention.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} el={el} setIsEventClicked={setIsEventClicked} />)
                                                        : null
                                        }
                                    </Fragment>
                                    :
                                    <div className="find-city" >
                                        <p className="slide-from-left">Please, select a city to find</p>
                                        <p className="find-event-type slide-from-right">{eventType}</p>
                                    </div>
                            }
                        </Fragment>
                        :
                        <div className="loading-message">
                            <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(37, 110, 172)" }} /> Loading...</p>
                        </div>
                }
            </div>
            {
                meetups && workshops && conventions ?
                    <Fragment>
                        {
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

        </div >
    );
}

export default Events;
