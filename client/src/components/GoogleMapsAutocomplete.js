import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';

const GoogleMapsAutocomplete = ({ setLocation }) => {

    return (
        <div>
            <GooglePlacesAutocomplete
                inputClassName={'location-container event-input'}
                onSelect={(e) => { console.log(e); setLocation(e.description) }}
                placeholder={'the event\'s location'}
            />
        </div>
    )
};

export default GoogleMapsAutocomplete;