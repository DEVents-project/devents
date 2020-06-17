import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import '../style/Faq.scss';
import ParticlesBg from 'particles-bg';

const Faq = () => {

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-navbar faq-container">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="theme-list slide-from-left">
                <ul>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#whatisdevents">What is DEVents?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#howtocreateevent">How to create an event?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#howtocreateaccount">How to create an account?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#editpersonalinfo">Can I edit my personal info?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#doineedtopay">Do I need to pay to post my event?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#findevents">How to find an event?</HashLink></li>
                    <li><HashLink style={{color: "#256eac", textDecoration: "none"}} to="/faq#attendevents">What if I want to attend an event?</HashLink></li>
                </ul>
            </div>
            <div className="questions-container slide-from-right">
                <div className="questions-headline">
                    <h3>WE ARE HERE</h3>
                    <h3>FOR ANY QUESTIONS</h3>
                    <h3>YOU MIGHT HAVE</h3>
                    <h5>IF YOU CAN'T FIND IT HERE, FEEL FREE TO <Link to="/contact">CONTACT US</Link></h5>
                </div>
                <div className="questions">
                    <div id="whatisdevents">
                        <h4>WHAT IS DEVENTS?</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreateevent">
                        <h4>HOW TO CREATE AN EVENT?</h4>
                        <ol>
                            <li>1. Lorem ipsum dolor sit amet</li>
                            <li>2. consectetur adipiscing elit</li>
                            <li>3. sed do eiusmod tempor incididunt</li>
                            <li>4. labore et dolore magna aliqua</li>
                            <li>5. Ut enim ad minim veniam</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreateaccount">
                        <h4>HOW TO CREATE AN ACCOUNT?</h4>
                        <ol>
                            <li>1. Lorem ipsum dolor sit amet</li>
                            <li>2. consectetur adipiscing elit</li>
                            <li>3. sed do eiusmod tempor incididunt</li>
                            <li>4. labore et dolore magna aliqua</li>
                            <li>5. Ut enim ad minim veniam</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="editpersonalinfo">
                        <h4>CAN I EDIT MY PERSONAL INFO?</h4>
                        <p>Sure you can! This is how:</p>
                        <ol>
                            <li>1. Lorem ipsum dolor sit amet</li>
                            <li>2. consectetur adipiscing elit</li>
                            <li>3. sed do eiusmod tempor incididunt</li>
                            <li>4. labore et dolore magna aliqua</li>
                            <li>5. Ut enim ad minim veniam</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="doineedtopay">
                        <h4>DO I NEED TO PAY TO POST MY EVENT?</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="findevents">
                        <h4>HOW DO I FIND AN EVENT?</h4>
                        <ol>
                            <li>1. Lorem ipsum dolor sit amet</li>
                            <li>2. consectetur adipiscing elit</li>
                            <li>3. sed do eiusmod tempor incididunt</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="attendevents">
                        <h4>WHAT IF I WANT TO ATTEND AN EVENT?</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;