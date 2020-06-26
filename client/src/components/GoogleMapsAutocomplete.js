import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

const GoogleMapsAutocomplete = ({ placeholder, setLocation, setCoordinates, setLat, setLng }) => {

    const getCoordinates = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((data) => {
                // console.log('LAT: ', data.lat);
                // console.log('LNG: ', data.lng);
                setCoordinates(data)
                return (data)
            }).then(res => {
                console.log('RES:LAT', res.lat);
                console.log('RES:LNG', res.lng);
                setLat(res.lat);
                setLng(res.lng)
            })
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                inputClassName={'location-container event-input map-address'}
                onSelect={(input) => { console.log(input); getCoordinates(input.description); setLocation(input.description) }}
                placeholder={placeholder}
            />
        </div>
    )
};

export default GoogleMapsAutocomplete;