import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../style/SignUp.scss';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    // User schema needs a website url for the companies and city/country
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [website, setWebsite] = useState(null);

    // set a status for what happens after sign up 
    const [statusSignUp, setStatusSignUp] = useState(false)


    const handleSignUp = async (e) => {
        e.preventDefault();

        // Check if this works with the optional fields ex. companyName, etc.
        const signUpData = {
            name,
            email,
            password,
            website
        }

        const userData = {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpData)

        }
        const resp = await fetch("http://localhost:3000/signup", userData);
        const data = await resp.json();
        console.log("res:", data);
        if (data.success) {
            setStatusSignUp(true)
        }
    }


    return (
        <div className="signup-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            {statusSignUp ? <Redirect to="/account" /> : null}
            <form className="signup-form" onSubmit={handleSignUp}>
                <h2 className="h2-signup">SIGN UP</h2>
                <h5 className="h5-signup"> * Required fields </h5>
                <label className="signup-field"> Are you:
                    <select id={name} className="signup-select">
                        <option className="signup-opt" value={name}>Developer</option>
                        <option className="signup-opt" value={name}>Organization</option>
                    </select>
                </label>
                <label className="signup-field">Name *
                    <input className="signup-input"
                        type="text"
                        placeholder="your name or the organization name"
                        required
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="signup-field">Email *
                        <input
                        className="signup-input"
                        type="email"
                        value={email}
                        placeholder="your email"
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="signup-field">Website
                        <input
                        className="signup-input"
                        type="url"
                        value={website}
                        placeholder="the url of the website "
                        onChange={(e) => setWebsite(e.target.value)} />
                </label>
                <label className="signup-field">Password *
                        <input
                        className="signup-input"
                        type="password"
                        value={password}
                        placeholder="your password"
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button
                    type="submit"
                    className="button sign-btn">CREATE ACCOUNT</button>
            </form>
        </div>
    )
}
export default SignUp;
