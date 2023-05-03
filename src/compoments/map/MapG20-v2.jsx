import React from 'react';
import GoogleMapReact from "google-map-react";

import MyMarker from './MyMarker';


const points = [
  { id: 1, title: "BANDARA", alarm: 'clear', category: 'bandara',  lat: -8.117698045546928, lng: 115.25430727318533 },
  { id: 2, title: "ITDC", alarm: 'warning', category: 'itdc', lat: -8.320021207173442, lng: 115.18074082226074 },
  { id: 3, title: "GWK", alarm: 'danger', category: 'wisata', lat: -8.402040716873705, lng: 115.47805754444359 }
];

const MapG20 = () => {
  return(
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyAnJyPunrxDLtm7Jz2Bcg-2XRdO1vvhVMo",
        language: "en",
        region: "US"
      }}
      defaultCenter={{ lat: -8.3810866, lng: 115.1261906  }}
      defaultZoom={9.6}
      options={{
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      }}
    >
      {points.map((data, i) => {
        return (
          <MyMarker 
            key={i} 
            lat={data.lat}
            lng={data.lng}
            title={data.title}
            alarm={data.alarm}
            category={data.category}
            tooltip={data.title} />
        );
      })}

    </GoogleMapReact>
  )
}

export default MapG20;