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
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    // this will be the location of the event as coordinates in an object: {lat: lat, lng: lng}
    const [location, setLocation] = useState('');
    // this will be the complete address of the event as a STRING
    const [address, setAddress] = useState('');

    const [statusAdded, setStatusAdded] = useState(false)

    const handleCreateEvent = async (e) => {
        e.preventDefault()

        // IMPORTANT: location is going to be an object: {lat: Number, lng: Number}
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

    // useEffect(() => {
    //     const script = document.createElement('script');

    //     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
    //     script.async = true;

    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    // console.log('The current location is: ', location);

    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />
            {statusAdded ? <Redirect to="/events" /> : null}

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
<<<<<<< HEAD
                {/* <label className="event-label">Location *
                    <GoogleMapsAutocomplete setLocation={setLocation} location={location} />
                </label> */}
=======
                <label className="event-label">Location *
                    <GoogleMapsAutocomplete setLocation={setLocation} setAddress={setAddress} />
                </label>
>>>>>>> d41396af322a2c12d99c5a550c26dec6a7b00464
                <label className="event-label">Image *
                    {/* <UploadFile /> */}
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
