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
import Moment from "moment"


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [events, setEvents] = useState('');
  const [meetups, setMeetups] = useState('');
  const [meetupsCities, setMeetupsCities] = useState('');
  const [workshops, setWorkshops] = useState('');
  const [workshopsCities, setWorkshopsCities] = useState('');
  const [conventions, setConventions] = useState('');
  const [conventionsCities, setConventionsCities] = useState('');

  const [userData, setUserData] = useState(null);
  // localstorage to save the token coming from the header. by clicking on signout the localstorage will be cleared:
  const [token, setToken] = useState(localStorage.getItem('token'));
  // this is the state that is going to carry all the information of one specific event, when the user clicks on it to see the description:
  const [eventInfo, setEventInfo] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // FETCHING GOOGLE MAPS API:
  useEffect(() => {
    const script = document.createElement('script');

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);


  // FUNCTION FETCHING ALL THE EVENTS:
  const fetchEvents = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const allMeetups = [];

    const request1 = await fetch('http://localhost:4000/events', options);
    const response1 = await request1.json();
    response1.events.map(meetup => {
      allMeetups.push({
        title: meetup.title,
        description: meetup.description,
        url: meetup.website,
        date: meetup.date,
        city: meetup.location.split(', ')[1],
        coordinates: meetup.coordinates,
        img: meetup.imgUrl,
        location: meetup.location,
        authorId: meetup.authorId,
        _id: meetup._id
      });
    });

    allMeetups.sort((a, b) => new Moment(a.date).format('MMDDYYYY') - new Moment(b.date).format('MMDDYYYY'));
    const citiesWithMeetups = [];
    allMeetups.map(event => citiesWithMeetups.push(event.city));
    setMeetupsCities([...new Set(citiesWithMeetups)].sort());
    setMeetups(allMeetups);

    const allWorkshops = [];

    const request2 = await fetch('http://localhost:4000/workshops', options);
    const response2 = await request2.json();
    // console.log('WORKSHOPS - Response: ', response2);
    response2.events.map(workshop => allWorkshops.push(workshop));
    allWorkshops.sort((a, b) => new Moment(a.date).format('MMDDYYYY') - new Moment(b.date).format('MMDDYYYY'));

    const citiesWithWorkshops = [];
    allWorkshops.map(event => citiesWithWorkshops.push(event.city));
    setWorkshopsCities([...new Set(citiesWithWorkshops)].sort());
    setWorkshops(allWorkshops);


    const allConventions = [];

    const request3 = await fetch('http://localhost:4000/conventions', options);
    const response3 = await request3.json();
    // console.log('CONVENTIONS - Response: ', response3);
    response3.events.map(convention => allConventions.push(convention));
    allConventions.sort((a, b) => new Moment(a.date).format('MMDDYYYY') - new Moment(b.date).format('MMDDYYYY'));

    const citiesWithConventions = [];
    allConventions.map(event => citiesWithConventions.push(event.city));
    setConventionsCities([...new Set(citiesWithConventions)].sort());
    setConventions(allConventions);

  };

  console.log('ALL EVENTS FETCHED: ', meetups, workshops, conventions);

  // FETCHING THE USER INFORMATION - USER SESSION:
  const getUserData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-auth': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const response = await fetch('http://localhost:4000/users', options);
    const data = await response.json();

    setUserData(data.user);
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      getUserData();
    }
  }, []);


  return (
    <div className="App">
      <Context.Provider value={{ meetupsCities, workshopsCities, conventionsCities, getUserData, fetchEvents, loggedIn, setLoggedIn, token, setToken, userData, setUserData, eventInfo, setEventInfo, meetups, workshops, conventions }}>
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