import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBarSignedOut = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

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
                <NavLink to="/" onClick={() => setIsNavVisible(false)}><h1 id="logo">DEVents</h1></NavLink>
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
        </div >
    );
}

export default NavBarSignedOut;
