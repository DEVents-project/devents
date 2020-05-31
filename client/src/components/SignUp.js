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
                    <label> First Name
                        <input type="text" />
                    </label>
                    <label> Last Name
                        <input type="text" />
                    </label>
                    <label> Company Name
                        <input type="text" />
                    </label>
                    <label>Email
                        <input type="email" />
                    </label>
                    <label>Password
                        <input type="password" />
                    </label>
                    <button type="submit">SIGN UP</button>
                </form>

            </main>
        </div>

    )
}
