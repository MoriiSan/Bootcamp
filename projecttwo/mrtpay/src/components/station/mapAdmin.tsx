import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, ZoomControl } from 'react-leaflet';
import { Icon } from "leaflet";
import GetLatLng from "../getLatLng";
import { ReactNotifications, Store } from 'react-notifications-component';
import { BsExclamationTriangleFill, BsFillXSquareFill } from "react-icons/bs";
import Select from 'react-select';

interface Markers {
    _id: string;
    stationName: string;
    stationCoord: [number, number];
    stationConn: string[];
}

interface StationOption {
    value: string;
    label: string;
}

const customIcon = new Icon({
    iconUrl: "  https://cdn-icons-png.flaticon.com/512/821/821354.png ",
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

export const calculateDistance = (latlng1: { lat: number; lng: number }, latlng2: { lat: number; lng: number }) => {
    const R = 6371e3; // Earth's radius in meters
    const phi1 = (latlng1.lat * Math.PI) / 180;
    const phi2 = (latlng2.lat * Math.PI) / 180;
    const deltaPhi = ((latlng2.lat - latlng1.lat) * Math.PI) / 180;
    const deltaLambda = ((latlng2.lng - latlng1.lng) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
};

////////////////////////////////
////////////////////////////////
const MapAdmin = ({ onMapDoubleClick }: any) => {
    const [stations, setStations] = useState<Markers[]>([]);
    const [deleteStationModal, setDeleteStationModal] = useState(false);
    const [selectedStationName, setSelectedStationName] = useState<string>("");
    const [selectedLat, setSelectedLat] = useState<number>(0); 
    const [selectedLng, setSelectedLng] = useState<number>(0); 
    const [selectedConns, setSelectedConns] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState('');
    const [stationsOptions, setStationsOptions] = useState<StationOption[]>([]);
    const [editStationModal, setEditStationModal] = useState(false);

    const toggleEditStationModal = () => {
        setEditStationModal(!editStationModal);
    }

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
                const options = fetchedStations.map((station: { _id: string; stationName: string; }) => ({
                    value: station.stationName,
                    label: station.stationName,
                }));
                setStationsOptions(options);
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

    const handleDelete = async (stationName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/stations/delete-station/${stationName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const deleteStations = await response.json();
                Store.addNotification({
                    title: "DELETED!",
                    message: deleteStations.message,
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
                setEditStationModal(false);
                setSelectedId("");
            } else {
                console.error('Failed to delete station');
            }
        } catch (error) {
            console.error('Error deleting station:', error);
        }
    };

    const handleStationUpdate = async () => {
        const isWithin500m = selectedConns.some(conn => {
            const connectedStation = stations.find(station => station.stationName === conn);
            if (connectedStation) {
                const distance = calculateDistance(
                    { lat: Number(selectedLat), lng: Number(selectedLng) },
                    { lat: connectedStation.stationCoord[0], lng: connectedStation.stationCoord[1] }
                );
                return distance < 500;
            }
            return false;
        });

        if (isWithin500m) {
            console.error('Selected station is within 500m of a connected station');
            Store.addNotification({
                title: "OOPS!",
                message: 'Selected station is within 500m of a connected station',
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__bounceIn"],
                animationOut: ["animate__animated animate__slideOutRight"],
                dismiss: {
                    duration: 2000,
                }
            });
            return;
        }

        try {
            const updatedStationData = {
                stationId: selectedId,
                stationName: selectedStationName,
                stationCoord: [selectedLat, selectedLng],
                stationConn: selectedConns,
            };

            const response = await fetch(`http://localhost:8080/stations/update-station/${selectedId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStationData),
            });

            if (response.ok) {
                const updateStations = await response.json();
                Store.addNotification({
                    title: "UPDATED!",
                    message: updateStations.message,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
                setEditStationModal(false);
                fetchStations();
            } else {
                Store.addNotification({
                    title: "NO CHANGES",
                    message: "No changes in edit.",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            }
        } catch (error) {
            console.error('Error updating station:', error);
        }
    };


    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        onMapDoubleClick(latlng);
        setEditStationModal(false);
    };

    useEffect(() => {
        fetchStations();
    }, [onMapDoubleClick, deleteStationModal, editStationModal]);

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
                            setSelectedId(station._id);
                            setSelectedStationName(station.stationName);
                            setSelectedLat(station.stationCoord[0]);
                            setSelectedLng(station.stationCoord[1]);
                            setSelectedConns(station.stationConn);
                            setEditStationModal(true);
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
                                    onClick={() => handleDelete(selectedStationName)}
                                >Delete station!</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="edit-station">
                {editStationModal && (
                    <div className="edit-station-modal">
                        <div className="edit-indicator">Edit Station
                            <button className="edit-exit"
                                onClick={toggleEditStationModal}>
                                <BsFillXSquareFill />
                            </button>
                        </div>
                        <div className="edit-contents">
                            <label className="edit-station-label">Station name:
                                <input className="edit-station-name"
                                    value={selectedStationName}
                                    onChange={(e) => setSelectedStationName(e.target.value)}
                                    placeholder="Station name"></input>
                            </label>
                            <div className="edit-station-coords">
                                <label className="edit-lat-label">Latitude:
                                    <input className="edit-lat-coord"
                                        value={selectedLat?.toFixed(6)}
                                        onChange={(e) => setSelectedLat(parseFloat(e.target.value))}
                                        placeholder="Latitude"></input>
                                </label>
                                <label className="edit-long-label">Longitude:
                                    <input className="edit-long-coord"
                                        value={selectedLng?.toFixed(6)}
                                        onChange={(e) => setSelectedLng(parseFloat(e.target.value))}
                                        placeholder="Longitude"></input>

                                </label>
                            </div>
                            <div className="edit-connections">
                                <label className="edit-conns-label">Connections:</label>
                                <Select
                                    className="edit-connect-select"
                                    value={selectedConns.map(option => ({ value: option, label: option }))}
                                    onChange={(selectedOptions) => {
                                        if (Array.isArray(selectedOptions)) {
                                            const selectedValues = selectedOptions.map(option => option.value);
                                            setSelectedConns(selectedValues);
                                        } else {
                                            setSelectedConns([]);
                                        }
                                    }}
                                    placeholder="Select connections..."
                                    closeMenuOnSelect={true}
                                    isMulti
                                    //filter itself from the options
                                    options={stationsOptions.filter(option => option.value !== selectedStationName)} />

                            </div>
                        </div>
                        <div className="edit-station-btns">
                            <button className="edit-delete-btn"
                                onClick={toggleDeleteStationModal}
                            >Delete</button>
                            <button className="edit-station-btn"
                                onClick={handleStationUpdate}
                            >Save</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default MapAdmin;
