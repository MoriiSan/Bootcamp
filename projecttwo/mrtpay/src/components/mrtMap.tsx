import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Polyline, ZoomControl } from 'react-leaflet';
import { Icon, LeafletMouseEvent, LatLng } from "leaflet";
import './mrtMap.css';

interface Markers {
  shortName: string;
  stationName: string;
  stationCoord: [number, number];
  stationConns: [string];
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131502.png",
  iconSize: [30, 30]
})

// "https://cdn-icons-png.flaticon.com/512/3710/3710297.png" // human figure icon
// "https://cdn-icons-png.flaticon.com/512/1632/1632646.png" // red circle icon


// const markersData: Markers[] = [
//   { stationCoord: [14.537586, 121.001584], stationName: "Taft Avenue Station" },
//   { stationCoord: [14.541792, 121.019492], stationName: "Magallanes Station" },
//   { stationCoord: [14.549284, 121.028382], stationName: "Ayala Station" },
//   { stationCoord: [14.554704, 121.034607], stationName: "Buendia Station" },
//   { stationCoord: [14.567164, 121.045725], stationName: "Guadalupe Station" },
//   { stationCoord: [14.573350, 121.048010], stationName: "Boni Station" },
//   { stationCoord: [14.581043, 121.053381], stationName: "Shaw Boulevard Station" },
//   { stationCoord: [14.588188, 121.056797], stationName: "Ortigas Station" },
//   { stationCoord: [14.608052, 121.056486], stationName: "Santolan - Annapolis Station" },
//   { stationCoord: [14.635694, 121.043178], stationName: "GMA Kamuning Station" },
//   { stationCoord: [14.642488, 121.038715], stationName: "Quezon Avenue Station" },
//   { stationCoord: [14.651902, 121.032569], stationName: "North Avenue Station" }
// ];

// const polylinePositions: LatLng[] = markersData.map(marker => new LatLng(marker.stationCoord[0], marker.stationCoord[1]));

const handleMarkerMouseOver = (e: LeafletMouseEvent) => {
  e.target.openPopup();
};

function MrtMap() {

  const [stations, setStations] = useState<Markers[]>([]);

  const fetchStations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/stations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const fetchedStations = await response.json();
        console.log(fetchedStations)
        setStations(fetchedStations);
      } else {
        console.error('Failed to fetch stations');
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

//   const displayPolylines = (stations: Markers[]) => {
//     const polylines: JSX.Element[] = [];
//     const connections: Set<string> = new Set();

//     stations.forEach((station) => {
//       station.stationConns.forEach((stationConnected) => {
//         const direction = `${station.shortName}-${stationConnected}`;
//         const reverseDirection = `${stationConnected}-${station.shortName}`;

//         if (
//           !connections.has(direction) && !connections.has(reverseDirection) {
//           const stationConnectedData = stations.find(
//             (s) => String(s.shortName) === String(stationConnected)
//           );

//           if (stationConnectedData) {
//             polylines.push(
//               <Polyline
//                 key={direction}
//                 position={{ station.stationCoord, stationConnectedData.stationCoord }} />
//             );

//             connections.add(direction);
//             connections.add(reverseDirection);
//           }
//         }
//         )
//     })
//   })
//   return polylines;
// }


return (
  <div className="mrt-map-container">
    <MapContainer center={[14.537586, 121.001584]} zoom={15} scrollWheelZoom={true} minZoom={3} maxZoom={18} zoomControl={false}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline positions={stations.map((station) => new LatLng(station.stationCoord[0], station.stationCoord[1]))} color="red" weight={7} />

      <div className="rotateIcon">
        {stations.map((station, index) => (
          <Marker key={index} position={station.stationCoord} icon={customIcon} eventHandlers={{ mouseover: handleMarkerMouseOver }}>
            <Popup closeButton={false} className="custom-popup"> {station.stationName} </Popup>
          </Marker>
        ))}
      </div>
      <ZoomControl position="bottomright" />
    </MapContainer>
  </div>
)
}

export default MrtMap;