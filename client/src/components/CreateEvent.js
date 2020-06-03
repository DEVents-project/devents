import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';


const CreateEvent = () => {
    // img missing and hour ? 
    const [name, setName] = useState(null);
    const [hostBy, setHostBy] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);

    const [statusAdded, setStatusAdded] = useState(null)

    const handleCreateEvent = (e) => {
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
        // double que the route - addevent?

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
                <h2>CREATE EVENT</h2>
                <label className="field-event">Title
                    <input
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
                        type="date"
                        value={date}
                        id="date"
                        placeholder="the event date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                    />

                </label>
                <label className="field-event">Location
                    <input
                        type="text"
                        value={address}
                        id="address"
                        placeholder="the event location"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />

                </label>
                <label className="field-event">City
                    <input
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
                        type="url"
                        value={link}
                        id="link"
                        placeholder="do you have a website to share"
                        required
                        onChange={(e) => setLink(e.target.value)}

                    />
                </label>
                <label className="field-event">Description
                    <textarea row="10" cols="50"
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
