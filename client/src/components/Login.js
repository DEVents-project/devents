import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLock } from '@fortawesome/free-solid-svg-icons';
import '../style/Login.scss';

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

        //     const logged = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(loginData)
        //     };
        //     const resp = await fetch('http://localhost:3000', logged)
        //     const data = await resp.json()

        //     console.log(data);

        //     if (data.success) {
        //         setStatusLogin(true)
        //     } else {
        //         setStatusLogin(false)
        //     }
    }


    return (
        <main>

            <div className="container">
                <div className="middle-layer"></div>
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
                    <input type="submit" value="LOG IN " className="login-btn" type="submit" />
                </form>

            </div>

        </main>
    )
}

export default Login; 
