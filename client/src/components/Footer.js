import React from 'react'

import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <div className="container">
            <footer className="footer">
                <FontAwesomeIcon className="icon-help" icon={faQuestionCircle} />
                <div></div>
            </footer>
        </div>
    )
}
