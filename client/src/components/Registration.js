
import React, { useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import '../style/Registration.scss'
import Signin from '../assets/img/signup.svg'
import CreateEvent from '../assets/img/createEvent.svg'
import Publish from '../assets/img/publish.svg';




const Registration = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="space-wrap space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="main-text">
                <h1 className="slide-from-left">For developers, by developers.<br /><span className="second-line">Where finding each other</span>  <span className="underscore"> is simple!</span></h1>
            </div>

            <h2 className="question">DO YOU WANT TO SHARE YOUR EVENT? NO PROBLEM!</h2>

            <div className="container">
                <div className="squares">
                    <div className="img-1">
                        <img src={Signin} alt="sing up" className="img-registration" />
                    </div>

                    <div className="aside aside-1">
                        <h3 className="title">EASY SIGN UP</h3>
                        <p className="registration-p">Create an account with only your name and email address.</p>
                    </div>
                </div>

                <div className="squares square-2">
                    <div className="img-1">
                        <img src={CreateEvent} alt="create an event" className="img-registration" />
                    </div>
                    <div className="aside aside-2">
                        <h3 className="title">CREATE AN EVENT</h3>
                        <p className="registration-p">Share the relevant information about your event.</p>
                    </div>
                </div>

                <div className="squares square-3 box">
                    <div className="img-1">
                        <img src={Publish} alt="publish an event" className="img-registration" />
                    </div>
                    <div className="aside aside-3">
                        <h3 className="title">AND PUBLISH IT!</h3>
                        <p className="registration-p">One click and that's it. Easy peasy! </p>
                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <button className="button signup-button">Sign up</button>
                <button className="button login-button">Login</button>
            </div>

        </div>
    )
}

export default Registration







