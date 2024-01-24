import { useState } from 'react';
import './stations.css'

const Stations = () => {
    const [fare, setFare] = useState<Fare[]>([]);
    interface Fare {
        fare: number;
    }

    const fetchFare = async () => {
        try {
            const response = await fetch(`http://localhost:8090/adminConfigs/fare`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const fetchedFare = await response.json();
                setFare(fetchedFare);
            } else {
                console.error('Failed to fetch fare');
            }
        } catch (error) {
            console.error('Error fetching fare:', error);
        }
    };

    return (
        <div>
            <div className="main-row">
                <div>
                    Stations
                </div>
                <div>Fare</div>
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