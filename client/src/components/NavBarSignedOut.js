import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TextTransition, { presets } from "react-text-transition";
// import Logo from '../assets/img/devents-logo2.png';

const NavBarSignedOut = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const [titleIndex, setTitleIndex] = useState(0);
    const title = [
        "Devents",
        "Events",
        "for",
        "developers"
    ];

    useEffect(() => {
        let interval = true;

        if (interval) {
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
        }

        return () => interval = false;
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

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
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
                    {/* <h1 id="logo">
                        <img src={Logo} id="logo-img" alt="" />
                    </h1> */}
                </NavLink>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={toggleNav} />
                <nav style={{ left: isNavVisible || !isSmallScreen ? '0' : '100%' }}>
                    <ul className="nav-group">
                        <li><NavLink to="/events" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Find events</NavLink></li>
                        <li><NavLink to="/registration" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Add event</NavLink></li>
                    </ul>
                    <ul className="nav-group">
                        <li><NavLink to="/login" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">LOG IN</NavLink></li>
                        <li><NavLink to="/signup" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">SIGN UP</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedOut;
