import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../style/SignUp.scss';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    // User schema needs a website url for the companies and city/country
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [city, setCity] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [organizationName, setOrganizationName] = useState(null);
    const [website, setWebsite] = useState(null);

    // set a status for what happens after sign up 
    const [statusSignUp, setStatusSignUp] = useState(false)


    const handleSignUp = async (e) => {
        e.preventDefault();

        // Check if this works with the optional fields ex. companyName, etc.
        const signUpData = {
            firstName,
            lastName,
            city,
            email,
            password,
            organizationName,
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
        <div>
            <main className="main-container space-navbar">
                <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

                {statusSignUp ? <Redirect to="/account" /> : null}
                <form className="sign-form" onSubmit={handleSignUp}>
                    <h2 className="h2">SIGN UP</h2>
                    <label className="field">First Name
                        <input
                            type="text"
                            value={firstName}
                            id="firstName"
                            placeholder="your first name"
                            required
                            onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label className="field">Last Name
                        <input
                            type="text"
                            value={lastName}
                            id="lastName"
                            placeholder="your last name"
                            required
                            onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label className="field">Organization Name
                        <input
                            type="text"
                            value={organizationName}
                            id="organizationName"
                            placeholder="the organization name"
                            onChange={(e) => setOrganizationName(e.target.value)} />
                    </label>
                    <label className="field">City
                        <input
                            type="text"
                            value={city}
                            id="city"
                            placeholder="the city where you live"
                            onChange={(e) => setCity(e.target.value)} />
                    </label>
                    <label className="field">Email
                        <input
                            type="email"
                            value={email}
                            id="email"
                            placeholder="your email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="field">Website
                        <input
                            type="url"
                            value={website}
                            id="companyName"
                            placeholder="the url of the website "
                            onChange={(e) => setWebsite(e.target.value)} />
                    </label>
                    <label className="field">Password
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="your password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button
                        type="submit"
                        className="sign-btn">CREATE ACCOUNT</button>
                </form>
            </main>
        </div>
    )
}
export default SignUp;
