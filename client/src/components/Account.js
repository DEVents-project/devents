import React from 'react';
import '../style/Account.scss';
import ProfileImage from '../assets/img/profile-random.jpg';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Account = () => {
    const events = ['one', 'two', 'three', 'four'];

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
                        events.map(el => <EventCard />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Account;
