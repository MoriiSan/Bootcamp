import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import { Icon } from "leaflet";
// import './mrtMap.css';

function MrtMap() {
    const customIcon = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131502.png",
      iconSize: [30,30]
    })

    // "https://cdn-icons-png.flaticon.com/512/1632/1632646.png" // red circle icon

    return(
      <div className="mrt-map-container">
        <MapContainer center={[14.541792, 121.019492]} zoom={15} scrollWheelZoom={true} minZoom={3} maxZoom={19}>
          {/* <div className="map-overlay absolute top-0 left-0 w-full h-20vh bg-gradient-to-b from-transparent to-white pointer-events-none"></div> */}
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <div className="rotateIcon">
              <Marker position={[14.537586, 121.001584]} icon={customIcon}>
                <Popup>Taft Avenue</Popup></Marker>
              <Marker position={[14.541792, 121.019492]} icon={customIcon}>
                <Popup>Magallanes</Popup></Marker> 
              <Marker position={[14.549284, 121.028382]} icon={customIcon}>
                <Popup>Ayala</Popup></Marker> 
              <Marker position={[14.554704, 121.034607]} icon={customIcon}>
                <Popup>Buendia</Popup></Marker> 
              <Marker position={[14.567164, 121.045725]} icon={customIcon}>
                <Popup>Guadalupe</Popup></Marker> 
              <Marker position={[14.573350, 121.048010]} icon={customIcon}>
                <Popup>Boni</Popup></Marker> 
              <Marker position={[14.581043, 121.053381]} icon={customIcon}>
                <Popup>Shaw Boulevard</Popup></Marker> 
              <Marker position={[14.588188, 121.056797]} icon={customIcon}>
                <Popup>Ortigas</Popup></Marker> 
              <Marker position={[14.608052, 121.056486]} icon={customIcon}>
                <Popup>Santolan</Popup></Marker> 
              <Marker position={[14.619147, 121.051306]} icon={customIcon}>
                <Popup>Araneta Center-Cubao</Popup></Marker> 
              <Marker position={[14.635694, 121.043178]} icon={customIcon}>
                <Popup>GMA Kamuning</Popup></Marker> 
              <Marker position={[14.642488, 121.038715]} icon={customIcon}>
                <Popup>Quezon Avenue</Popup></Marker> 
              <Marker position={[14.651902, 121.032569]} icon={customIcon}><Popup>Magallanes</Popup>
                <Popup>North Avenue</Popup></Marker> 
              </div>
            <ZoomControl position="bottomleft" />
        </MapContainer>
        </div>
      )
}

export default MrtMap;