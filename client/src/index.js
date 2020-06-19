import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './components/App';
import './assets/fonts/Hallosans.otf'
import Favicon from 'react-favicon'
import img from './assets/img/favicon.ico'
import { faDivide } from '@fortawesome/free-solid-svg-icons';


ReactDOM.render(
  <div>
  <Favicon url={img}/>
    <App />
  
      
  </div>
   
   
 
  ,document.getElementById('root')
);
