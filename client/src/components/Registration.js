import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import '../style/Registration.scss'
import Signin from '../assets/img/signup.svg'
import CreateEvent from '../assets/img/createEvent.svg'
import Publish from '../assets/img/publish.svg';



const Registration = () => {

    return (
        <div className="space-wrap space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <h3 className="main-h3">From developers to developers. A place where sharing and finding meetups, workshops and conventions is simple!</h3>

            <h1 className="question">DO YOU WANT TO SHARE YOUR EVENT? NO PROBLEM!</h1>

            <div className="container">
                <div className="squares">
                    <div className="img-1">
                        <img src={Signin} alt="sing up" className="img-registration" />
                    </div>

                    <div className="aside aside-1">
                        <h2>EASY SIGN UP</h2>
                        <p>Create an account with only your name and email address.</p>
                    </div>
                </div>

                <div className="squares square-2">

                    <div className="img-1">
                        <img src={CreateEvent} alt="create an event" className="img-registration" />
                    </div>
                    <div className="aside aside-2">
                        <h2>CREATE AN EVENT</h2>
                        <p>Share all the relevant information about your event.</p>
                    </div>
                </div>

                <div className="squares square-3 box">
                    <div className="img-1">
                        <img src={Publish} alt="publish an event" className="img-registration" />
                    </div>
                    <div className="aside aside-3">
                        <h2>AND PUBLISH IT!</h2>
                        <p>One click and that's it. Easy peasy! </p>
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







