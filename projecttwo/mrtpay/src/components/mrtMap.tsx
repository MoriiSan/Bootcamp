import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Polyline, ZoomControl } from 'react-leaflet';
import { Icon, LeafletMouseEvent  } from "leaflet";
import './mrtMap.css';

interface Markers {
  shortName: string;
  stationName: string;
  stationCoord: [number, number];
  stationConn: [string];
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131502.png",
  iconSize: [30, 30]
})

// "https://cdn-icons-png.flaticon.com/512/3710/3710297.png" // human figure icon
// "https://cdn-icons-png.flaticon.com/512/1632/1632646.png" // red circle icon


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

  const displayPolylines = (stations: Markers[]) => {
    const polylines: JSX.Element[] = [];
    const connections: Set<string> = new Set();
    console.log(stations)
    stations.forEach((station) => {
      station.stationConn.forEach((stationConnected) => {
        const direction = `${station.shortName}-${stationConnected}`;
        const reverseDirection = `${stationConnected}-${station.shortName}`;

        if (!connections.has(direction) && !connections.has(reverseDirection)) {
          const stationConnectedData = stations.find(
            (s) => String(s.shortName) === String(stationConnected)
          );

          if (stationConnectedData) {
            polylines.push(
              <Polyline
                key={direction}
                color="red"
                weight={5}
                positions={[
                  station.stationCoord,
                  stationConnectedData.stationCoord,
                ]}
              />
            );

            connections.add(direction);
            connections.add(reverseDirection);
          }
        }
      });
    });
    console.log(polylines)
    return polylines;
  };

  console.log(displayPolylines)


  return (
    <div className="mrt-map-container">
      <MapContainer center={[14.588188, 121.056797]} zoom={12.5} scrollWheelZoom={true} minZoom={3} maxZoom={18} zoomControl={false}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


        {stations.map((station, index) => (
          <Marker key={index} position={station.stationCoord as [number,number]} icon={customIcon} eventHandlers={{ mouseover: handleMarkerMouseOver }}>
            <Popup closeButton={false} className="custom-popup"> {station.stationName} </Popup>
          </Marker>
        ))}

        {/* <ZoomControl position="bottomright" /> */}

        {displayPolylines(stations)}

      </MapContainer>
    </div>
  );
}

export default MrtMap;