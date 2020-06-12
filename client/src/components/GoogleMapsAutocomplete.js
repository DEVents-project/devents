import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

const GoogleMapsAutocomplete = ({ setLocation, setCoordinates }) => {

    const getCoordinates = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((lat, lng) =>
                setCoordinates(JSON.stringify(lat, lng))
            );
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                inputClassName={'location-container event-input'}
                onSelect={(input) => { console.log(input); getCoordinates(input.description); setLocation(input.description) }}
                placeholder={'the event\'s location'}
            />
        </div>
    )
};

export default GoogleMapsAutocomplete;