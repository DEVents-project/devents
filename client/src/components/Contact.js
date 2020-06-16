import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

import '../style/Contact.scss';
import ParticlesBg from 'particles-bg';


const Contact = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMessage, setUserMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        const data = { userName, userEmail, userMessage };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/send-email', options)
            .then(res => res.json())
            .then(res1 => {
                console.log(res1.status);
                res1.status === true ? alert('Email sent!') : alert('Sorry, there was an issue by sending your message. Please try again later.')
            })
    }

    return (
        <div className="contact-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            <form className="contact-form puff-in-center" onSubmit={sendEmail}>
                <h2 className="h2-contact">CONTACT US</h2>
                
                <label className="contact-label">Name *
                            <input
                                className="contact-input"
                                type="text"
                                value={userName}
                                placeholder="your name"
                                required
                                onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label className="contact-label">Email *
                            <input
                                className="contact-input"
                                type="email"
                                value={userEmail}
                                placeholder="your email"
                                required
                                onChange={(e) => setUserEmail(e.target.value)} />
                </label>
                <label className="contact-label">Message *
                            <textarea rows="8" cols="50"
                                className="contact-textarea"
                                type="text"
                                value={userMessage}
                                placeholder="your message"
                                required
                                onChange={(e) => setUserMessage(e.target.value)} />
                </label>
                <h5 className="h5-contact"> * Required fields </h5>
                <button
                    type="submit"
                    className="button sign-btn">SEND MESSAGE</button>
            </form>
        </div>
    )
}
export default Contact;
