import React, {useState}  from 'react';
import { BsArrowLeftShort, BsFillTrainFrontFill, BsHash, BsPinMapFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const loc = "Taft Avenue".toUpperCase();
    const [isHovered, setIsHovered] = useState(false);

    const sidebarStyle: React.CSSProperties = {
        width: open ? '33.3%' : '6rem',
    };

    const arrowStyle: React.CSSProperties = {
        transform: !open ? 'rotate(180deg)' : 'none',
    };

    const logoStyle: React.CSSProperties = {
        transform: open ? 'rotate(360deg)' : 'none',
    };

    const logoTitle: React.CSSProperties = {
        transform: !open ? 'scale(0)' : 'none',
    };

    const locationStyle: React.CSSProperties = {
        paddingLeft: !open ? '0.875rem' : '1rem',
        paddingRight: !open ? '0.875rem' : '1rem',
        transform: !open ? 'rotate(360deg)' : 'none',

    }

    const borderStyle: React.CSSProperties = {
        paddingLeft: !open ? '0.875rem' : '1rem',
        paddingRight: !open ? '0.875rem' : '1rem',
        transform: !open ? 'rotate(360deg)' : 'none',
    };

    const hashStyle: React.CSSProperties = {
        marginRight: open ? '0.5rem' : '0',
    };

    const inputStyle: React.CSSProperties = {
        display: open ? 'inline' : 'none',
    };

    const buttonStyle: React.CSSProperties = {
        opacity: open ? 1 : 0,
    };
    
    const submitButtonStyle: React.CSSProperties = {
        backgroundColor: isHovered ? '#e2edec' : '#dfb53f',
    };

    return(
        <div style={sidebarStyle} className="sidebar">
            <div style={arrowStyle} className="arrow" onClick={() => setOpen(!open)}><BsArrowLeftShort /></div>
            <div className="inline-flex">
                <div style={logoStyle} className="logo"><BsFillTrainFrontFill /></div>
                <h1 style={logoTitle} className="logo-title">MRT</h1>
            </div>
            <div className="flex-container">
            <div style={locationStyle} className="location">
                {open ? (
                    <div>
                    Welcome to <br />
                    {loc}
                </div>
                ) : (
                    <div className="cursor-pointer" onClick={() => setOpen(!open)}><BsPinMapFill /></div>
                )}
            </div>
                <div style={borderStyle} className="border-input">
                    <div style={hashStyle} className="hash" onClick={() => setOpen(!open)}><BsHash /></div>
                    <input placeholder="UID" style={inputStyle} className="input"></input>
                </div>
                <div style={buttonStyle} className="button">
                    {open && (
                        <>
                            <button className="reset-button">Reset</button>
                            <button style={submitButtonStyle} className="submit-button"
                                    onMouseEnter={() => setIsHovered(true)} 
                                    onMouseLeave={() => setIsHovered(false)}>Submit</button>
                        </>
                    )}
                </div>
            </div>
    </div>
    )   
    
}

export default SideBar;