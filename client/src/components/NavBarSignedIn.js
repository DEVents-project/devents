import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TextTransition, { presets } from "react-text-transition";


const NavBarSignedIn = () => {
    const { setLoggedIn } = useContext(Context);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // this is the LOGO:
    const [titleIndex, setTitleIndex] = useState(0);
    const title = [
        "Devents",
        "Events",
        "for",
        "developers"
    ];

    useEffect(() => {
        setInterval(() => {
            setTimeout(() => {
                setTitleIndex(index => index + 1);
                setTimeout(() => {
                    setTitleIndex(index => index + 1);
                    setTimeout(() => {
                        setTitleIndex(index => index + 1);
                        setTimeout(() => {
                            setTitleIndex(index => index + 1);
                        }, 800);
                    }, 800);
                }, 800);
            }, 800);
        }, 12000);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 670px)');
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, [])

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const closeSession = () => {
        localStorage.clear();
        setLoggedIn(false);
    };

    return (
        <div>
            <header>
                <NavLink to="/" onClick={() => setIsNavVisible(false)}>
                    <h1 id="logo">
                        <TextTransition
                            direction={'down'}
                            text={title[titleIndex % title.length]}
                            springConfig={presets.molasses}
                        />
                    </h1>
                </NavLink>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={() => setIsNavVisible(!isNavVisible)} />
                <nav style={{ left: isNavVisible || !isSmallScreen ? '0' : '100%' }}>
                    <ul className="nav-group">
                        <li><NavLink to="/events" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Find events</NavLink></li>
                        <li><NavLink to="/addevent" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Add event</NavLink></li>
                    </ul>
                    <ul className="nav-group">
                        <li><NavLink to="/account" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">ACCOUNT</NavLink></li>
                        <li><NavLink to="/" onClick={() => { closeSession(); setIsNavVisible(false) }} className="underline">SIGN OUT</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedIn;
