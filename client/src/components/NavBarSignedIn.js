import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBarSignedIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBarSignedIn = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 670px)');
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }
    }, [])

    return (
        <div>
            <header>
                <Link to="/"><h1 id="logo">DEVents</h1></Link>
                <FontAwesomeIcon className="menu-bars" icon={faBars} onClick={() => setIsNavVisible(!isNavVisible)} />
                <nav style={{ display: isNavVisible ? 'flex' : 'none' }}>
                    <ul className="nav-group">
                        <Link to="/events"><li>Find events</li></Link>
                        <Link to="/register"><li>Add event</li></Link>
                    </ul>
                    <ul className="nav-group">
                        <Link to="/login"><li>LOGIN</li></Link>
                        <Link to="/signup"><li>SIGN UP</li></Link>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarSignedIn;
