import React from 'react';
import './App.css';
import MrtMap from './components/mrtMap';
import SideBar from './components/sideBar';

const MRTPay = () => {

    const UID = 123456789;
    const Bal = 500;
    const Fare = 13;
    const distance = 11;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;

    const mapContainer: React.CSSProperties = {
        // backgroundColor: '#ffffff',
        // height: '93.3svh',
        width: '100%',
    };

    return (
        <main className="flex bg-custom-light-green">
            <SideBar></SideBar>
            <div style={mapContainer}>
                <MrtMap/>
            </div>
        </main>
    );
}

export default MRTPay;

