import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, ZoomControl } from 'react-leaflet';
import { Icon } from "leaflet";
import GetLatLng from "../getLatLng";
import { Store } from "react-notifications-component";
import { BsExclamationTriangleFill } from "react-icons/bs";


interface Markers {
    shortName: string;
    stationName: string;
    stationCoord: [number, number];
    stationConn: [string];
}

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2062/2062051.png",
    iconSize: [40, 40]
})

const MyMarker = ({ position, children, onDoubleClick }: any) => {
    const handleDoubleClick = () => {
        onDoubleClick();
    };

    return (
        <Marker position={position} icon={customIcon} eventHandlers={{ dblclick: handleDoubleClick }}>
            <Popup closeButton={false} className="custom-popup">{children}</Popup>
        </Marker>
    );
};

interface StationsProps {
    onMapDoubleClick: (latlng: { lat: number; lng: number }) => void;
    onDeleteStation: (shortName: string) => void;
}

////////////////////////////////
////////////////////////////////
const MapAdmin = ({ onMapDoubleClick, onDeleteStation }: any) => {
    const [stations, setStations] = useState<Markers[]>([]);
    const [deleteStationModal, setDeleteStationModal] = useState(false);
    const [selectedShortName, setSelectedShortName] = useState<string>("");
    const [selectedStationName, setSelectedStationName] = useState<string>("");

    const toggleDeleteStationModal = () => {
        setDeleteStationModal(!deleteStationModal);
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



    const displayPolylines = (stations: Markers[]) => {
        const polylines: JSX.Element[] = [];
        const connections: Set<string> = new Set();
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
                                color="#204491"
                                weight={6}
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
        return polylines;
    };

    const handleDelete = async (shortName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/stations/delete-station/${shortName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.error("Station deleted successfully!")
                Store.addNotification({
                    title: "DELETED!",
                    message: "Station deleted successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
                toggleDeleteStationModal();
            } else {
                console.error('Failed to delete station');
            }
        } catch (error) {
            console.error('Error deleting station:', error);
        }
    };

    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        onMapDoubleClick(latlng);
    };

    useEffect(() => {
        fetchStations();
    }, [onMapDoubleClick, deleteStationModal]);


    return (
        <div className="map-container" onDoubleClick={() => { }}>
            <MapContainer center={[14.537586, 121.001584]}
                zoom={14} scrollWheelZoom={true} minZoom={10}
                maxZoom={18} zoomControl={false} style={{ height: '83svh' }}
                doubleClickZoom={false}
            >

                <TileLayer
                    url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=Rs3yx5aveNteEw7myffiDtutSEcX3b0zdHPWxOQbMjJyX6vCRNe4ZYLts8ya6wOI"
                    attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
                />

                {stations.map((station, index) => (
                    <MyMarker key={index}
                        position={station.stationCoord}
                        onDoubleClick={() => {
                            setSelectedShortName(station.shortName);
                            setSelectedStationName(station.stationName)
                            toggleDeleteStationModal();
                        }}>
                        {station.stationName}

                    </MyMarker>
                ))}

                {displayPolylines(stations)}
                <GetLatLng onDoubleClick={handleMapClick} />
            </MapContainer>

            <div className="delete-station">
                {deleteStationModal && (
                    <div className="delete-station-overlay">
                        <div className="delete-station-modal">
                            <div className="delete-indicator"></div>
                            <div className="delete-contents">
                                <div className="delete-icon">
                                    <BsExclamationTriangleFill size={50} />
                                </div>
                                <div className="delete-label">
                                    <label><strong>Delete {selectedStationName.toUpperCase()}?</strong></label>
                                    <label>You won't be able to revert this!</label>
                                </div>
                            </div>
                            <div className="delete-btns">
                                <button className="cancel-delete-btn"
                                    onClick={toggleDeleteStationModal}>Cancel</button>
                                <button className="delete-station-btn"
                                    onClick={() => handleDelete(selectedShortName)}
                                >Delete station!</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* <div className="edit-station">
                <div className="edit-station-overlay">
                    <div className="edit-station-modal">
                        <div className="edit-station-label"><strong>STATION NAME</strong></div>
                        <div className="edit-station-btns">
                            <div className="edit-station-btn">Edit</div>
                            <div className="delete-modal-btn">Delete</div>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    );
}

export default MapAdmin;
