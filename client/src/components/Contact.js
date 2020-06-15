import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

import '../style/Contact.scss';
import ParticlesBg from 'particles-bg';


const Contact = () => {
    const history = useHistory();
    // const { userData, setUserData, setToken, loggedIn, setLoggedIn } = useContext(Context);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleContact = async (e) => {
        e.preventDefault();

        const contactData = {
            name,
            email,
            message
        }

        fetch('http://localhost:4000/contact', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(contactData)
            }).then(
                (response) => (response.json())
                ).then((response)=>{
            if (response.status === 'success'){
                alert("Message Sent."); 
            this.resetForm()
            }else if(response.status === 'fail'){
                alert("Message failed to send.")
            }
        })
    };

    // useEffect(() => {
    //     loggedIn && history.push('/thanks')
    // })

    return (
        <div className="contact-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            <form className="contact-form puff-in-center" onSubmit={handleContact}>
                <h2 className="h2-contact">CONTACT US</h2>
                
                <label className="contact-label">Name *
                            <input
                                className="contact-input"
                                type="text"
                                value={name}
                                placeholder="your name"
                                required
                                onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="contact-label">Email *
                            <input
                                className="contact-input"
                                type="email"
                                value={email}
                                placeholder="your email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="contact-label">Message *
                            <textarea rows="8" cols="50"
                                className="contact-textarea"
                                type="text"
                                value={message}
                                placeholder="your message"
                                required
                                onChange={(e) => setMessage(e.target.value)} />
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
