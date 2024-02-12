import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './stations.css';
import { BsPencilSquare, BsXSquareFill } from "react-icons/bs";
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import MapAdmin, { calculateDistance } from './mapAdmin';

const animatedComponents = makeAnimated();


const Stations: React.FC = () => {
    const [fare, setFare] = useState<number>();
    const [newFare, setNewFare] = useState('');
    const [editFare, setEditFare] = useState(false);
    const [stationsOptions, setStationsOptions] = useState([]);
    const [addStationModal, setAddStationModal] = useState(false);
    const [stationName, setStationName] = useState('');
    const [connections, setConnections] = useState([]);

    const toggleAddStationModal = () => {
        setAddStationModal(!addStationModal);
        setStationName("");
        setConnections([]);
    };

    const toggleEditFare = () => {
        setEditFare(!editFare)
    };


    ///// DOUBLE CLICK FUNCTION | set coordinates
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();

    const handleMapDoubleClick = (latlng: { lat: number; lng: number }) => {
        // console.log('Map double-clicked:', latlng);
        setLatitude(latlng.lat)
        setLongitude(latlng.lng)
        toggleAddStationModal();
    };

    const handleCreateStation = async () => {

        try {
            const stationData = {
                stationName: stationName,
                stationCoord: [Number(latitude), Number(longitude)],
                stationConn: connections,
            };
            // Fetch existing stations to check distances
            const res = await fetch(`http://localhost:8080/stations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const existingStations = await res.json();
                const newStationLatLng = { lat: Number(latitude), lng: Number(longitude) };

                // Check distances between new station and existing stations
                const isWithin500m = connections.some(connection => {
                    const existingConnection = existingStations.find((station: { stationName: string; }) => station.stationName === connection);
                    if (existingConnection) {
                        const existingConnectionLatLng = { lat: existingConnection.latitude, lng: existingConnection.longitude };
                        const distance = calculateDistance(
                            { lat: newStationLatLng.lat, lng: newStationLatLng.lng },
                            { lat: existingConnection.stationCoord[0], lng: existingConnection.stationCoord[1] }
                        );
                        return distance < 500;
                    }
                    return false;
                });

                if (isWithin500m) {
                    console.error('Station cannot have connections closer than 500m');
                    Store.addNotification({
                        title: "OOPS!",
                        message: "Stations cannot have connections closer than 500 meters.",
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

                const response = await fetch(`http://localhost:8080/stations/create-station`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(stationData),
                });

                if (response.ok) {
                    const addStation = await response.json();
                    Store.addNotification({
                        title: "NEW STATION!",
                        message: addStation.message,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated animate__bounceIn"],
                        animationOut: ["animate__animated animate__slideOutRight"],
                        dismiss: {
                            duration: 2000,
                        }
                    });
                    setStationName('');
                    setConnections([]);
                    toggleAddStationModal();

                } else {
                    console.error('Failed to create station');
                    Store.addNotification({
                        title: "ERROR",
                        message: "Failed to create station.",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated animate__bounceIn"],
                        animationOut: ["animate__animated animate__slideOutRight"],
                        dismiss: {
                            duration: 2000,
                        }
                    });
                }
            } else {
                console.error('Failed to fetch existing stations');
            }
        } catch (error) {
            console.error('Error creating station:', error);
        }
    };

    const fetchStationOptions = async () => {
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
            } else {
                console.error('Failed to fetch stations');
            }
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    const fetchFare = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}adminConfigs/fareId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedFare = await response.json();
                setFare(fetchedFare[0].fareKm);
            } else {
                console.error('Failed to fetch fare');
            }
        } catch (error) {
            console.error('Error fetching fare:', error);
        }
    };

    const handleEditFare = async () => {
        const fareId = 1;
        const parsedNewFare = parseFloat(newFare);
        if (isNaN(parsedNewFare) || parsedNewFare <= 0) {
            console.error('Amount must be a positive number');
            Store.addNotification({
                title: "OOPS",
                message: "Fare must not be zero or negative.",
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
            const response = await fetch(`${process.env.REACT_APP_URL}adminConfigs/${fareId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fareKm: parsedNewFare }),
            });

            if (response.ok) {
                setFare(parsedNewFare)
                toggleEditFare();
                setNewFare('');
                Store.addNotification({
                    title: "NEW RATE!",
                    message: "Fare rate updated!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__bounceIn"],
                    animationOut: ["animate__animated animate__slideOutRight"],
                    dismiss: {
                        duration: 2000,
                    }
                });
            } else {
                console.error('Failed to update fare');
            }
        } catch (error) {
            console.error('Error updating fare', error);
        }
    };

    useEffect(() => {
        fetchFare();
        fetchStationOptions();
    }, [addStationModal]);

    return (
        <div>
            <div className="app-container">
                <ReactNotifications />
            </div>
            <div className="main-row">
                <div>
                    Stations
                </div>
                <div className="fare-container">
                    <label>Fare per KM:</label>
                    <div className="fare-value"><strong>{fare}</strong> PHP</div>
                </div>
                <button className="btn-edit-fare"
                    onClick={toggleEditFare}>
                    <BsPencilSquare size={22} /></button>
            </div>

            <div className='modal-container'>
                {editFare && (
                    <div className='add-load'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <div className="fare-details">
                                    <label className="fare-status">Fare per KM:
                                        <div className="fare-value2"> {fare} PHP</div>
                                    </label>
                                    <div className="edit-fare-container">
                                        <label className="fare-label">Amount:</label>
                                        <input className="edit-fare"
                                            type="number"
                                            value={newFare}
                                            onChange={(e) => setNewFare(e.target.value)}
                                            placeholder='Update amount'
                                            onKeyDown={(e) => {
                                                if (e.key === 'e' || e.key === 'E') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="fare-btns">
                                    <button className='btn-cancel'
                                        onClick={toggleEditFare}>
                                        Cancel
                                        <BsXSquareFill size={20} /></button>
                                    <button className="btn-generate"
                                        onClick={handleEditFare}>
                                        Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="map-container">
                <MapAdmin onMapDoubleClick={handleMapDoubleClick} />
            </div>

            <div className="add-station">
                {addStationModal && (
                    <div className="add-station-overlay">
                        <div className="add-station-modal">
                            <div className="add-station-indicator">Add station</div>
                            <div className="add-contents">
                                <label className="station-label">Station name:
                                    <input className="station-name"
                                        value={stationName}
                                        onChange={(e) => setStationName(e.target.value)}
                                        placeholder="Station name"></input>
                                </label>
                                <div className="station-coords">
                                    <label className="lat-label">Latitude:
                                        <input className="lat-coord"
                                            value={latitude !== undefined ? latitude.toFixed(6) : ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                setLatitude(isNaN(value) ? undefined : value);
                                            }}
                                            placeholder="Latitude"></input>
                                    </label>
                                    <label className="long-label">Longitude:
                                        <input className="long-coord"
                                            value={longitude !== undefined ? longitude.toFixed(6) : ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                setLongitude(isNaN(value) ? undefined : value);
                                            }}
                                            placeholder="Longitude"></input>

                                    </label>
                                </div>
                                <div className="connections">
                                    <label className="conns-label">Connections:</label>
                                    <Select
                                        className="connect-select"
                                        value={connections.map(option => ({ value: option, label: option }))}
                                        onChange={(selectedOptions) => {
                                            if (selectedOptions) {
                                                const selectedValues = selectedOptions.map(option => option.value);
                                                setConnections(selectedValues);
                                            } else {
                                                setConnections([]);
                                            }
                                        }}
                                        placeholder="Select connections..."
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        isMulti
                                        options={stationsOptions} />
                                </div>
                            </div>
                            <div className="add-station-btns">
                                <button className="cancel-btn"
                                    onClick={toggleAddStationModal}>Cancel</button>
                                <button className="add-station-btn"
                                    onClick={handleCreateStation}>Add Station</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="station-note">
                <div className="note-modal">

                </div>
            </div>

        </div>
    )
}

export default Stations;