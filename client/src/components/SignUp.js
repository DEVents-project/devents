import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../style/SignUp';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    // User schema needs a website url for the companies and city/country
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [companyName, setCompanyName] = useState(null);

    // set a status for what happens after sign up 
    const [statusSignUp, setStatusSignUp] = useState(false)

    const handleRefresh = (e) => {
        e.preventDefault();
        e.target.reset;
    }

    const handleSignUp = () => {


    }



    return (
        <div>
            <main className="main-container">
                {statusSignUp ? <Redirect to="/events" /> : null}
                <form className="sign-form" onSubmit={handleRefresh}>
                    <h2>SIGN UP</h2>
                    <label>First Name
                        <input
                            type="text"
                            value={firstName}
                            id="firstName"
                            placeholder="your first name"
                            required
                            onChange={e => setFirstName(e.target.value)} />
                    </label>
                    <label>Last Name
                        <input
                            type="text"
                            value={lastName}
                            id="lastName"
                            placeholder="your last name"
                            required
                            onChange={e => setLastName(e.target.value)} />
                    </label>
                    <label>Company Name
                        <input
                            type="text"
                            value={companyName}
                            id="companyName"
                            onChange={e => setCompanyName(e.target.value)} />
                    </label>
                    <label>Email
                        <input
                            type="email"
                            value={email}
                            id="email"
                            placeholder="your email"
                            required
                            onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>Password
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="your password"
                            required
                            onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button
                        type="submit"
                        className="btn-sign"
                        onClick={() => { handleSignUp() }}>SIGN UP</button>
                </form>

            </main>
        </div>

    )
}
