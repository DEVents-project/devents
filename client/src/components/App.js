import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/App.scss';
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarSignedOut from "./NavBarSignedOut";
import Landing from "./Landing";
import Login from "./Login";
import Registration from './Registration'
import Events from "./Events";
import SignUp from './SignUp';
import Footer from './Footer';
import Account from "./Account";
import EventInformation from "./EventInformation";
import CreateEvent from "./CreateEvent";
import Context from './Context';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  // HARD CODED USER DATA BY NOW. This should contain the user's info and the events he has created, all fetched from the DB:
  const hardCodedUserData = {
    name: 'Peter Griffin',
    email: 'test@test.com',
    password: 'password',
    events: [
      {
        title: 'Example of title 1',
        img: 'example of image',
        date: '27.06.2020',
        location: ['51.5200', '12.4050']
      },
      {
        title: 'Example of title 2',
        img: 'example of image 2',
        date: '02.07.2020',
        location: ['52.5200', '13.4050']
      },
      {
        title: 'Example of title 3',
        img: 'example of image 3',
        date: '27.08.2020',
        location: ['53.5200', '14.4050']
      }
    ]
  }
  const [userData, setUserData] = useState(hardCodedUserData);
  // localstorage to save the token coming from the header. by clicking on signout the localstorage will be cleared:
  const [storage, setStorage] = useState(localStorage.getItem('token'));
  // this is the state that is going to carry all the information of one specific event, when the user clicks on it to see the description:
  const [eventInfo, setEventInfo] = useState(null);

  console.log('CURRENT EVENT INFO: ', eventInfo);

  useEffect(() => {
    if (storage) {
      const getUserData = async () => {
        const options = {
          method: 'GET',
          headers: {
            'x-auth': storage,
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch('http://localhost:4000/users', options);
        const data = await response.json();

        setUserData(data.data);
      };

      setLoggedIn(true);
      getUserData();
    }
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ loggedIn, setLoggedIn, userData, setUserData, eventInfo, setEventInfo }}>
        <BrowserRouter>
          {
            loggedIn ?
              <NavBarSignedIn />
              :
              <NavBarSignedOut />
          }
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/registration" component={Registration} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/events" component={Events} />
            <Route path="/account" component={Account} />
            <Route path="/event" component={EventInformation} />
            <Route path="/addevent" component={CreateEvent} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Context.Provider>
    </div>
  );
};

export default App;