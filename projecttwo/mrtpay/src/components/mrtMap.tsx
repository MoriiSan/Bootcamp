import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Polyline, ZoomControl} from 'react-leaflet';
import { Icon, LeafletMouseEvent, LatLng } from "leaflet";
import './mrtMap.css';

interface MarkerData {
  position: [number, number];
  popupContent: string;
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131502.png",
  iconSize: [30,30]
})

// "https://cdn-icons-png.flaticon.com/512/3710/3710297.png" // human figure icon
// "https://cdn-icons-png.flaticon.com/512/1632/1632646.png" // red circle icon

const markersData: MarkerData[] = [
  { position: [14.537586, 121.001584], popupContent: "Taft Avenue" },
  { position: [14.541792, 121.019492], popupContent: "Magallanes" },
  { position: [14.549284, 121.028382], popupContent: "Ayala" },
  { position: [14.554704, 121.034607], popupContent: "Buendia" },
  { position: [14.567164, 121.045725], popupContent: "Guadalupe" },
  { position: [14.573350, 121.048010], popupContent: "Boni" },
  { position: [14.581043, 121.053381], popupContent: "Shaw Boulevard" },
  { position: [14.588188, 121.056797], popupContent: "Ortigas" },
  { position: [14.608052, 121.056486], popupContent: "Santolan" },
  { position: [14.619147, 121.051306], popupContent: "Araneta Center-Cubao" },
  { position: [14.635694, 121.043178], popupContent: "GMA Kamuning" },
  { position: [14.642488, 121.038715], popupContent: "Quezon Avenue" },
  { position: [14.651902, 121.032569], popupContent: "North Avenue" }
];

const polylinePositions: LatLng[] = markersData.map(marker => new LatLng(marker.position[0], marker.position[1]));

const handleMarkerMouseOver = (e: LeafletMouseEvent) => {
  e.target.openPopup();
};

function MrtMap() {
    return(
      <div className="mrt-map-container">
        <MapContainer center={[14.537586, 121.001584]} zoom={15} scrollWheelZoom={true} minZoom={3} maxZoom={18} zoomControl={false}>
          {/* <div className="map-overlay absolute top-0 left-0 w-full h-20vh bg-gradient-to-b from-transparent to-white pointer-events-none"></div> */}
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Polyline positions={polylinePositions} color="red" weight={7}/>

          <div className="rotateIcon">
            {markersData.map((marker, index) => (
              <Marker key={index} position={marker.position} icon={customIcon} eventHandlers={{ mouseover: handleMarkerMouseOver }}>
                <Popup closeButton={false} className="custom-popup"> {marker.popupContent} </Popup>
              </Marker>
            ))}
          </div>
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
      )
}

export default MrtMap;