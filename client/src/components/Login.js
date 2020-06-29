import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

import '../style/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import ParticlesBg from 'particles-bg';




const Login = () => {
    const history = useHistory();
    const { userData, setUserData, setToken, setLoggedIn, loggedIn } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    // set a status for what happens after login 
    const [errorMsg, setErrorMsg] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault()

        const loginData = {
            email,
            password
        };

        const logged = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(loginData)
        };
        const resp = await fetch('/users/login', logged)
        const data = await resp.json()
        console.log(data.user);

        const header = resp.headers.get('x-auth');

        if (data.success) {
            localStorage.setItem('token', header);
            setToken(header);
            setUserData(data.user)
            setLoggedIn(true)
        } else {
            setErrorMsg(true)
        }
    }



    useEffect(() => {
        loggedIn && history.push('/events')
    });


    return (
        <main className="login-container space-navbar">

            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />
            <form className="login-form puff-in-center" onSubmit={handleLogin}>
                <h2 className="h2">LOG IN</h2>
                <label className="login-field">
                    <FontAwesomeIcon className="log-icons" icon={faEnvelope} />
                    <input className="login-input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </label>
                <label className="login-field">
                    <FontAwesomeIcon className="log-icons" icon={faLock} />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                {errorMsg ? <p>Email or password incorrect</p> : null}
                <button className="button login-btn" type="submit">LOG IN</button>
            </form>

<<<<<<< HEAD
            {/* <p className="github-log">Login with your<FontAwesomeIcon className="github-icon" icon={faGithubAlt} />GitHub account?
                <a className="github-link" href="/auth/github">Click here</a></p> */}
=======
            <p className="github-log">Login with your<FontAwesomeIcon className="github-icon" icon={faGithubAlt} />GitHub account?
                <button className="github-button"><a className="github-link" href="/auth/github" >CLICK HERE</a></button></p>
>>>>>>> Git
        </main>
    )
}

export default Login; 
