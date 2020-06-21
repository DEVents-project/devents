import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import '../style/Faq.scss';
import ParticlesBg from 'particles-bg';

const Faq = () => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-navbar faq-container">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <div className="theme-list slide-from-left">
                <ul>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#whatisdevents">What is DEVents?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#howtocreateevent">How to create an event?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#howtocreateaccount">How to create an account?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#editpersonalinfo">Can I edit my personal info?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#doineedtopay">Do I need to pay to post my event?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#findevents">How to find an event?</HashLink></li>
                    <li><HashLink style={{ color: "#256eac", textDecoration: "none" }} to="/faq#attendevents">What if I want to attend an event?</HashLink></li>
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
                        <p>
                            DEVents is a web app created by and for web developers who are continuously looking for challenges as well as new ways to expand their knowledge. In DEVents you can find all happenings regarding web development (meetups, workshops or conventions) and also sign up and create your own meetups, projects or study groups.
                        </p>
                        <p>
                            You won’t need to visit several websites to be aware of the last web development events. You’ll just need to enter in DEVents.
                        </p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreateevent">
                        <h4>HOW TO CREATE AN EVENT?</h4>
                        <ol>
                            <li>1. First of all you will need to create an account (take a look at the next question).</li>
                            <li>2. Click on the top navigation bar on 'Add event'.</li>
                            <li>3. Fill in all the required fields.</li>
                            <li>4. Click on 'Publish event'.</li>
                            <li>You will then find your event among all the meetups and also in your account.</li>
                            <li><strong>* If you want to delete your event, you will find the button 'Delete' inside the event information.</strong></li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="howtocreateaccount">
                        <h4>HOW TO CREATE AN ACCOUNT?</h4>
                        <ol>
                            <li>1. Click on the top navigation bar on 'Sign up'.</li>
                            <li>2. Fill in all the required fields.</li>
                            <li>3. Click on 'Create account'.</li>
                            <li>You will be able to edit your personal information afterwards by clicking on 'Account' in the navigation bar.</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="editpersonalinfo">
                        <h4>CAN I EDIT MY PERSONAL INFO?</h4>
                        <p>Sure you can! This is how:</p>
                        <ol>
                            <li>1. Once you logged in, click on 'Account in the navigation bar.</li>
                            <li>2. Underneath your personal information you can click on 'Edit Information'.</li>
                            <li>3. You will be able to edit your name, email address, password and avatar.</li>
                            <li>4. Click on 'Save'.</li>
                            <li><strong>* If you want to delete your account, you will find the button 'Delete' under the 'Save' one.</strong></li>
                            <li><strong>* Please note that the events you have created will remain on the website if you don't remove them before deleting your account.</strong></li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="doineedtopay">
                        <h4>DO I NEED TO PAY TO POST MY EVENT?</h4>
                        <p>Not at all. DEVents is a free space intended to connect web developers and expand the community.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="findevents">
                        <h4>HOW DO I FIND AN EVENT?</h4>
                        <ol>
                            <li>1. You don't need to be logged in to take a look at all the events saved in DEVents.</li>
                            <li>2. Click on 'Find events' on the navigation bar.</li>
                            <li>3. Meetups, workshops and conventions will be filtered by city. You just need to click on the desired city.</li>
                        </ol>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                    <div id="attendevents">
                        <h4>WHAT IF I WANT TO ATTEND AN EVENT?</h4>
                        <p>In DEVents you will find 3 different types of event: meetups, workshops and conventions. You can filter all by city. There will be just cities displayed where any event will take place.</p>
                        <p>You will find a link on the workshops and conventions that leads you to more information and contact data.</p>
                        <p>In the case of the meetups, you will find all the information displayed in this website. The meetups are created by users of this web app and they will be responsible of saving the correct information for each event. This information can also be edited afterwards by the host.</p>
                        <h6 onClick={scrollTop}>Back to top</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;