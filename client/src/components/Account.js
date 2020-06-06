import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/Account.scss';
import ProfileImage from '../assets/img/profile-random.jpg';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Account = () => {
    const [isEventClicked, setIsEventClicked] = useState(false);

    // Hard-coded events example after being fetched
    const [events, setEvents] = useState(
        [
            {
                title: 'Example of title',
                img: 'example of image',
                date: '27.06.2020',
                location: ['lat: 51.5200', 'lng: 12.4050']
            },
            {
                title: 'Example of title 2',
                img: 'example of image 2',
                date: '02.07.2020',
                location: ['lat: 52.5200', 'lng: 13.4050']
            },
            {
                title: 'Example of title 3',
                img: 'example of image 3',
                date: '27.08.2020',
                location: ['lat: 53.5200', 'lng: 14.4050']
            }
        ]
    );

    // this is where the events created by the user will be fetched
    // useEffect(() => {
    //     const fetchUserInformation = async () => {
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         };

    //         const response = await fetch('http://localhost:4000/users', options);
    //         const data = await response.json();
    //         console.log('ACCOUNTs - Response: ', data);
    //         setEvents(data.events);
    //     };

    //     fetchUserInformation();
    // }, []);

    if (isEventClicked) {
        return <Redirect to='/event' />
    }

    return (
        <div className="space-navbar account-container">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="personal-account">
                <h4>My information</h4>
                <div className="image-frame">
                    <img className="profile-image" src={ProfileImage} alt="" />
                </div>
                <div className="personal-info">
                    <h4>Peter Mustermann</h4>
                    <p>Muster GmbH</p>
                    <p>mustermann@peter.com</p>
                    <p>Muster Str. 123, 12345 Berlin</p>
                </div>
                <button className="button">Edit information</button>
            </div>
            <div className="personal-events">
                <h4>My events</h4>
                <div className="events-container">
                    {
                        events.length ?
                            events.map(el => <EventCard setIsEventClicked={setIsEventClicked} title={el.title} img={el.img} date={el.date} location={el.location} />)
                            :
                            <p className="no-events">You didn't create any event yet</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Account;
