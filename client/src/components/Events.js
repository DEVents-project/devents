import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/Events.scss';
import Select from 'react-select';

const Events = () => {

    const options = [
        { value: 'berlin', label: 'Berlin' },
        { value: 'hamburg', label: 'Hamburg' },
        { value: 'cologne', label: 'Cologne' },
        { value: 'bremen', label: 'Bremen' },
        { value: 'frankfurt', label: 'Frankfurt' },
    ];


    // TO DO: with UseState -> fetch from the cities that have events and useState with the cities instead of options at the top

    return (
        <div className="events-container space-navbar">
            <BrowserRouter>
                <div className="event-types">
                    <h2>Meetups</h2>
                    <h2>Workshops</h2>
                    <h2>Conventions</h2>
                    <Select options={options} placeholder='Choose a city' className="checkout" />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Events;
