import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// const libraries = ['places'];

type Library = 'places';

const libraries: Library[] = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '5px',
};
const center = {
    lat: 12.912647,
    lng: 77.588913,
};

const GoogleMapComponent = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC7zcEhIUutU-ygyUI4zRX74ryhiNmIhd8',
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapComponent;
