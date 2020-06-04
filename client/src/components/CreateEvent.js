import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';
import { UploadFile } from './UploadFile';

const CreateEvent = (props) => {
    // The followings are NOT base on the schema - Schema needs to be modified! 
    const [title, setTitle] = useState(null);
    const [hostBy, setHostBy] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [location, setLocation] = useState(null);
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


    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />
            {statusAdded ? <Redirect to="/events" /> : null}

            <form className="event-form space-navbar" onSubmit={handleCreateEvent}>

                <h2 className="h2-event">CREATE EVENT</h2>
                <h5 className="h5-event">* Required Fields</h5>
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
                <label className="field-event">Date *
                    <input
                        className="event-input"
                        type="date"
                        value={date}
                        placeholder="the event date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label className="field-event">Time *
                    <input
                        className="event-input"
                        type="time"
                        value={time}
                        placeholder="the event time"
                        required
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>
                <label className="field-event location-container"><span>Location *</span>
                    <Map google={props.google}
                        center={{ lat: 52.5200, lng: 13.4050 }}
                        height='300px'
                        zoom={15}
                    />
                </label>
                <label className="field-event">Image *
                    {/* <UploadFile /> */}
                </label>
                <label className="field-event">Website
                    <input
                        className="the event-input"
                        type="url"
                        value={link}
                        placeholder="event website"
                        onChange={(e) => setLink(e.target.value)}
                    />
                </label>
                <label className="field-event">Description
                    <textarea row="20" cols="40"
                        className="event-input event-textarea"
                        placeholder="the event details"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button className="button event-btn" type="submit">PUBLISH EVENT</button>

            </form>

        </div>
    )
}


export default CreateEvent;
