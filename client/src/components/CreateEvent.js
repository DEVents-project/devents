import React, { useState } from 'react';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';


const CreateEvent = () => {
    // time missing - Instead of day, month and year is possible to do Date? 
    const [name, setName] = useState(null);
    const [hostBy, setHostBy] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);

    const [statusCreated, setStatusCreated] = useState(null)

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
    }


    return (
        <div className="event-container">
            <form className="event-form">
                <h2>CREATE EVENT</h2>
                <label className="field-event">Title
                    <input type="text" />
                </label>
                <label className="field-event">Host by
                    <input type="text" />
                </label>
                <label className="field-event">Date
                    <input type="date" />
                </label>
                <label className="field-event">Address
                    <input type="text" />
                </label>
                <label className="field-event">City
                    <input type="text" />
                </label>
                <label className="field-event">Website
                    <input type="url" />
                </label>
                <label className="field-event">Description
                    <textarea row="10" cols="50" />
                </label>
                <button type="submit">PUBLISH EVENT</button>

            </form>

        </div>
    )
}


export default CreateEvent;
