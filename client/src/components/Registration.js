import React from 'react'
// import { withRouter } from 'react-router-dom'
import ParticlesBg from 'particles-bg';
import '../style/Registration.scss'
import register from  '../assets/img/register.svg'
import createEvent from '../assets/img/createEvent.svg'
import publish from '../assets/img/publish.svg'


const Registration = () => {
  
    
    return (
        <div className="space-wrap space-navbar">
            <ParticlesBg color="#8d8d8d" num={50} type="cobweb" bg={true} />
            <h1 className="question">Want to add your event?</h1>
            
            <div className="container">
            
             {/* square 1 */}

                <div className="squares square-1 box">
                   
                    <img src={register} alt="register-img" className="img"/>

                   <h1 className="one">1</h1>
                   
                   <aside className="aside"> 
                       <h2>Sign up</h2>
                       <p>Registrer your data so you can provide the users some information about your events</p>
                   
                   </aside>
                    
                   
                </div>
                  
                
                   

              {/* square 2 */}
                 
                <div className="square square-2">
                    <img src={createEvent} alt="create Event"/>
                <h1 className="two numbers">2</h1>
                  
                   <aside className="aside"> 
                       <h2>Add an event</h2>
                       <p>Add an event of any your preferences</p>
                   
                   </aside>
                </div>

                  {/* square 3 */}

                <div className="square square-3 box">
                    <img src={publish} alt="publish"/>
                <h1 className="three numbers">3</h1>
                   <aside className="aside"> 
                       <h2>Publish it</h2>
                       <p>Publish your event and make it global, interact with toun </p>
                   
                   </aside>
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
