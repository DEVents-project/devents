import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

import '../style/SignUp.scss';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    const history = useHistory();
    const { userData, setUserData, setToken } = useContext(Context);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [typeOfUser, setTypeOfUser] = useState('developer');
    const [avatar, setAvatar] = useState('');

    // set a status for what happens after sign up 
    const [isSignedUp, setIsSignedUp] = useState(false);

    const avatars = [
        'https://joeschmoe.io/api/v1/jeri',
        'https://joeschmoe.io/api/v1/jess',
        'https://joeschmoe.io/api/v1/jana',
        'https://joeschmoe.io/api/v1/james',
        'https://joeschmoe.io/api/v1/joe',
        'https://joeschmoe.io/api/v1/julie',
    ];

    const handleSignUp = async (e) => {
        e.preventDefault();

        const signUpData = {
            name,
            email,
            avatar,
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
        const resp = await fetch('http://localhost:4000/users', userData);
        const header = resp.headers.get('x-auth');
        const data = await resp.json();

        console.log("res:", data);

        if (data.success) {
            localStorage.setItem('token', header);
            setToken(header);
            setUserData(data.user)
            setIsSignedUp(true)
        }
    };

    useEffect(() => {
        isSignedUp && history.push('/account')
    })

    return (
        <div className="signup-container space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />

            <form className="signup-form" onSubmit={handleSignUp}>
                <h2 className="h2-signup">SIGN UP</h2>
                <label className="signup-label"> Are you
                    <select id={name} className="signup-select" onChange={(e) => setTypeOfUser(e.currentTarget.value)} >
                        <option className="signup-opt" value="developer" selected>Developer</option>
                        <option className="signup-opt" value="organization">Organization</option>
                    </select>
                </label>
                <label className="signup-label">
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
                {
                    typeOfUser === 'developer' ?
                        <p className="signup-label">Choose your avatar</p>
                        :
                        null
                }

                {
                    typeOfUser === 'developer' ?
                        <div className="avatar-container">
                            {
                                avatars.map((avatar, i) => {
                                    return (
                                        <div key={i} >
                                            <input
                                                type="radio"
                                                id={i}
                                                name='avatar'
                                                value={avatars[i]}
                                                onChange={(e) => setAvatar(e.currentTarget.value)} />
                                            <label htmlFor={i}><img src={avatar} className="avatar" alt={avatar.slice(28)} /></label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }

                <label className="signup-label">Email *
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

                        <label className="signup-label">Website
                        <input
                                className="signup-input"
                                type="url"
                                value={website}
                                placeholder="the url of the website "
                                onChange={(e) => setWebsite(e.target.value)} />
                        </label>
                }

                <label className="signup-label">Password *
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
