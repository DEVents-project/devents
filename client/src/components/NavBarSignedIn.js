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
                <NavLink to="/"><h1 id="logo">DEVents</h1></NavLink>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={toggleNav} />
                <nav style={{ display: isNavVisible || !isSmallScreen ? 'flex' : 'none' }}>
                    <ul className="nav-group">
                        <NavLink activeClassName="selected-section" to="/events" className="underline"><li>Find events</li></NavLink>
                        <NavLink activeClassName="selected-section" to="/addevent"><li>Add event</li></NavLink>
                    </ul>
                    <ul className="nav-group">
                        <NavLink activeClassName="selected-section" to="/account"><li>ACCOUNT</li></NavLink>
                        <NavLink activeClassName="selected-section" to="/"><li>SIGN OUT</li></NavLink>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedIn;
