import React from 'react';
import './App.css';
import MrtMap from './components/mrtMap';
import SideBar from './components/sideBar';
import Card from './components/card';

const MRTPay = () => {

    const mapContainer = {
        // backgroundColor: '#ffffff',
        // height: '93.3svh',
        width: '100%',
    };

    return (
        <main className="flex bg-custom-light-green">
            <SideBar></SideBar>
            <Card></Card>
            <div style={mapContainer}>
                <MrtMap/>
            </div>
        </main>
    );
}

export default MRTPay;

