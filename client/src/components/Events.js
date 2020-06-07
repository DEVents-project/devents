import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { BrowserRouter, useHistory } from 'react-router-dom';
import '../style/Events.scss';
import Select from 'react-select';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Events = () => {
    const history = useHistory();

    const { eventInfo, setEventInfo } = useContext(Context);

    const options = [
        { value: 'berlin', label: 'Berlin' },
        { value: 'hamburg', label: 'Hamburg' },
        { value: 'munich', label: 'Munich' },
        { value: 'frankfurt', label: 'Frankfurt' }
    ];

    // number of events that will show after clicking on 'SEE MORE':
    const [isVisible, setIsVisible] = useState(9);
    const [isEventClicked, setIsEventClicked] = useState(false);
    const [events, setEvents] = useState('');
    const [meetups, setMeetups] = useState('')
    const [workshops, setWorkshops] = useState('');
    const [conventions, setConventions] = useState('')
    const [eventType, setEventType] = useState('workshops');

    const loadMore = () => {
        setIsVisible(isVisible + 9);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const allEventsTogether = [];

            const response = await fetch('http://localhost:4000/events', options);
            const meetups = await response.json();
            meetups.events.map(meetup => allEventsTogether.push(meetup));
            setMeetups(meetups.events.filter(event => !event.url)
                .slice(0, isVisible).map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
            );
            console.log('MEETUPS - Response: ', meetups);

            const response2 = await fetch('http://localhost:4000/workshops', options);
            const workshops = await response2.json();
            workshops.events.map(workshop => allEventsTogether.push(workshop));
            setWorkshops(workshops.events.filter(event => event.url.includes('meetup'))
                .slice(0, isVisible).map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
            );
            console.log('WORKSHOPS - Response: ', workshops);

            const response3 = await fetch('http://localhost:4000/conventions', options);
            const conventions = await response3.json();
            conventions.events.map(convention => allEventsTogether.push(convention));
            setConventions(conventions.events.filter(event => event.url.includes('eventil'))
                .slice(0, isVisible).map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
            );
            console.log('CONVENTIONS - Response: ', conventions);

            setEvents(allEventsTogether);
            console.log('ALL EVENTS: ', allEventsTogether);
        };

        fetchEvents();
    }, []);

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    return (
        <div className="events-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <BrowserRouter>
                <div className="event-types">
                    <h2 onClick={() => setEventType('meetups')}>Meetups</h2>
                    <h2 onClick={() => setEventType('workshops')}>Workshops</h2>
                    <h2 onClick={() => setEventType('conventions')}>Conventions</h2>
                    <Select options={options} placeholder='Select city' className="checkout" />
                </div>
                <div className="pool-event">
                    {
                        events && eventType === '' ?
                            events.slice(0, isVisible).map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                            : eventType === 'workshops' ?
                                workshops
                                : eventType === 'conventions' ?
                                    conventions
                                    : meetups
                    }
                </div>
                {
                    events &&
                        isVisible >= events.length || isVisible >= meetups.length || workshops.length || conventions.length ?
                        null :
                        <button className="button load-more" onClick={loadMore}>Load more</button>
                }
            </BrowserRouter>
        </div>
    );
}

export default Events;
