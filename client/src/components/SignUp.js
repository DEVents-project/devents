import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../style/SignUp.scss';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    const history = useHistory();

    // Does not match the USER Schema --- schema needs to be update
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [typeOfUser, setTypeOfUser] = useState('developer');

    // set a status for what happens after sign up 
    const [isSignedUp, setIsSignedUp] = useState(false)


    const handleSignUp = async (e) => {
        e.preventDefault();

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
        const resp = await fetch('http://localhost:4000/signup', userData);
        const data = await resp.json();
        console.log("res:", data);
        if (data.success) {
            setIsSignedUp(true)
        }
    }

    useEffect(() => {
        isSignedUp && history.push('/account')
    })


    return (
        <div className="signup-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            <form className="signup-form" onSubmit={handleSignUp}>
                <h2 className="h2-signup">SIGN UP</h2>
                <label className="signup-field"> Are you:
                    <select id={name} className="signup-select" onChange={(e) => setTypeOfUser(e.currentTarget.value)} >
                        <option className="signup-opt" value="developer" selected>Developer</option>
                        <option className="signup-opt" value="organization">Organization</option>
                    </select>
                </label>
                <label className="signup-field">
                    {
                        typeOfUser === 'developer' ?
                            'Name *'
                            :
                            'Organization\'s name *'
                    }
                    {
                        typeOfUser === 'developer' ?
                            <input className="signup-input"
                                type="text"
                                placeholder="your name"
                                required
                                onChange={(e) => setName(e.target.value)} />
                            :
                            <input className="signup-input"
                                type="text"
                                placeholder="the organization's name"
                                required
                                onChange={(e) => setName(e.target.value)} />
                    }
                </label>

                <label className="signup-field">Email *
                    {
                        typeOfUser === 'developer' ?
                            <input
                                className="signup-input"
                                type="email"
                                value={email}
                                placeholder="your email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                            :
                            <input
                                className="signup-input"
                                type="email"
                                value={email}
                                placeholder="the organization email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                    }
                </label>
                {
                    typeOfUser === 'developer' ?
                        null
                        :

                        <label className="signup-field">Website
                        <input
                                className="signup-input"
                                type="url"
                                value={website}
                                placeholder="the url of the website "
                                onChange={(e) => setWebsite(e.target.value)} />
                        </label>
                }

                <label className="signup-field">Password *
                        <input
                        className="signup-input"
                        type="password"
                        value={password}
                        placeholder="your password"
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                </label>
                <h5 className="h5-signup"> * Required fields </h5>
                <button
                    type="submit"
                    className="button sign-btn">CREATE ACCOUNT</button>
            </form>
        </div>
    )
}
export default SignUp;
