import React from "react";
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

function MrtMap() {
    return(
        <MapContainer center={[14.549046, 121.028217]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[14.549046, 121.028217]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )
}

export default MrtMap;