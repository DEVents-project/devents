import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/CreateEvent.scss';
import ParticlesBg from 'particles-bg';
import axios from 'axios'
import Moment from 'moment'

import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const CreateEvent = (props) => {

    const history = useHistory();
    const { userData, setUserData, token, lat, lng, setLat, setLng } = useContext(Context);
    // console.log('CREATE ACCOUNT_userData: ', userData)

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

    // console.log('IMAGE: ', image);

    // this will be the location of the event as coordinates in an object: {lat: lat, lng: lng}
    const [coordinates, setCoordinates] = useState('');

    // route to events pages after event get published
    const [statusAdded, setStatusAdded] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        // console.log(image)

        const imgBody = new FormData();

        imgBody.append('file', image);
        imgBody.append('title', title);
        imgBody.append('hostedBy', hostedBy);
        imgBody.append('date', new Moment(date).format('DD MMMM YYYY'));
        imgBody.append('time', time);
        imgBody.append('coordinates', JSON.stringify(coordinates));
        imgBody.append('lat', lat);
        imgBody.append('lng', lng);
        imgBody.append('location', location);
        imgBody.append('website', url);

        imgBody.append('description', description);
        imgBody.append('_id', userData._id)

        try {
            // console.log('IMG BODY: ', imgBody);
            const res = await axios.post('http://localhost:4000/events', imgBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth': token
                }
            });

            if (res.status) {
                // console.log('SERVER RESPONSE:', res)
                setUserData(res.data.user)
                setStatusAdded(true)
            }

        } catch (err) {
            console.log(err)
        }

        // IMPORTANT: location is going to be an string. Examples:
        // {"lat":52.4846517,"lng":13.4241349}
        // {"lat":52.51160549999999,"lng":13.4702261}
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

    useEffect(() => {
        statusAdded && history.push('/account');
    })

    return (
        <div className="create-event-container">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />

            <form className="event-form space-navbar puff-in-center" onSubmit={handleCreateEvent}>

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
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
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
                    <GoogleMapsAutocomplete setLocation={setLocation} setCoordinates={setCoordinates} setLat={setLat} setLng={setLng} />
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
                <label className="event-label img-label"> Image
                    <input
                        type="file"
                        className="event-input img-file"
                        onChange={(e) => setImage(e.target.files[0])}
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
