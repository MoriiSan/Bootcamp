import React from 'react';
import { VscArrowSmallLeft } from "react-icons/vsc";
import './App.css';
import MrtMap from './components/mrtMap';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
// import NavBar from './components/navBar';
import trainLogo from './trainLogo.png';
>>>>>>> Stashed changes

=======
// import NavBar from './components/navBar';
// import trainLogo from './trainLogo.png';
>>>>>>> Stashed changes


const MRTPay = () => {
    const UID = 123456789;
    const Bal = 500;
    const Fare = 13;
    const distance = 11;
    const loc = "Ayala Station";
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;

    return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="map-container">
            <MrtMap/>
            <div className="objects">
                <div className="LOGO font-sans text-8xl font-bold text-black absolute left-12 top-6">MRT</div>
                <div className="LOGO font-sans text-xl absolute left-20 top-28">put LOGO here</div>
                <div className= "flex flex-wrap flex-col absolute top-20 right-48 place-items-center"> 
                    <div className="currentLoc font-sans text-6xl "> You are currently in</div>
                    <div className="font-sans text-6xl font-black">{loc}</div>
                </div>
                <div className="CARD w-96 h-56 bg-white rounded-lg drop-shadow-lg fixed bottom-5 right-5 ">
=======
        <div className="bg-color relative h-screen">
            <div  className="map-container w-4/6 h-fit bg-white rounded-lg drop-shadow-lg absolute right-0 m-6 ">
                <MrtMap/>
            </div>
            <div className="flex z-0">
                <div className="NAVBAR w-3/12 h-svh bg-teal-900 rounded-r-2xl drop-shadow-lg "></div>
                <div className="flex flex-col">
                    <div className="topBar h-56 w-3/12 bg-teal-950 rounded-tr-2xl absolute left-0 top-0 flex justify-center items-center">
                        <img src={trainLogo} className="absolute left-0 top-2" alt="train logo"></img>
                        <div className= "LOCATION flex flex-wrap flex-col place-items-center"> 
                            <div className="currentLoc font-sans text-2xl text-yellow-600"> You are currently in</div>
                            <div className="font-sans text-5xl font-black text-white italic">{loc}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="UI flex flex-col absolute left-5 grid gap-4 z-10">
                {/* <div className="LOGO font-sans text-8xl font-bold text-black absolute right-48 top-6">MRT</div>
                <div className="LOGO font-sans text-xl absolute right-60 top-28">put LOGO here</div> */}
                <input className="UID w-96 h-14 bg-teal-50 rounded-lg drop-shadow-lg" placeholder="UID"></input>
                <div className="CARD w-96 h-56 bg-teal-50 rounded-lg drop-shadow-lg">
>>>>>>> Stashed changes
                    <div className="bg-gradient-to-r from-indigo-500"></div>
                    <div className="firstLine p-3 flex justify-between pb-0">
                        <div className='text1 font-semibold'>UID {UID}</div>
                        <div className='container w-40 h-6 bg-lime-400 rounded-lg'>
                            <div className='text2 font-normal text-black px-2'>BALANCE: {Bal} PHP </div>
                        </div>
                    </div>
                    <div className="secondLine p-3 flex justify-between pb-0">
                        <div className='text4 font-semibold'>You traveled {distance} KM </div>
                        <div className='container w-40 h-6 bg-amber-400 rounded-lg'>
                            <div className='text3 font-normal text-black px-2'>FARE: {Fare} PHP</div>
                        </div>
                    </div>
                    <div className="thirdLine p-6 flex justify-between pb-0">
                        <div className="text5 font-normal">{formattedDate}</div>
                    </div>
                </div>
            </div>
        </div>
=======
        <main className="flex">
            <div className="bg-custom-dark-green h-screen p-5 pt-8 w-72 relative">
            {/* <VscArrowSmallLeft className="bg-white text-custom-dark-green text-3xl rounded-full 
            absolute -right-3 top-9 border border-custom-dark-green cursor-pointer"/> */}
            Sidebar</div>
            <div className="p-7">
                <h1 className="text-2xl font-semibold">Home Page</h1>
            </div>
        </main>
>>>>>>> Stashed changes
    );
}

export default MRTPay;
