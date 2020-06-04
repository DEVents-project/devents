import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TextTransition, { presets } from "react-text-transition";


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
                <NavLink to="/" onClick={() => setIsNavVisible(false)}>
                    <h1 id="logo">DEV
                        <TextTransition
                            direction={'down'}
                            text={'ents'}
                            springConfig={presets.molasses}
                        />
                    </h1>
                </NavLink>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={toggleNav} />
                <nav style={{ left: isNavVisible || !isSmallScreen ? '0' : '100%' }}>
                    <ul className="nav-group">
                        <li><NavLink to="/events" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Find events</NavLink></li>
                        <li><NavLink to="/addevent" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">Add event</NavLink></li>
                    </ul>
                    <ul className="nav-group">
                        <li><NavLink to="/account" onClick={() => setIsNavVisible(false)} activeClassName="selected-section" className="underline">ACCOUNT</NavLink></li>
                        <li><NavLink to="/" onClick={() => setIsNavVisible(false)} className="underline">SIGN OUT</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedIn;
