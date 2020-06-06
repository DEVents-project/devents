import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';
import { UploadFile } from './UploadFile';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const CreateEvent = (props) => {
    // The followings are NOT base on the schema - Schema needs to be modified! 
    const [title, setTitle] = useState(null);
    const [hostBy, setHostBy] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [location, setLocation] = useState('Pepe');
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);

    const [statusAdded, setStatusAdded] = useState(false)

    const handleCreateEvent = async (e) => {
        e.preventDefault()

        const eventInfo = {
            title,
            hostBy,
            date,
            time,
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

        const resp = await fetch("/addevent", eventData);
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


    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />
            {statusAdded ? <Redirect to="/events" /> : null}

            <form className="event-form space-navbar" onSubmit={handleCreateEvent}>

                <h2 className="h2-event">CREATE EVENT</h2>
                <label className="field-event">Title *
                    <input
                        className="event-input"
                        type="text"
                        value={title}
                        placeholder="the event title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className="field-event">Host by
                    <input
                        className="event-input"
                        type="text"
                        value={hostBy}
                        placeholder="the host name"
                        onChange={(e) => setHostBy(e.target.value)}
                    />
                </label>
                <div className="inline">
                    <label className="inline-label">Date *
                        <input
                            className="inline-input"
                            type="date"
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label className="inline-label space-left">Time *
                        <input
                            className="inline-input space-right"
                            type="time"
                            value={time}
                            required
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                </div>
                <label className="field-event location-container"><span>Location *</span>
                    <GoogleMapsAutocomplete setLocation={setLocation} location={location} />
                </label>
                <label className="field-event">Image *
                    {/* <UploadFile /> */}
                </label>
                <label className="field-event">Website
                    <input
                        className="event-input"
                        type="url"
                        value={link}
                        placeholder="the event website"
                        onChange={(e) => setLink(e.target.value)}
                    />
                </label>
                <label className="field-event">Description *
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
