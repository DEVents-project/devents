import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import '../style/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLock } from '@fortawesome/free-solid-svg-icons';


const Login = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // set a status for what happens after login 
    const [statusLogin, setStatusLogin] = useState(false)

    function handleLogin(e) {
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
        const resp = await fetch('http://localhost:3000', logged)
        const data = await resp.json()

        console.log(data);

        if (data.success) {
            setStatusLogin(true)
        }
    }


    return (
        <main className="main-container">
            <div className="container">
                {statusLogin ? <Redirect to='/events' /> : null}
                {/* What I'm missing ere is to show a message in case user put wrong email or password */}

                <form className="login-form" onSubmit={handleLogin}>
                    <h2>LOG IN</h2>
                    <label>
                        <FontAwesomeIcon className="icon" icon={faPaperPlane} size={"2x"} />
                        <input
                            type="email"
                            placeholder="your email"
                            name="email"
                            id="login-email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <label>
                        <FontAwesomeIcon className="icon" icon={faLock} size={"2x"} />
                        <input
                            type="password"
                            placeholder="your password"
                            name="password"
                            id="login-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </label>
                    <button className="login-btn" type="submit">LOG IN</button>
                </form>
            </div>

        </main>
    )
}

export default Login; 
