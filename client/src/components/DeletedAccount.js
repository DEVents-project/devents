import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/Logout.scss';
import ParticlesBg from 'particles-bg';

const DeletedAccount = () => {
    const history = useHistory();
    const { userData, setUserData } = useContext(Context);

    const [isLoggedOut, setIsLoggedOut] = useState(false)

    useEffect(() => {
        setIsLoggedOut(true);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            isLoggedOut && history.push('/');
            setTimeout(() => {
                setUserData('');
            }, 500);
        }, 3000);
    });

    return (
        <div className="logout-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />

            <p className="slide-from-top">Your account was successfully deleted.</p>
            <p className="slide-from-bottom">Thank you and hopefully see you soon, <span style={{ color: '#256eac' }}>{userData.name}</span></p>
        </div>
    );
}

export default DeletedAccount;
