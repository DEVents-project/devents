import React from 'react';
import '../style/Landing.scss';

const Landing = () => {
    return (
        <div className="landing">
            <main className="main">
                <h2><span className="underscore">Never miss</span> <br /><span className="keyword">events for developers</span><br /> <span className="underscore">again</span>!</h2>
                <div className="container-description">
                    <h4>Search for conferences
                    <br />create your own study group
                    <br />join meetups!</h4>
                    {/* <h4>Push up your knowledge and social skills!</h4> */}
                </div>
                <div className="call-buttons">
                    <button className="action-button">Find event</button>
                    <button className="action-button">Add event</button>
                </div>
            </main>
            <section className="carousel">
                <p>here comes the carousel</p>
            </section>
        </div>
    );
}

export default Landing;
