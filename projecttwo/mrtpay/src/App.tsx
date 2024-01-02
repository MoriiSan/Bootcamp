import React from 'react';
import { VscArrowSmallLeft } from "react-icons/vsc";
import './App.css';
import MrtMap from './components/mrtMap';
// import NavBar from './components/navBar';
// import trainLogo from './trainLogo.png';


const MRTPay = () => {
    const UID = 123456789;
    const Bal = 500;
    const Fare = 13;
    const distance = 11;
    const loc = "Ayala Station";
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;

    return (
        <main className="flex">
            <div className="bg-custom-dark-green h-screen p-5 pt-8 w-72 relative">
            {/* <VscArrowSmallLeft className="bg-white text-custom-dark-green text-3xl rounded-full 
            absolute -right-3 top-9 border border-custom-dark-green cursor-pointer"/> */}
            Sidebar</div>
            <div className="p-7">
                <h1 className="text-2xl font-semibold">Home Page</h1>
            </div>
        </main>
    );
}

export default MRTPay;
