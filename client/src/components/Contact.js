import React, { useState, useEffect } from 'react';
import '../style/Contact.scss';
import ParticlesBg from 'particles-bg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCommentDots, faSpinner, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [form, setForm] = useState(1);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();
        setForm(2);
        const data = { userName, userEmail, userMessage };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('/send-email', options)
            .then(res => res.json())
            .then(res1 => {
                console.log(res1.status);
                res1.status === true ? setForm(3) : alert('Sorry, there was an issue by sending your message. Please try again later.');
            });
    };

    return (
        <div className="contact-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            {
                form === 1 ?
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
                    : form === 2 ?
                        <div className="loading-message">
                            <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(37, 110, 172)" }} /> Sending message...</p>
                        </div>
                        :
                        <div className="thanks">
                            <p>Thank you for your message! <FontAwesomeIcon icon={faCheckDouble} style={{ color: "rgb(0, 186, 211)" }} /></p>
                        </div>
            }
        </div>
    )
}
export default Contact;
