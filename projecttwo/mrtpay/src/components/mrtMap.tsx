import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { Icon, popup } from "leaflet";
import { IoEnterOutline } from "react-icons/io5";
import { RiUserLocationLine, RiArrowGoBackFill } from "react-icons/ri";
import { ReactNotifications, Store } from 'react-notifications-component';
import { calculateDistance } from "./station/mapAdmin";
import GetLatLng from "./getLatLng";
import { haversine } from './calcDistance';
import MapFly from './mapFly';
import './mrtMap.css';
import { Edge, Graph, Path, alg } from 'graphlib';


interface Markers {
    _id: string;
    stationName: string;
    stationCoord: [number, number];
    stationConn: string[];
}

interface Cards {
    uid: number;
    bal: number;
    tapState: string
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
    const [uidInput, setUidInput] = useState('');
    const [uid, setUid] = useState<number | null>(null);
    const [submit, setSubmit] = useState(false);
    const [graph, setGraph] = useState<Graph | null>(null);
    const [cutTicket, setCutTicket] = useState(true);


    /* TAP IN /////////////// */
    const [tapState, setTapState] = useState('');


    /* TAP OUT ///////////// */
    const [ticket, setTicket] = useState(false);
    const [fare, setFare] = useState<number>(0);
    const [initialBal, setInitialBal] = useState<number>(0);
    const [finalBal, setFinalBal] = useState<number>(0);
    const [stationIn, setStationIn] = useState('');
    const [stationOut, setStationOut] = useState('');


    const navigate = useNavigate();
    const tapInUrl = (stationName: string, tapState: string) => {
        const url = `/mrt/${stationName}/${tapState}`;
        navigate(url);
    };
    const tapOutUrl = (stationName: string, tapState: string) => {
        const url = `/mrt/${stationName}/${tapState}`;
        navigate(url);
    };

    const toggleSubmitOff = () => {
        setSubmit(false);
        setTicket(false);
        setUidInput("");
        navigate('/mrt');
    }

    const leaveStation = () => {
        // Add animation class to ticket-bottom before leaving
        setCutTicket(false);

        setTimeout(() => {
            setSubmit(false);
            setTicket(false);
            setUidInput("");
            navigate('/mrt');
            setSelectedStation(null);

            setCutTicket(true);
        }, 2000);
    };

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
        try {
            const response = await fetch(`http://localhost:8080/cards/${uidInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedCard = await response.json();
                setInitialBal(fetchedCard.bal)
            } else {
                console.error('Failed to fetch cards');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const tapIn = async () => {
        if (uidInput.trim() === "") {
            console.error('UID is blank');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/cards/tapIn/${uidInput}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tapState: selectedStation?.stationName })
            });

            if (response.ok) {
                const card = await response.json();
                setUid(card.uid);
                setInitialBal(card.bal);
                setTapState(card.tapState)
                setSubmit(true)
                if (selectedStation) {
                    tapInUrl(selectedStation.stationName, 'In');
                    console.log('TAP IN SUCCESS!')
                    return;
                }
            } else {
                console.log('NO EXIT')
                return;
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };


    const getFare = async () => {
        try {
            const response = await fetch(`http://localhost:8080/adminConfigs/fareId?=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedFare = await response.json();
                setFare(fetchedFare.fareKm)
                return (fetchedFare.fareKm)
            } else {
                console.error('Failed to fetch fare');
            }
        } catch (error) {
            console.error('Error fetching fare:', error);
        }
    }


    const tapOut = async () => {
        if (uidInput.trim() === "") {
            console.error('UID is blank');
            return;
        }

        let fareX = await getFare();

        try {
            const finalBal = initialBal - fareX;
            const response = await fetch(`http://localhost:8080/cards/tapOut/${uidInput}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bal: finalBal, tapState: '' })
            });

            if (response.ok) {
                const card = await response.json();
                setFinalBal(card.bal - fareX)
                setTapState('')
                setStationIn(card.tapState)
                setStationOut(selectedStation ? selectedStation.stationName : '');
                setSubmit(false)
                setTicket(true)
                // console.log(finalBal)
                if (selectedStation) {
                    tapOutUrl(selectedStation.stationName, 'Out');
                    console.log('TAP OUT SUCCESS!')
                    return;
                }
            } else {
                setUid(null);
                setInitialBal(0);
                return;
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }

    const handleTapIn = () => {
        tapIn();
    };
    const handleTapOut = () => {
        tapOut();
    }

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
    const linesTraveled = (stations: Markers[], initialStation: Markers, finalStation: Markers) => {
        const polylines: JSX.Element[] = [];
        const connections: Set<string> = new Set();

        initialStation.stationConn.forEach((stationConnected) => {
            const direction = `${initialStation.stationName}-${stationConnected}`;
            const reverseDirection = `${stationConnected}-${initialStation.stationName}`;

            if (!connections.has(direction) && !connections.has(reverseDirection)) {
                const stationConnectedData = stations.find(
                    (s) => s.stationName === stationConnected
                );

                if (stationConnectedData && stationConnectedData.stationName === finalStation.stationName) {
                    polylines.push(
                        <Polyline
                            key={direction}
                            color="#204491"
                            weight={6}
                            positions={[
                                initialStation.stationCoord,
                                stationConnectedData.stationCoord,
                            ]}
                        />
                    );
                    connections.add(direction);
                    connections.add(reverseDirection);
                }
            }
        });

        return polylines;
    };


    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    // const buildGraph = () => {
    //     const g = new Graph();
    //     stations.forEach(Markers => {
    //         Markers.stationConn.forEach(connections => {
    //             g.setEdge(Markers.stationName, connections, calculateDistance(Markers, stations.find(s => s.stationName === connections)));
    //         });
    //     });
    //     setGraph(g);
    // };

    // const displayShortestPath = () => {
    //     if (!graph || !stationIn || !stationOut) return null;
    //     const path: { [node: string]: Edge[] } = {};
    //     const shortestPath = alg
    //         .dijkstra(graph, stationIn, undefined, (v) => path[v])
    //         .map((stationName: string) => stations.find(station => station.stationName === stationName)?.stationCoord)
    //         .filter(Boolean);

    //     return (
    //         <Polyline
    //             positions={shortestPath}
    //             color="red"
    //             weight={6}
    //         />
    //     );
    // };

    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    useEffect(() => {
        fetchStations();
        navigate('/mrt');
        toggleSubmitOff();
    }, []);

    return (
        <div className="map-container" onClick={() => { }}>
            <MapContainer center={[14.593795, 120.931320]}
                zoom={12} scrollWheelZoom={true} minZoom={12}
                maxZoom={14} zoomControl={false} style={{ height: '100svh' }}
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
                            click: () => (setSelectedStation(station), toggleSubmitOff())
                        }}>
                        {/* {station.stationName} */}
                        <Popup>{station.stationName}</Popup>
                    </MyMarker>
                ))}

                {displayPolylines(stations)}
                {/* {linesTraveled(stations, stationIn, finalStation)} */}

                <MapFly station={selectedStation} zoom={12} />

            </MapContainer>

            {selectedStation !== null && (
                <div>
                    {!ticket && (
                        <div className="tapState-prompt">
                            <div className="tapState-indicator"></div>
                            <div className="tapState-container">
                                <div className="tapState-station">
                                    <RiUserLocationLine />
                                    {selectedStation?.stationName.toUpperCase()}
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
                                                onClick={handleTapIn}
                                            >Tap In</div>
                                            <div className="tapOut"
                                                onClick={handleTapOut}>Tap Out</div>
                                        </div>
                                    </>
                                )}

                                {submit && (
                                    <>
                                        <div className="user-card">
                                            <img className="tapCard-icon"
                                                src="https://cdn-icons-png.flaticon.com/512/674/674896.png ">
                                            </img>
                                            <div className="cancel-submit"
                                                onClick={toggleSubmitOff}
                                            >
                                                <RiArrowGoBackFill size={20} />
                                            </div>
                                            <div className="uid-display">
                                                <div className="uid-text"></div>
                                                <div className="uid-value">{uid}</div>

                                            </div>
                                            <div className="balance-display">
                                                <div className="bal-text">BALANCE</div>
                                                <div className="bal-value">{`PHP ${initialBal}`}</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    )}


                </div>
            )}



            {/* ticket ///////////////// */}
            {ticket && (
                <div className={`ticket-container ${ticket ? 'show' : ''}`}>
                    <div className={cutTicket ? "ticket-top show" : "ticket-top"}>
                        <div className="another-inner-top">
                            <div className="ticket-uid-label">UID
                                <div className="ticket-uid"><strong>{uid}</strong></div>
                            </div>
                            <div className="ticket-bal-label">BALANCE
                                <div className="ticket-bal"><strong> PHP {initialBal}</strong></div>
                            </div>
                        </div>
                        <div className="inner-top">
                            <div className="initial-station-label">Depart</div>
                            <div className="initial-station">{stationIn}</div>
                            <img className="line-direction"
                                src="https://cdn-icons-png.flaticon.com/512/2473/2473536.png "></img>
                            <div className="final-station-label">Arrive</div>
                            <div className="final-station">{stationOut}</div>
                        </div>
                    </div>
                    <div className="ticket-bottom"
                        onClick={leaveStation}>
                        <div className="inner-bottom">
                            <div className="inner-bottom-left">
                                <div className="distance-label">Distance traveled</div>
                                <div className="new-bal-label">new balance {finalBal}</div>
                            </div>
                            <div className="inner-bottom-right">
                                <div className="ticket-fare-label">-{fare}PHP</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MrtMap;
