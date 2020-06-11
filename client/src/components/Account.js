import React, { useState, useEffect, useContext, Fragment } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Account.scss';
import EventCard from './EventCard';
import ParticlesBg from 'particles-bg';

const Account = () => {
    const history = useHistory();

    const { userData, setUserData, setEventInfo, token } = useContext(Context);
    console.log('USERDATA:', userData);
    const [isEventClicked, setIsEventClicked] = useState(false);
    // this state change fragment between info and inputs to be edited
    const [editInfo, setEditInfo] = useState(false);
    // this will be the new info inserted by the user:
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAvatar, setNewAvatar] = useState('');

    const listOfAvatars = [
        'https://joeschmoe.io/api/v1/jeri',
        'https://joeschmoe.io/api/v1/jess',
        'https://joeschmoe.io/api/v1/jana',
        'https://joeschmoe.io/api/v1/james',
        'https://joeschmoe.io/api/v1/joe',
        'https://joeschmoe.io/api/v1/julie',
    ];

    // this is where the events created by the user will be fetched:
    useEffect(() => {
        const fetchUserInformation = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth': token
                }
            };

            const response = await fetch('http://localhost:4000/users', options);
            const data = await response.json();
            console.log('ACCOUNT - Response: ', data);
            setUserData(data.user);
        };

        fetchUserInformation();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // old data:
        const { name, email, password, avatar } = userData;
        // console.log('TOKEN HERE: ', token);

        const newInfo = {
            name: newName === '' ? name : newName,
            email: newEmail === '' ? email : newEmail,
            password: newPassword === '' ? password : newPassword,
            avatar: newAvatar === '' ? avatar : newAvatar
        };
        // console.log('NEW INFO: ', newInfo);

        const newUserData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
            body: JSON.stringify(newInfo)

        };

        const response = await fetch('http://localhost:4000/users', newUserData);
        const data = await response.json();
        // console.log("ACCOUNT response:", data);
        if (data.success) {
            setUserData(data.user);
            setEditInfo(false);
        };
    };

    // by clicking on 'SEE MORE' it will be redirected to the event's info
    useEffect(() => {
        isEventClicked && history.push('/event');
    });

    console.log('ACCOUNT MOUNTING');

    return (
        <div className="space-navbar account-container">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="personal-account">
                <h4>My information</h4>
                <div className="image-frame">
                    <img className="profile-image" src={userData && userData.avatar} alt="" />
                </div>

                {
                    editInfo ?
                        <Fragment>
                            <div className="personal-info">
                                <form onSubmit={handleSubmit} className="edit-form">
                                    <label htmlFor="name" className="edit-label">
                                        <input type="text" placeholder={userData && userData.name} onChange={(e) => setNewName(e.target.value)} />
                                    </label>
                                    <label htmlFor="email" className="edit-label">
                                        <input type="email" placeholder={userData && userData.email} onChange={(e) => setNewEmail(e.target.value)} />
                                    </label>
                                    <label htmlFor="password" className="edit-label">Change password?
                                        <input type="password" placeholder='new password' onChange={(e) => setNewPassword(e.target.value)} />
                                    </label>
                                    <p className="select-avatar">Select your Avatar</p>
                                    <div className="container-avatars">
                                        {
                                            listOfAvatars.map((avatar, i) => {
                                                return (
                                                    <div key={i} className="avatar-box">
                                                        <input type="radio" id={i} name='avatar' value={listOfAvatars[i]} onChange={(e) => setNewAvatar(e.target.value)} />
                                                        <label htmlFor={i}> <img src={avatar} alt={avatar.slice(28)} style={{ height: '112px' }} /></label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button type='submit' className="button save-button" >Save</button>
                                </form>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="personal-info">
                                <h4>{userData && userData.name}</h4>
                                <p>{userData && userData.email}</p>
                            </div>
                            <button className="button" onClick={() => setEditInfo(true)}>Edit information</button>
                        </Fragment>
                }

            </div>
            <div className="personal-events">
                <h4>My events</h4>
                <div className="events-container">
                    {
                        userData &&
                            userData.events &&
                            userData.events.length ?
                            userData.events.map(el => <EventCard setIsEventClicked={setIsEventClicked} setEventInfo={setEventInfo} title={el.title} img={el.imgUrl} date={el.date} location={el.location} coordinates={el.coordinates} description={el.description} />)
                            :
                            <p className="no-events">You didn't create any event yet</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;
