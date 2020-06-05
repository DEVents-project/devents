import React, { useEffect } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const GoogleMapsAutocomplete = ({ location, setLocation }) => {

    const getLocation = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
                console.log('Successfully got latitude and longitude', { lat, lng })
            );
    }

    return (
        <div>
            <GooglePlacesAutocomplete
                inputClassName={'location-container event-input'}
                onSelect={(input) => { console.log(input); getLocation(input.description); setLocation(input.description) }}
                placeholder={'the event\'s location'}
            />
        </div>
    )
};

export default GoogleMapsAutocomplete;