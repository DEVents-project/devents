import React, { useState, Fragment } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/App.scss';
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarSignedOut from "./NavBarSignedOut";
import Landing from "./Landing";
import Login from "./Login";

const App = () => {
  const [test, setTest] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
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
          {/* <Route path="/signup" component={Signup} /> */}
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
