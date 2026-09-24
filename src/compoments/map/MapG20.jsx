import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { GoogleMap, InfoWindow, KmlLayer, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import ModalDetailArea from '../modal/ModalDetailArea';
import ModalDetailPoi from '../modal/ModalDetailPoi';
import ModalDetailEngineer from '../modal/ModalDetailTower';

const MyComponent= ({dataMapIcon, dataMapArea, dataMapPoi, uri, dataMapPeople}) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [markerDataArea, setMarkerDataArea] = useState(dataMapArea);
  const [markerDataPoi, setMarkerDataPoi] = useState(dataMapPoi);
  const [markerDataEngineer, setMarkerDataEngineer] = useState(dataMapPeople);
  // -8.9032135,116.3004407
  // -8.6667043,116.2774433
  const [center, setCenter] = useState({ lat: -8.6667043, lng:116.2774433});
  const [zoom, setZoom] = useState(10);
  const [showModalArea, setShowModalArea] = useState(false);
  const [showModalPoi, setShowModalPoi] = useState(false);
  const [showModalEngineer, setShowModalEngineer] = useState(false);
  const [areaDetailOnModal, setAreaDetailOnModal] = useState([]);
  const [poiDetailOnModal, setPoiDetailOnModal] = useState([]);
  const [engineerDetailOnModal, setEngineerDetailOnModal] = useState([]);
  const [zoomChange, setZoomChange] = useState(0);
  const [cityArea, setCityArea] = useState([]);
  const [statusArea, setStatusArea] = useState('NORMAL');
  const [statusPoi, setStatusPoi] = useState('NORMAL');
  const [iconSize, setIconSize] = useState(10);
  const [iconAnchor, setIconAnchor] = useState(iconSize/2);
  const [iconSize2, setIconSize2] = useState(20);
  const [iconAnchor2, setIconAnchor2] = useState(iconSize2/2);
const containerStyle = {
  width: '100%',
  height: '100%'
};

const handleCloseMarker = (center) => {
  setCenter(center);
  setActiveMarker(null);
};

function handleZoomChanged(){
  if( this.getZoom() <= 10) {
    setMarkerDataArea(dataMapArea);
    setMarkerDataPoi([]);
    setMarkerDataEngineer([]);
  }else{
    setMarkerDataArea([]);
    setMarkerDataPoi(dataMapPoi);
    setMarkerDataEngineer(dataMapPeople);
  }

  if(this.getZoom() === 20){
    setIconSize(30);
    setIconAnchor(30/2);
    setIconSize2(40);
    setIconAnchor2(40/2);
  }else if(this.getZoom() === 19){
    setIconSize(30);
    setIconAnchor(30/2);
    setIconSize2(40);
    setIconAnchor2(40/2);
  }else if(this.getZoom() === 18){
    setIconSize(30);
    setIconAnchor(30/2);
    setIconSize2(40);
    setIconAnchor2(40/2);
  }else if(this.getZoom() === 17){
    setIconSize(27);
    setIconAnchor(27/2);
    setIconSize2(37);
    setIconAnchor2(37/2);
  }else if(this.getZoom() === 16){
    setIconSize(27);
    setIconAnchor(27/2);
    setIconSize2(37);
    setIconAnchor2(37/2);
  }else if(this.getZoom() === 15){
    setIconSize(25);
    setIconAnchor(25/2);
    setIconSize2(35);
    setIconAnchor2(35/2);
  }else if(this.getZoom() === 14){
    setIconSize(25);
    setIconAnchor(25/2);
    setIconSize2(35);
    setIconAnchor2(35/2);
  }else if(this.getZoom() === 13){
    setIconSize(27);
    setIconAnchor(27/2);
    setIconSize2(37);
    setIconAnchor2(37/2);
  }else if(this.getZoom() === 12){
    setIconSize(27);
    setIconAnchor(27/2);
    setIconSize2(37);
    setIconAnchor2(37/2);
  }else if(this.getZoom() === 11){
    setIconSize(25);
    setIconAnchor(25/2);
    setIconSize2(35);
    setIconAnchor2(35/2);
  }else if(this.getZoom() === 10){
    setIconSize(35);
    setIconAnchor(35/2);
    setIconSize2(45);
    setIconAnchor2(45/2);
  }else if(this.getZoom() === 9){
    setIconSize(30);
    setIconAnchor(30/2);
    setIconSize2(40);
    setIconAnchor2(40/2);
  }else if(this.getZoom() === 8){
    setIconSize(30);
    setIconAnchor(30/2);
    setIconSize2(40);
    setIconAnchor2(40/2);
  }else if(this.getZoom() === 7){
    setIconSize(31);
    setIconAnchor(31/2);
    setIconSize2(411);
    setIconAnchor2(411/2);
  }else if(this.getZoom() === 6){
    setIconSize(24);
    setIconAnchor(24/2);
    setIconSize2(34);
    setIconAnchor2(34/2);
  }else if(this.getZoom() === 5){
    setIconSize(17);
    setIconAnchor(17/2);
    setIconSize2(27);
    setIconAnchor2(27/2);
  }else if(this.getZoom() === 4){
    setIconSize(10);
    setIconAnchor(10/2);
    setIconSize2(20);
    setIconAnchor2(20/2);
  }

  handleCloseMarker(center);
  setZoomChange(this.getZoom());
}
const handleShowModalInfoArea = async(city, title, lat, long, status) =>{
  await axios('https://10.65.103.51:8479/wsbk-2023/api/poi/map/first/'+city+"/"+status,{
    method: 'GET',
    headers: {
        'key': `bf931496409d570ca09cc0d30446b325`,
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(!res.data.error){
      setAreaDetailOnModal(res.data.data);
      setStatusArea(status)
      setCenter({lat: parseFloat(lat), lng: parseFloat(long)});
      setCityArea(city);
      setShowModalArea(!showModalArea);
      if (title === activeMarker) {
        return;
      }
      setActiveMarker(title);
    }
  })
  .catch(function(error){
      console.log(error)
  })
}

const handleCloseModalInfoArea = (marker, center) => {
  setCenter(center);
  setActiveMarker(null);
  setShowModalArea(false);
  setAreaDetailOnModal([]);
}

const handleShowModalInfoPoi = async(siteid, dataMapPoi, title, lat, long, status) =>{
  await axios('https://10.65.103.51:8479/wsbk-2023/api/poi/'+siteid+"/"+status,{
    method: 'GET',
    headers: {
        'key': `bf931496409d570ca09cc0d30446b325`,
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(!res.data.error){
      setPoiDetailOnModal(res.data.data);
      setStatusPoi(status)
      setCenter({lat: parseFloat(lat), lng: parseFloat(long)});
      setShowModalPoi(!showModalPoi);
      if (title === activeMarker) {
        return;
      }
      setActiveMarker(title);
    }
  })
  .catch(function(error){
      console.log(error)
  })
}

const handleCloseModalInfoPoi = (marker, center) => {
  setCenter(center);
  setActiveMarker(null);
  setShowModalPoi(false);
  setPoiDetailOnModal([]);
}

const handleShowModalInfoEngineer = async(username, dataengineer, title, lat, long) =>{
    setEngineerDetailOnModal(dataengineer);
    setCenter({lat: parseFloat(lat), lng: parseFloat(long)});
    setShowModalEngineer(!showModalEngineer);
    if (title === activeMarker) {
      return;
    }
    setActiveMarker(title);
}

const handleCloseModalInfoEngineer = (marker, center) => {
  setCenter(center);
  setActiveMarker(null);
  setShowModalEngineer(false);
  setEngineerDetailOnModal([]);
}

if(dataMapArea.length > 0){
  if(markerDataArea.length < 1 && zoomChange <= 10){
    setMarkerDataArea(dataMapArea);
  }
}

  return (
    <>
      <LoadScript
        // googleMapsApiKey="AIzaSyAnJyPunrxDLtm7Jz2Bcg-2XRdO1vvhVMo"
        // googleMapsApiKey="AIzaSyDYp1te-bQEhWE9P9yehRE3biB7LpSEh4U"
        
        googleMapsApiKey="AIzaSyCIBITLvj_8kao6e1r7ZyH1UYQm-1JMwoU"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onZoomChanged={handleZoomChanged}
          options={optionsMap}
        >
          {markerDataArea.map((dataarea) => {
            var url = '';
            var status = '';
            var city = '';

            if(dataarea.SITE_ID.substr(-3) == '132' ){
              city = 'MANDALIKA';
            }else if (dataarea.SITE_ID.substr(-3) == '242'){
              city = 'PRAYA';
            }else{
              city = 'MATARAM';
            }

            if(dataarea.CRITICAL > 0 ){
              url = '/wsbk-2023/paragames/SITE-CRITICAL.png';
              status = 'CRITICAL';
            }else if(dataarea.CAPACITY > 0 ){
              url = '/wsbk-2023/paragames/SITE-CAPACITY.png'
              status = 'CAPACITY';
            }else if(dataarea.QUALITY > 0 ){
              url = '/wsbk-2023/paragames/SITE-QUALITY.png'
              status = 'QUALITY';
            }else{
              url = '/wsbk-2023/paragames/SITE-NORMAL.png'
              status = 'NORMAL';
            }
            return (
              <Marker
                icon={{ url: url, size: {width: iconSize, height: iconSize}, anchor: {x: iconAnchor, y: iconAnchor}, scaledSize: {width: iconSize, height: iconSize}, }}
                key={dataarea.SITE_ID}
                position={{lat: parseFloat(dataarea.LATITUDE), lng: parseFloat(dataarea.LONGITUDE)}}
                onClick={() => handleShowModalInfoArea(city, "Site " + status + " " + city, parseFloat(dataarea.LATITUDE), parseFloat(dataarea.LONGITUDE), status)}
              >
                {activeMarker === dataarea.SITE_ID ? (
                  <InfoWindow onCloseClick={() => handleCloseMarker(center)}>
                    <div>{dataarea.SITE_ID}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            )
          })}

          {markerDataPoi.map((datapoi, index) => {
            var url = '/wsbk-2023/paragames/SITE-'+datapoi.STATUS+'.png';
            // console.log(datapoi)
            return (
              <Marker
                icon={{ url: url, size: {width: iconSize, height: iconSize}, anchor: {x: iconAnchor, y: iconAnchor}, scaledSize: {width: iconSize, height: iconSize}, }}
                key={index}
                position={{lat: parseFloat(datapoi.LATITUDE), lng: parseFloat(datapoi.LONGITUDE)}}
                onClick={() => handleShowModalInfoPoi(datapoi.SITE_ID, datapoi, datapoi.SITE_ID, parseFloat(datapoi.LATITUDE), parseFloat(datapoi.LONGITUDE), datapoi.STATUS)}
              >
                {activeMarker === datapoi.SITE_ID ? (
                  <InfoWindow onCloseClick={() => handleCloseMarker(center)}>
                    <div>{datapoi.SITE_ID}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            )
          })}

          {markerDataEngineer.map((dataengineer) => {
            var url = '/wsbk-2023//paragames/people.png';
            return (
              <Marker
                icon={{ url: url, size: {width: iconSize2, height: iconSize2}, anchor: {x: iconAnchor2, y: iconAnchor2}, scaledSize: {width: iconSize2, height: iconSize2}, }}
                key={dataengineer.username}
                position={{lat: parseFloat(dataengineer.latitude), lng: parseFloat(dataengineer.longitude)}}
                onClick={() => handleShowModalInfoEngineer(dataengineer.username, dataengineer, dataengineer.username, parseFloat(dataengineer.latitude), parseFloat(dataengineer.longitude))}
              >
                {activeMarker === dataengineer.username ? (
                  <InfoWindow onCloseClick={() => handleCloseMarker(center)}>
                    <div>{dataengineer.username}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            )
          })}
        </GoogleMap>
      </LoadScript>
      <ModalDetailArea data={areaDetailOnModal} visible={showModalArea} showModal={()=>handleCloseModalInfoArea(activeMarker, center)} city={cityArea} status={statusArea}/>
      <ModalDetailPoi data={poiDetailOnModal} visible={showModalPoi} showModal={()=>handleCloseModalInfoPoi(activeMarker, center)} status={statusPoi}/>
      <ModalDetailEngineer data={engineerDetailOnModal} visible={showModalEngineer} showModal={()=>handleCloseModalInfoEngineer(activeMarker, center)}/>
    </>
  )
}

const optionsMap = {
  mapTypeControl: false,
  minZoom: 4,
  maxZoom: 20,
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
      stylers: [{ visibility: 'off' }],
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
}


export default React.memo(MyComponent)