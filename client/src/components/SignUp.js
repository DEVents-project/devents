import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import '../style/SignUp.scss';
import ParticlesBg from 'particles-bg';


const SignUp = () => {
    const history = useHistory();
    // const Context = useContext(Context);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [typeOfUser, setTypeOfUser] = useState('developer');
    const [avatar, setAvatar] = useState(false);

    // set a status for what happens after sign up 
    const [isSignedUp, setIsSignedUp] = useState(false)
    // const { userData, setUserData } = useContext(Context);


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
        const resp = await fetch('http://localhost:4000/signup', userData);
        const data = await resp.json();
        console.log("res:", data);
        if (data.success) {
            setIsSignedUp(true)
            // setUserData(data.user)
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
                        <div className="signup-label" onChange={(e) => setAvatar(e.currentTarget.value)}>Choose your avatar
                            <div className="avatar-container">
                                <label for="optOne"><img className="avatar" src={'https://joeschmoe.io/api/v1/jeri'} alt="Avatar Jeri" /></label>
                                <input type="radio" name="avatars" id="optOne" className="input-hiden" checked />

                                <label for="optTwo"><img className="avatar" src={'https://joeschmoe.io/api/v1/jess'} alt="Avatar Jess" /></label>
                                <input type="radio" name="avatars" id="optTwo" className="input-hiden" />

                                <label for="optThree"><img className="avatar" src={'https://joeschmoe.io/api/v1/julie'} alt="Avatar Julie" /></label>
                                <input type="radio" name="avatars" id="optThree" className="input-hiden" />

                                <label for="optFour"><img className="avatar" src={'https://joeschmoe.io/api/v1/jana'} alt="Avatar Jana" /></label>
                                <input type="radio" name="avatars" id="optFour" className="input-hiden" />

                                <label for="optFive"><img className="avatar opacity" src={'https://joeschmoe.io/api/v1/james'} alt="Avatar James" /></label>
                                <input type="radio" name="avatars" id="optFive" className="input-hiden" />

                                <label for="optFive"><img className="avatar" src={'https://joeschmoe.io/api/v1/joe'} alt="Avatar Joe" /></label>
                                <input type="radio" name="avatars" id="optFive" className="input-hiden" />
                            </div>
                        </div> :
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
