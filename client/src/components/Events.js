import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Events.scss';
import Select from 'react-select';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Events = () => {
    const history = useHistory();

    const { setEventInfo, events, meetups, workshops, conventions } = useContext(Context);

    const options = [
        { value: 'berlin', label: 'Berlin' },
        { value: 'hamburg', label: 'Hamburg' },
        { value: 'munich', label: 'Munich' },
        { value: 'frankfurt', label: 'Frankfurt' }
    ];

    // number of events that will show after clicking on 'SEE MORE':
    const [isVisible, setIsVisible] = useState(9);
    const [isEventClicked, setIsEventClicked] = useState(false);
    const [eventType, setEventType] = useState('');

    const loadMore = () => {
        setIsVisible(isVisible + 9);
    };

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    return (
        <div className="events-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="event-types">
                <h2 onClick={() => setEventType('meetups')}>Meetups</h2>
                <h2 onClick={() => setEventType('workshops')}>Workshops</h2>
                <h2 onClick={() => setEventType('conventions')}>Conventions</h2>
                <Select options={options} placeholder='Select city' className="checkout" />
            </div>
            <div className="pool-event">
                {
                    events && eventType === '' ?
                        events.slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                        : null
                }
                {
                    events && eventType === 'meetups' ?
                        meetups.slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                        : null
                }
                {
                    events && eventType === 'workshops' ?
                        workshops.slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
                        : null
                }
                {
                    events && eventType === 'conventions' ?
                        conventions.slice(0, isVisible).map((el, i) => <EventCard key={i} setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.city} description={el.description} />)
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
