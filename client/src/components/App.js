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
  const [events, setEvents] = useState('');
  const [meetups, setMeetups] = useState('')
  const [workshops, setWorkshops] = useState('');
  const [conventions, setConventions] = useState('');

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
        location: 'Fakestreet 123, 12345 Springfield',
        description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
        coordinates: ['51.5200', '12.4050']
      },
      {
        title: 'Example of title 2',
        img: 'example of image 2',
        date: '02.07.2020',
        location: 'Fakestreet 123, 12345 Springfield',
        description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.`,
        coordinates: ['52.5200', '13.4050']
      },
      {
        title: 'Example of title 3',
        img: 'example of image 3',
        date: '27.08.2020',
        location: 'Fakestreet 123, 12345 Springfield',
        description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.`,
        coordinates: ['53.5200', '14.4050']
      }
    ]
  }
  const [userData, setUserData] = useState(hardCodedUserData);
  // localstorage to save the token coming from the header. by clicking on signout the localstorage will be cleared:
  const [storage, setStorage] = useState(localStorage.getItem('token'));
  // this is the state that is going to carry all the information of one specific event, when the user clicks on it to see the description:
  const [eventInfo, setEventInfo] = useState(null);

  // console.log('CURRENT EVENT INFO: ', eventInfo);

  useEffect(() => {
    const fetchEvents = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const allEventsTogether = [];

      const response = await fetch('http://localhost:4000/events', options);
      const meetups = await response.json();
      // console.log('MEETUPS - Response: ', meetups);
      meetups.events.map(meetup => allEventsTogether.push(meetup));
      setMeetups(meetups.events.filter(event => !event.url)
      );

      const response2 = await fetch('http://localhost:4000/workshops', options);
      const workshops = await response2.json();
      // console.log('WORKSHOPS - Response: ', workshops);
      workshops.events.map(workshop => allEventsTogether.push(workshop));
      setWorkshops(workshops.events.filter(event => event.url.includes('meetup'))
      );

      const response3 = await fetch('http://localhost:4000/conventions', options);
      const conventions = await response3.json();
      // console.log('CONVENTIONS - Response: ', conventions);
      conventions.events.map(convention => allEventsTogether.push(convention));
      setConventions(conventions.events.filter(event => event.url.includes('eventil'))
      );

      // console.log('ALL EVENTS: ', allEventsTogether);
      setEvents(allEventsTogether);
    };

    fetchEvents();
  }, []);

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
      <Context.Provider value={{ loggedIn, setLoggedIn, userData, setUserData, eventInfo, setEventInfo, events, setEvents, meetups, workshops, conventions }}>
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