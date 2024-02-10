import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
// import useSwr from "swr";
// import useSupercluster from "use-supercluster";
import { Icon, popup } from "leaflet";
import GetLatLng from "./getLatLng";
import { ReactNotifications, Store } from 'react-notifications-component';
import { calculateDistance } from "./station/mapAdmin";
import './mrtMap.css';
import { IoEnterOutline } from "react-icons/io5";
import { RiUserLocationLine, RiArrowGoBackFill } from "react-icons/ri";


interface Markers {
    _id: string;
    stationName: string;
    stationCoord: [number, number];
    stationConn: string[];
}

const customIcon = new Icon({
    iconUrl: "   https://cdn-icons-png.flaticon.com/512/10308/10308895.png ",
    // https://cdn-icons-png.flaticon.com/512/10312/10312894.png 
    // https://cdn-icons-png.flaticon.com/512/10308/10308856.png 
    iconSize: [30, 30]
})

const MyMarker = ({ position, children, onClick, eventHandlers }: any) => {
    return (
        <Marker position={position} icon={customIcon}
            eventHandlers={eventHandlers}
        >

        </Marker>
    );
};

////////////////////////////////
////////////////////////////////
const MrtMap = ({ onClick }: any) => {
    const [stations, setStations] = useState<Markers[]>([]);
    const [selectedStation, setSelectedStation] = useState<Markers | null>(null);
    const [selectedStationName, setSelectedStationName] = useState<string>("");
    const [selectedLat, setSelectedLat] = useState<number>(0);
    const [selectedLng, setSelectedLng] = useState<number>(0);
    const [selectedConns, setSelectedConns] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState('');
    const [cards, setCards] = useState();
    const [uid, setUid] = useState();
    const [bal, setBal] = useState();
    const [submit, setSubmit] = useState(false);
    const [mapCenter, setMapCenter] = useState([14.595322, 121.018737])

    const toggleSubmit = () => {
        setSubmit(!submit);
    }

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

    const fetchCards = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedCards = await response.json();
                setCards(fetchedCards);
            } else {
                console.error('Failed to fetch cards');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const displayPolylines = (stations: Markers[]) => {
        const polylines: JSX.Element[] = [];
        const connections: Set<string> = new Set();
        stations.forEach((station) => {
            station.stationConn.forEach((stationConnected) => {
                const direction = `${station.stationName}-${stationConnected}`;
                const reverseDirection = `${stationConnected}-${station.stationName}`;

                if (!connections.has(direction) && !connections.has(reverseDirection)) {
                    const stationConnectedData = stations.find(
                        (s) => String(s.stationName) === String(stationConnected)
                    );

                    if (stationConnectedData) {
                        polylines.push(
                            <Polyline
                                key={direction}
                                color="#303030"
                                weight={6}
                                positions={[
                                    station.stationCoord,
                                    stationConnectedData.stationCoord,
                                ]} />);
                        connections.add(direction);
                        connections.add(reverseDirection);
                    }
                }
            });
        });
        return polylines;
    };


    useEffect(() => {
        fetchStations();
    }, [onClick]);

    return (
        <div className="map-container" onClick={() => { }}>
            <MapContainer center={[14.596108, 120.984860]}
                zoom={13} scrollWheelZoom={true} minZoom={12}
                maxZoom={17} zoomControl={false} style={{ height: '100svh' }}
                doubleClickZoom={false}>
                <TileLayer
                    url="https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=Rs3yx5aveNteEw7myffiDtutSEcX3b0zdHPWxOQbMjJyX6vCRNe4ZYLts8ya6wOI"
                    attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
                />

                {stations.map((station, index) => (
                    <MyMarker key={index}
                        position={station.stationCoord}
                        eventHandlers={{
                            click: () => setSelectedStation(station)
                        }}
                    >
                        {station.stationName}
                    </MyMarker>
                ))}

                {displayPolylines(stations)}

            </MapContainer>

            {selectedStation && (
                <div>

                    <div className="tapState-prompt">
                        <div className="tapState-indicator"></div>
                        <div className="tapState-container">
                            <div className="tapState-station">
                                <RiUserLocationLine />
                                {selectedStation?.stationName.toUpperCase()}
                                {/* STATION NAME */}
                            </div>

                            {!submit && (
                                <>
                                    <div className="uid-input-container">
                                        <div className="uid-label">UID:</div>
                                        <input className="uid-input"
                                            placeholder="Input UID">
                                        </input>
                                    </div>
                                    <div className="uid-submit"
                                        onClick={toggleSubmit}
                                    >Submit</div>
                                </>
                            )}

                            {submit && (
                                <>
                                    <div className="user-card">
                                        <div className="cancel-submit"
                                            onClick={toggleSubmit}
                                        >
                                            <RiArrowGoBackFill size={20} />
                                        </div>
                                        <div className="uid-display">1234567890
                                            <div className="uid-text">UID</div>
                                        </div>
                                        <div className="balance-display">
                                            <div className="bal-text">BALANCE</div>
                                            PHP 89</div>
                                    </div>
                                </>
                            )}

                        </div>
                        {submit && (
                            <>
                                <div className="tapState-btns">
                                    <div className="tapIn"
                                    >Tap In</div>
                                    <div className="tapOut">Tap Out</div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}

export default MrtMap;
