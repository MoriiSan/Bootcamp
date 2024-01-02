import React, {useState} from 'react';
import { BsArrowLeftShort, BsFillTrainFrontFill, BsHash } from "react-icons/bs";

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

    const [open, setOpen] = useState(true);

    const sidebarStyle: React.CSSProperties = {
        backgroundColor: '#415b5c',
        height: '100svh',
        padding: '20px',
        position: 'relative',
        width: open ? '18rem' : '6rem',
        transition: 'width 0.3s ease',
    };

    const arrowStyle: React.CSSProperties = {
        backgroundColor: 'white',
        color: '#415b5c',
        fontSize: '30px',
        lineHeight: '36px',
        borderRadius: '50%',
        position: 'absolute',
        right: '-12px',
        top: '36px',
        border: '2px solid #415b5c',
        cursor: 'pointer',
        transform: !open ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease'
    };

    const logoStyle: React.CSSProperties = {
        backgroundColor: '#c69e24',
        color: '#415b5c',
        fontSize: '2.25rem',
        // lineHeight: '2.25rem',
        marginTop: '',
        marginRight: '0.5rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        display: 'inline-block',
        float: 'left',
        transform: open ? 'rotate(360deg)' : 'none',
        transition: 'transform 0.5s ease',
        padding: '0.5rem',
    };

    const logoTitle: React.CSSProperties = {
        color: '#e2edec',
        transformOrigin: 'left',
        fontWeight: '500',
        fontSize: '2rem',
        transform: !open ? 'scale(0)' : 'none',
        transition: 'transform 0.3s ease'
    };

    const borderStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.5rem',
        border: '2px solid #c69e24',
        marginTop: '1.5rem',
        paddingLeft: !open ? '0.875rem' : '1rem',
        paddingRight: !open ? '0.875rem' : '1rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
    };

    const hashStyle: React.CSSProperties = {
        color: '#c69e24',
        fontSize: '1.5rem',
        display: 'inline-block',
        float: 'left',
        cursor: 'pointer',
        marginRight: open ? '0.5rem' : '0',
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        width: '100%',
        color: '#e2edec',
        outline: 'none',
        display: open ? 'inline' : 'none',
    };

    return (
        <main className="flex">
            <div style={sidebarStyle}>
                <div style={arrowStyle} onClick={() => setOpen(!open)}><BsArrowLeftShort /></div>
                <div className="inline-flex">
                    <div style={logoStyle}><BsFillTrainFrontFill /></div>
                    <h1 style={logoTitle} >MRT</h1>
                </div>
                <div style={borderStyle}>
                    <div style={hashStyle}><BsHash /></div>
                    <input placeholder="type UID" style={inputStyle}></input>
                </div>
            </div>

            <div></div>

            <div className="p-7">
                <h1 className="text-2xl font-semibold">Home Page</h1>
            </div>
        </main>
    );
}

export default MRTPay;
