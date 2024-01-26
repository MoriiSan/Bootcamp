import { useEffect, useState } from 'react';
import './stations.css'
import { BsPencilSquare, BsXSquareFill } from "react-icons/bs";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

const Stations: React.FC = () => {
    const [initialFare, setInitialFare] = useState<number>();
    const [fare, setFare] = useState<number>();
    const [newFare, setNewFare] = useState('');
    const [editFare, setEditFare] = useState(false);

    const toggleEditFare = () => {
        setEditFare(!editFare)
    };


    const fetchFare = async () => {
        try {
            const response = await fetch(`http://localhost:8080/adminConfigs/fareId`, {
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
            const response = await fetch(`http://localhost:8080/adminConfigs/${fareId}`, {
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
    }, []);

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
                                            placeholder='Update amount'></input>
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
            <div className="list">
                <div>
                    List of Stations
                </div>
            </div>
        </div>
    )
}

export default Stations;