import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { Redirect, useHistory } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';

import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const CreateEvent = (props) => {

    const history = useHistory();
    const { userData, setUserData } = useContext(Context);


    // The followings are NOT base on the schema - Schema needs to be modified! 
    const [title, setTitle] = useState('');
    const [hostedBy, setHostedBy] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    // this will be the complete address of the event as a STRING
    const [location, setLocation] = useState('');

    // this will be the location of the event as coordinates in an object: {lat: lat, lng: lng}
    const [coordinates, setCoordinates] = useState('');

    // route to events pages after event get published
    const [statusAdded, setStatusAdded] = useState(false)

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        // IMPORTANT: location is going to be an object: {lat: Number, lng: Number}
        const eventInfo = {
            title,
            hostedBy,
            date,
            time,
            coordinates,
            location,
            url,
            image,
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

    useEffect(() => {
        const script = document.createElement('script');

        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    // console.log('The current location is: ', location);

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
                        value={hostedBy}
                        placeholder="the host name"
                        onChange={(e) => setHostedBy(e.target.value)}
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
                <label className="event-label"> Image
                    <input
                        type="file"
                        className="event-input"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <label className="event-label">Website
                    <input
                        className="event-input"
                        type="url"
                        value={url}
                        placeholder="the event website"
                        onChange={(e) => setUrl(e.target.value)}
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
