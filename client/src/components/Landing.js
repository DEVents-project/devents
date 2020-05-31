import React from 'react';
import '../style/Landing.scss';
import Developers from '../assets/img/devs-sitting-2.png';
import ParticlesBg from 'particles-bg';

const Landing = () => {
    return (
        <div className="landing">
            <main className="main">
                <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
                <h2><span className="underscore">Never miss</span> <br /><span className="keyword"><strong>events for developers</strong></span><br /> <span className="underscore again">again</span></h2>
                <div className="container-description">
                    <h4>Search for conferences</h4>
                    <h4>Assist to workshops</h4>
                    <h4>Create your own meetups</h4>
                </div>
                <div className="call-buttons">
                    <button className="button action-button">FIND EVENT</button>
                    <button className="button action-button">ADD EVENT</button>
                </div>
                <img src={Developers} alt="Developers" className="developers" />
            </main>
            <section className="carousel">
                <p>here comes the carousel</p>
            </section>
        </div>
    );
}

export default Landing;
