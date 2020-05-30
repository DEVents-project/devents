import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBarSignedIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBarSignedIn = () => {
    return (
        <div>
            <header>
                <Link to="/"><h1 id="logo">DEVents</h1></Link>
                <FontAwesomeIcon className="menu-bars" icon={faBars} />
                <nav>
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
