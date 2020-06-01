import React from 'react'

import '../style/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <div>
            <footer>
                <p>Need help?</p>
                <FontAwesomeIcon className="icon-help" icon={faBars} />
            </footer>
        </div>
    )
}
