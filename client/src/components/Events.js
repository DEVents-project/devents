import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Events.scss';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Events = () => {
    const history = useHistory();

    const { setEventInfo, events, meetups, workshops, conventions, citiesWithEvent } = useContext(Context);
    console.log('CITIES WITH EVENTS: ', citiesWithEvent);

    // number of events that will show after clicking on 'SEE MORE':
    const [isVisible, setIsVisible] = useState(9);
    const [isEventClicked, setIsEventClicked] = useState(false);
    const [eventType, setEventType] = useState('');
    const [selectedCity, setSelectedCity] = useState(citiesWithEvent[0]);

    const loadMore = () => {
        setIsVisible(isVisible + 9);
    };

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    console.log('SELECTED CITY: ', selectedCity);

    return (
        <div className="events-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-types">
                <h2 className="underline" style={{ color: eventType === 'meetups' ? '#841F1A' : null }} onClick={() => setEventType('meetups')}>Meetups</h2>
                <h2 className="underline" style={{ color: eventType === 'workshops' ? '#841F1A' : null }} onClick={() => setEventType('workshops')}>Workshops</h2>
                <h2 className="underline" style={{ color: eventType === 'conventions' ? '#841F1A' : null }} onClick={() => setEventType('conventions')}>Conventions</h2>
                <select className="checkout" onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="" disabled>Select city</option>
                    {
                        citiesWithEvent &&
                        citiesWithEvent.map(city => <option value={city}>{city}</option>)
                    }
                </select>
            </div>
            <div className="pool-event">
                {
                    events && eventType === '' ?
                        events.filter(event => event.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                        : events && eventType === 'meetups' ?
                            meetups.filter(meetup => meetup.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                            : events && eventType === 'workshops' ?
                                workshops.filter(workshop => workshop.city === selectedCity).filter(workshop => workshop.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                                : events && eventType === 'conventions' ?
                                    conventions.filter(convention => convention.city === selectedCity).slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                                    : null
                }
            </div>
            {
                eventType === '' && isVisible >= events.length ?
                    null :
                    eventType === 'meetups' && isVisible >= meetups.length ?
                        null :
                        eventType === 'workshops' && isVisible >= workshops.length ?
                            null :
                            eventType === 'conventions' && isVisible >= conventions.length ?
                                null :
                                <button className="button load-more" onClick={loadMore}>Load more</button>
            }
        </div>
    );
}

export default Events;
