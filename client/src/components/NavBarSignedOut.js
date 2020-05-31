import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/"><h1 id="logo">DEVents</h1></Link>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={toggleNav} />
                <nav style={{ display: isNavVisible || !isSmallScreen ? 'flex' : 'none' }}>
                    <ul className="nav-group">
                        <li><Link to="/events" className="underline">Find events</Link></li>
                        <li><Link to="/registration" className="underline">Add event</Link></li>
                    </ul>
                    <ul className="nav-group">
                        <li><Link to="/login" className="underline">LOG IN</Link></li>
                        <li><Link to="/signup" className="underline">SIGN UP</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedOut;
