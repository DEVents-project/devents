import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { withRouter } from 'react-router-dom'
import ParticlesBg from 'particles-bg';
import '../style/Registration.scss'
import registration from '../assets/img/register.svg'
import createEvent from '../assets/img/createEvent.svg'
import publish from '../assets/img/publish.svg'
import login from '../components/Login'
import signup from '../components/SignUp'




const Registration = () => {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="space-wrap space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <h3 className="main-h3">From developers to developers. A place where sharing and finding meetups, workshops and conventions is simple!</h3>

            <h1 className="question">DO YOU WANT TO SHARE YOUR EVENT? NO PROBLEM!</h1>

            <div className="container">

                {/* square 1 */}


                <div className="squares">
                    <div className="img-1">
                        <img src={registration} alt="registrer" className="img-registration" />
                    </div>


                    <div className="aside aside-1">
                        <h2>EASY SIGN UP</h2>

                        <p className="registration-p">Create an account with only your name and email address.</p>

                    </div>


                </div>




                {/* square 2 */}

                <div className="squares square-2">

                    <div className="img-1">
                        <img src={createEvent} alt="create event" className="img-registration" />
                    </div>
                    <div className="aside aside-2">
                        <h2>CREATE AN EVENT</h2>

                        <p className="registration-p">Share all the relevant information about your event.

</p>

                    </div>
                </div>


                {/* square 3 */}

                <div className="squares square-3 box">
                    <div className="img-1">
                        <img src={publish} alt="publish" className="img-registration" />
                    </div>
                    <div className="aside aside-3">
                        <h2>AND PUBLISH IT!</h2>

                        <p className="registration-p">One click and that's it. Easy peasy! </p>

                    </div>
                </div>



            </div>





            <div className="buttons-container">
                <button className="button signup-button">Sign up</button>
                <button className="button login-button">Login</button>
            </div>

            <BrowserRouter>

            </BrowserRouter>

        </div>
    )
}

export default Registration







