import React, { useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Context.Provider value={{ loggedIn, setLoggedIn }}>
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