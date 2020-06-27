import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import '../style/Logout.scss';
import ParticlesBg from 'particles-bg';

const Logout = () => {
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
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            <p className="slide-from-top">You are successfully logged out.</p>
            <p className="slide-from-bottom">See you soon, <span style={{ color: '#256eac' }}>{userData.name}</span></p>
        </div>
    );
}

export default Logout;
