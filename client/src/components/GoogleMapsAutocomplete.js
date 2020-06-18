import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

const GoogleMapsAutocomplete = ({ setLocation, setCoordinates, setLat, setLng }) => {

    const getCoordinates = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((lat, lng) => {
                setCoordinates(JSON.stringify(lat, lng))
                return (JSON.stringify(lat, lng))
            }).then((res) => {
                console.log('RES', res);
                setLat(parseFloat(res.split(',')[0].slice(7, 14)));
                setLng(parseFloat(res.split(',')[1].slice(6, 13)));
            });
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                inputClassName={'location-container event-input map-address'}
                onSelect={(input) => { console.log(input); getCoordinates(input.description); setLocation(input.description) }}
                placeholder={'the event\'s location'}
                required={true}
            />
        </div>
    )
};

export default GoogleMapsAutocomplete;