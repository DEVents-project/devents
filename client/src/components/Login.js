import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

import '../style/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import ParticlesBg from 'particles-bg';
import DevCoding from '../assets/img/dev-coding2.png';



const Login = () => {
    const history = useHistory();
    const { userData, setUserData, storage, setLocalStorage } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    // set a status for what happens after login 
    const [isLogged, setIsLogged] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()

        const loginData = {
            email,
            password
        };

        const logged = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        };
        const resp = await fetch('http://localhost:4000/users/login', logged)
        const data = await resp.json()
        console.log(data.user);

        const header = resp.headers.get('x-auth');

        if (data.success) {
            storage.setItem('token', header);
            setLocalStorage(header);
            setUserData(data.user)
            setIsLogged(true)
        } else {
            setErrorMsg(true)
        }
    }

    useEffect(() => {
        isLogged && history.push('/events')
    });


    return (
        <main className="login-container space-navbar">
            {/* <img src={DevCoding} alt="Developer coding" className="devCoding" /> */}

            <ParticlesBg color="#8d8d8d" num={55} type="cobweb" bg={true} />
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="h2">LOG IN</h2>
                <label className="login-field">
                    <FontAwesomeIcon className="log-icons" icon={faEnvelope} />
                    <input className="login-input"
                        type="email"
                        placeholder="your email"
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
                        placeholder="your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                {errorMsg ? <p>Email or password incorrect</p> : null}
                <button className="button login-btn" type="submit">LOG IN</button>
            </form>
        </main>
    )
}

export default Login; 
