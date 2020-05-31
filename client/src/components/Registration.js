import React from 'react'
// import { withRouter } from 'react-router-dom'
import '../style/Registration.scss'

const Registration = () => {
  
    
    return (
        <div className="space-wrap space-navbar">
            
            <h1 className="question">Want to add your event?</h1>
            
            <div className="container">
            
                <div className="square">
                    <h1 className="registrate">Registrate</h1>
                   
                </div>
            
                <div className="square">
                    <h2>Add an event</h2>
                </div>

                <div className="square">
                    <h2>Publish it</h2>
                </div>

            </div>
            
            <div className="step-container">
                <div className="step-letters">
                <h2 className="step-1">Step 1</h2> 
                </div>

                <div className="step-letters">
                <h2 className="step-1">Step 2</h2>
                </div>

                <div className="step-letters">
                    <h2 className="step-1">Step 3</h2>  
                </div>
            </div>
            
        

            
               
        <div className="buttons-container">
            <button className="button">Registrer</button>
            <button className="button">Login</button>
        </div>

            
        </div>
    )
}

export default Registration
