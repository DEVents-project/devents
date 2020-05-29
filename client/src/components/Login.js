import React, { useState } from 'react';
import '../style/Login.scss';

function Login() {
    const [email, setEmail] = setEmail(null);
    const [password, setPassword] = setPassword(null);
    const [login, setLogin] = setLogin(false)

    function preventRefresh(e) {
        e.preventDefault()
    }

    function handleSubmit() {

    }

    return (
        <div>
            <form onSubmit={preventRefresh}>
                <h2>LOG IN</h2>
                <label> Email
                    <input type="email" value="email" placeholder="email" required />
                </label>
                <label> Password
                    <input type="password" value="value" placeholder="password" required />
                </label>
                <button>LOG IN</button>
            </form>
        </div>
    )
}

export default Login; 
