import React, { useEffect } from 'react';

interface MapProps {
    center: { lat: number; lng: number };
    polygonCoords: { lat: number; lng: number }[];
}

const MapComponent: React.FC<MapProps> = ({ center, polygonCoords }) => {
    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById('map')!, {
            center,
            zoom: 12,
        });

        const polygon = new window.google.maps.Polygon({
            paths: polygonCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
        });
        polygon.setMap(map);

        return () => {
            polygon.setMap(null); // Clean up when component unmounts
        };
    }, [center, polygonCoords]);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;
