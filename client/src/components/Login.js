import React, { Fragment, useState } from 'react';
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
        <Fragment>
            <div className="container">
                <form className="login-form"
                    onSubmit={handleLogin}>
                    <h2>LOG IN</h2>
                    <label className="filed">
                        <input
                            type="email"
                            placeholder="your email"
                            name="email"
                            id="login-email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <label className="field">
                        <input
                            type="password"
                            placeholder="your password"
                            name="password"
                            id="login-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </label>
                    <button
                        className="login-btn" type="submit">LOG IN</button>
                </form>
            </div>

        </Fragment>
    )
}

export default Login; 
