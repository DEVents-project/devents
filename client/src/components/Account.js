import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Account.scss';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Account = () => {
    const history = useHistory();

    const { userData, setUserData } = useContext(Context);
    const { eventInfo, setEventInfo } = useContext(Context);

    const [isEventClicked, setIsEventClicked] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

    // this is where the events created by the user will be fetched:

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

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    return (
        <div className="space-navbar account-container">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="personal-account">
                <h4>My information</h4>
                <div className="image-frame">
                    <img className="profile-image" src={userData.img} alt="" />
                </div>

                {
                    editInfo ?
                        <Fragment>
                            <div className="personal-info">
                                <form action="" className="edit-form">
                                    <label htmlFor="name" className="edit-label">
                                        <input type="text" placeholder={userData.name} />
                                    </label>
                                    <label htmlFor="email" className="edit-label">
                                        <input type="email" placeholder={userData.email} />
                                    </label>
                                    <label htmlFor="password" className="edit-label">
                                        <input type="password" placeholder='new password' />
                                    </label>
                                </form>
                            </div>
                            <button className="button save-button" onClick={() => setEditInfo(false)}>Save</button>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="personal-info">
                                <h4>{userData.name}</h4>
                                <p>{userData.email}</p>
                                <p>{userData.password}</p>
                            </div>
                            <button className="button" onClick={() => setEditInfo(true)}>Edit information</button>
                        </Fragment>
                }

            </div>
            <div className="personal-events">
                <h4>My events</h4>
                <div className="events-container">
                    {
                        userData.events.length ?
                            userData.events.map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.img} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} />)
                            :
                            <p className="no-events">You didn't create any event yet</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Account;
