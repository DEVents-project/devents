import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';
import Map from './Map';

const CreateEvent = (props) => {
    // img missing and hour ? 
    const [name, setName] = useState(null);
    const [hostBy, setHostBy] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);

    const [statusAdded, setStatusAdded] = useState(null)

    const handleCreateEvent = async (e) => {
        e.preventDefault()

        const eventInfo = {
            name,
            hostBy,
            date,
            city,
            address,
            description,
            link
        }

        const eventData = {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventInfo)

        }
        // double check the route - addevent?

        const resp = await fetch("http://localhost:3000/addevent", eventData);
        const data = await resp.json();
        console.log("res:", data);
        if (data.success) {
            setStatusAdded(true)
        }
    }


    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />

            <form className="event-form space-navbar" onSubmit={handleCreateEvent}>
                {statusAdded ? <Redirect to="/events" /> : null}
                <h2 className="h2">CREATE EVENT</h2>
                <label className="field-event">Title
                    <input
                        className="event-input"
                        type="text"
                        value={name}
                        id="name"
                        placeholder="the event title"
                        required
                        onChange={(e) => setName(e.target.value)}

                    />
                </label>
                <label className="field-event">Host by
                    <input
                        className="event-input"
                        type="text"
                        value={hostBy}
                        id="hostBy"
                        placeholder="the host name"
                        required
                        onChange={(e) => setHostBy(e.target.value)}
                    />

                </label>
                <label className="field-event">Date
                    <input
                        className="event-input"
                        type="date"
                        value={date}
                        id="date"
                        placeholder="the event date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                    />

                </label>
                <label className="field-event location-container"><span>Location</span>
                    <Map google={props.google}
                        center={{ lat: 52.5200, lng: 13.4050 }}
                        height='300px'
                        zoom={15}
                    />

                </label>
                <label className="field-event">City
                    <input
                        className="event-input"
                        type="text"
                        value={city}
                        id="city"
                        placeholder="in which city"
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />

                </label>
                <label className="field-event">Website
                    <input
                        className="event-input"
                        type="url"
                        value={link}
                        id="link"
                        placeholder="event website "
                        required
                        onChange={(e) => setLink(e.target.value)}

                    />
                </label>
                <label className="field-event">Description
                    <textarea row="20" cols="40"
                        className="event-input"
                        id="description"
                        placeholder="the event details"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button className="button btn-add-event" type="submit">PUBLISH EVENT</button>

            </form>

        </div>
    )
}


export default CreateEvent;
