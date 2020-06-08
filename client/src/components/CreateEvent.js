import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';

import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const CreateEvent = (props) => {

    const history = useHistory();

    // The followings are NOT base on the schema - Schema needs to be modified! 
    const [title, setTitle] = useState('');
    const [hostBy, setHostBy] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    // this will be the complete address of the event as a STRING
    const [location, setLocation] = useState('');
    // this will be the location of the event as coordinates in an object: {lat: lat, lng: lng}
    const [coordinates, setCoordinates] = useState('');

    const [statusAdded, setStatusAdded] = useState(false)

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        // IMPORTANT: location is going to be an object: {lat: Number, lng: Number}
        const eventInfo = {
            title,
            hostBy,
            date,
            time,
            coordinates,
            location,
            link,
            description
        }

        const eventData = {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventInfo)
        }

        const resp = await fetch('http://localhost:4000/addevent', eventData);
        const data = await resp.json();
        console.log("res:", data);

        if (data.success) {
            setStatusAdded(true)
        }
    }

    // console.log('The current location is: ', location);
    console.log('Coordinates: ', coordinates);
    console.log('Location: ', location);

    useEffect(() => {
        statusAdded && history.push('/events');
    })

    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />

            <form className="event-form space-navbar" onSubmit={handleCreateEvent}>

                <h2 className="h2-event">CREATE EVENT</h2>
                <label className="event-label">Title *
                    <input
                        className="event-input"
                        type="text"
                        value={title}
                        placeholder="the event title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className="event-label">Host by
                    <input
                        className="event-input"
                        type="text"
                        value={hostBy}
                        placeholder="the host name"
                        onChange={(e) => setHostBy(e.target.value)}
                    />
                </label>
                <div className="event-label inline">
                    <label className="inline-label">Date *
                        <input
                            className="event-input"
                            type="date"
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label className="space-top inline-label">Time *
                        <input
                            className="event-input"
                            type="time"
                            value={time}
                            required
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                </div>
                <label className="event-label">Location *
                    <GoogleMapsAutocomplete setLocation={setLocation} setCoordinates={setCoordinates} />
                </label>
                <label className="event-label">Website
                    <input
                        className="event-input"
                        type="url"
                        value={link}
                        placeholder="the event website"
                        onChange={(e) => setLink(e.target.value)}
                    />
                </label>
                <label className="event-label">Description *
                    <textarea cols="40" rows="20"
                        className="event-textarea"
                        placeholder="the event details"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <h5 className="h5-event">* Required Fields</h5>
                <button className="button event-btn" type="submit">PUBLISH EVENT</button>

            </form>

        </div>
    )
}


export default CreateEvent;
