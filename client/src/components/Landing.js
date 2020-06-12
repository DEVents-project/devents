import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { useHistory } from 'react-router-dom';
import '../style/Landing.scss';
import Developers from '../assets/img/collaboration2.svg';
import ParticlesBg from 'particles-bg';
import Typical from 'react-typical';
import CarouselLanding from './CarouselLanding';


const Landing = () => {
    const history = useHistory();

    const { loggedIn } = useContext(Context);

    const [toFindEvent, setToFindEvent] = useState(false);
    const [toAddEvent, setToAddEvent] = useState(false);

    // by clicking on 'FIND EVENT' it will be redirected to the event's info
    useEffect(() => {
        toFindEvent && history.push('/events');

        toAddEvent && loggedIn && history.push('/addevent');
        toAddEvent && !loggedIn && history.push('/registration');
    });

    return (
        <div className="landing space-navbar">
            <main className="landing-main">
                <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
                <h1 className="slide-from-left"><span className="underscore">Never miss</span> <br /><span className="keyword"><strong>events for developers</strong></span><br /> <span className="underscore again">again</span></h1>
                <div className="container-description">
                    <Typical
                        steps={['Search for conferences', 1500, 'Assist to workshops', 1500, 'Create your own meetups', 1500, 'Push up your social skills', 1500]}
                        loop={Infinity}
                        wrapper="h4"
                    />
                </div>
                <div className="call-buttons">
                    <button className="button action-button scale-in-center" onClick={() => setToFindEvent(true)}>FIND EVENT</button>
                    <button className="button action-button scale-in-center" onClick={() => setToAddEvent(true)}>ADD EVENT</button>
                </div>
                <img src={Developers} alt="Developers" className="developers" />
            </main>
            <section className="carousel">
                <CarouselLanding />
            </section>
        </div>
    );
}

export default Landing;
