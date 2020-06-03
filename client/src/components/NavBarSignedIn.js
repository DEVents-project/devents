import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const NavBarSignedIn = () => {
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
                <nav style={{ display: isNavVisible || !isSmallScreen ? 'flex' : 'none' }}>
                    <ul className="nav-group">
                        <NavLink to="/events" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline"><li>Find events</li></NavLink>
                        <NavLink to="/addevent" onClick={() => setIsNavVisible(false)} activeClassName="selected-section"><li>Add event</li></NavLink>
                    </ul>
                    <ul className="nav-group">
                        <NavLink to="/account" onClick={() => setIsNavVisible(false)} activeClassName="selected-section"><li>ACCOUNT</li></NavLink>
                        <NavLink to="/" onClick={() => setIsNavVisible(false)} activeClassName="selected-section"><li>SIGN OUT</li></NavLink>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedIn;
