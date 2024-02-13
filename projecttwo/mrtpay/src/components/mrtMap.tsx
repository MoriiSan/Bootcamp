import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { Icon, popup } from "leaflet";
import { IoEnterOutline } from "react-icons/io5";
import { RiUserLocationLine, RiArrowGoBackFill } from "react-icons/ri";
import { ReactNotifications, Store } from 'react-notifications-component';
import { calculateDistance } from "./station/mapAdmin";
import GetLatLng from "./getLatLng";
import MapFly from './mapFly';
import './mrtMap.css';
import { AnyNsRecord } from "dns";


interface Markers {
    _id: string;
    stationName: string;
    stationCoord: [number, number];
    stationConn: string[];
}

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4551/4551380.png",
    //#0091ea
    iconSize: [50, 50]
})
const selectedIcon = new Icon({
    iconUrl: "   https://cdn-icons-png.flaticon.com/512/5216/5216456.png ",
    iconSize: [80, 80]
});

const MyMarker = ({ position, children, onClick, eventHandlers, isSelected }: any) => {
    const [adjustedPosition, setAdjustedPosition] = useState<[number, number]>(position);

    useEffect(() => {
        // Adjust the latitude when the station is selected
        if (isSelected) {
            setAdjustedPosition([position[0] + 0.0034, position[1]]);
        } else {
            setAdjustedPosition([position[0] + 0.002, position[1]]);
        }
    }, [isSelected, position]);

    return (
        <Marker position={adjustedPosition} icon={isSelected ? selectedIcon : customIcon}
            eventHandlers={eventHandlers}>
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
    const [uidInput, setUidInput] = useState('');
    const [uid, setUid] = useState<number | null>(null);
    const [bal, setBal] = useState<number | null>(null);
    const [submit, setSubmit] = useState(false);
    // const [doNavigate, setDoNavigate] = useState(false);

    const toggleSubmitOff = () => {
        setSubmit(false);
        setUidInput("");
        navigate('/mrt');
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

    const fetchCard = async () => {
        if (uidInput.trim() === "") {
            console.error('UID is blank');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/cards/${uidInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const { uid, bal } = await response.json();
                setUid(uid);
                setBal(bal);
                setSubmit(true)
            } else {
                console.error('UID does not exist');
                setUid(null);
                setBal(null);
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
                                color="#204491"
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

    const navigate = useNavigate();
    const handleTapIn = (stationName: string, tapState: string) => {
        const url = `/mrt/${stationName}/${tapState}`;
        navigate(url);
    };
    const handleTapInClick = () => {
        if (selectedStation) {
            const tapState = 'In';
            handleTapIn(selectedStation.stationName, tapState);
            fetchCard();
        }
    };

    useEffect(() => {
        fetchStations();
    }, [onClick]);
    useEffect(() => {
        navigate('/mrt');
        toggleSubmitOff();
    }, []);

    return (
        <div className="map-container" onClick={() => { }}>
            <MapContainer center={[14.596108, 120.984860]}
                zoom={13} scrollWheelZoom={true} minZoom={12}
                maxZoom={17} zoomControl={false} style={{ height: '100svh' }}
                doubleClickZoom={false}>
                <TileLayer
                    url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=Rs3yx5aveNteEw7myffiDtutSEcX3b0zdHPWxOQbMjJyX6vCRNe4ZYLts8ya6wOI"
                    attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
                />

                {stations.map((station, index) => (
                    <MyMarker key={index}
                        position={[station.stationCoord[0], station.stationCoord[1]]}
                        isSelected={selectedStation === station}
                        eventHandlers={{
                            click: () => setSelectedStation(station)
                        }}
                    >
                        {station.stationName}
                    </MyMarker>
                ))}

                {displayPolylines(stations)}
                <MapFly station={selectedStation} zoom={12} />

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
                                            placeholder="Input UID"
                                            type="number"
                                            value={uidInput}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const onlyNums = input.replace(/[^0-9]/g, '');
                                                const limitedNums = onlyNums.slice(0, 10);
                                                setUidInput(limitedNums);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'e' || e.key === 'E') {
                                                    e.preventDefault();
                                                }
                                            }}>
                                        </input>
                                    </div>
                                    <div className="tapState-btns">
                                        <div className="tapIn"
                                            onClick={handleTapInClick}
                                        >Tap In</div>
                                        <div className="tapOut">Tap Out</div>
                                    </div>
                                </>
                            )}

                            {submit && (
                                <>
                                    <div className="user-card">
                                        <div className="cancel-submit"
                                            onClick={toggleSubmitOff}
                                        >
                                            <RiArrowGoBackFill size={20} />
                                        </div>
                                        <div className="uid-display">{uid}
                                            <div className="uid-text">UID</div>
                                        </div>
                                        <div className="balance-display">
                                            <div className="bal-text">BALANCE</div>
                                            {`PHP ${bal}`}</div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            )}

            <div className="sample-container">
                <div className="sample"></div>
            </div>

        </div>
    );
}

export default MrtMap;
