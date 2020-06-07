import React, { useState, useEffect, useContext } from 'react';
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

            const response = await fetch('http://localhost:4000/workshops', options);
            const data = await response.json();
            console.log('ALL EVENTS - Response: ', data);
            setEvents(data.events);
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
                    <h2>Meetups</h2>
                    <h2>Workshops</h2>
                    <h2>Conventions</h2>
                    <Select options={options} placeholder='Select city' className="checkout" />
                </div>
                <div className="pool-event">
                    {
                        events &&
                        events.slice(0, isVisible).map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} address={el.city} description={el.description} />)
                    }
                </div>
                {
                    events &&
                        isVisible >= events.length ?
                        null :
                        <button className="button load-more" onClick={loadMore}>Load more</button>
                }
            </BrowserRouter>
        </div>
    );
}

export default Events;
