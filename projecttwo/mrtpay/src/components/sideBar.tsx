import React, {useState}  from 'react';
import { BsArrowLeftShort, BsFillTrainFrontFill, BsHash, BsPinMapFill } from "react-icons/bs";

const SideBar = () => {
    const [open, setOpen] = useState(true);
    const loc = "Taft Avenue".toUpperCase();

    const sidebarStyle: React.CSSProperties = {
        backgroundColor: '#3b5555',
        borderRadius: '0 0.5rem 0.5rem 0',
        height: '100svh',
        padding: '20px',
        position: 'relative',
        width: open ? '33.3%' : '6rem',
        transition: 'width 0.3s ease',
    };

    const arrowStyle: React.CSSProperties = {
        backgroundColor: '#e2edec',
        color: '#3b5555',
        fontSize: '30px',
        lineHeight: '36px',
        borderRadius: '50%',
        position: 'absolute',
        right: '-12px',
        top: '36px',
        border: '2px solid #3b5555',
        cursor: 'pointer',
        transform: !open ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease',
        zIndex: 1,
    };

    const logoStyle: React.CSSProperties = {
        backgroundColor: '#d7a30f',
        color: '#415b5c',
        fontSize: '2.25rem',
        marginTop: '',
        marginRight: '0.5rem',
        borderRadius: '0.5rem',
        display: 'inline-block',
        float: 'left',
        transform: open ? 'rotate(360deg)' : 'none',
        transition: 'transform 0.5s ease',
        padding: '0.5rem',
    };

    const logoTitle: React.CSSProperties = {
        color: '#e2edec',
        transformOrigin: 'left',
        fontWeight: '700',
        fontSize: '2rem',
        transform: !open ? 'scale(0)' : 'none',
        transition: 'transform 0.3s ease'
    };

    const locationStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection:'column',
        flex: '1 0 100%',
        alignItems: 'center',
        backgroundColor: '#546b6c',
        borderRadius: '0.5rem',
        marginTop: '0.1rem',
        paddingLeft: !open ? '0.875rem' : '1rem',
        paddingRight: !open ? '0.875rem' : '1rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        fontSize: '1.5rem',
        fontWeight: '800', 
        color: '#d7a30f',
        transform: !open ? 'rotate(360deg)' : 'none',
        transition: 'transform 0.3s ease',
    }

    const borderStyle: React.CSSProperties = {
        display: 'flex',
        flex: '1 0 100%',
        alignItems: 'center',
        borderRadius: '0.5rem',
        border: '2px solid #d7a30f',
        // marginTop: '1.5rem',
        paddingLeft: !open ? '0.875rem' : '1rem',
        paddingRight: !open ? '0.875rem' : '1rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        cursor: 'pointer',
        transform: !open ? 'rotate(360deg)' : 'none',
        transition: 'transform 0.3s ease',
    };

    const hashStyle: React.CSSProperties = {
        color: '#d7a30f',
        fontSize: '1.5rem',
        cursor: 'pointer',
        marginRight: open ? '0.5rem' : '0',
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        fontSize: '1.2rem',
        fontWeight: '500',
        width: '100%',
        color: '#e2edec',
        outline: 'none',
        display: open ? 'inline' : 'none',
    };

    const buttonStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 100%',
        opacity: open ? 1 : 0,
        transition: 'opacity 0.3s ease',
        
    };

    const resetButtonStyle: React.CSSProperties = {
        backgroundColor: '#e2edec',
        borderRadius: '0.5rem 0 0 0.5rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        paddingLeft: '0.875rem',
        paddingRight: '0.875rem',
        
    };
    
    const submitButtonStyle: React.CSSProperties = {
        backgroundColor: '#d7a30f',
        borderRadius: '0 0.5rem 0.5rem 0',
        borderLeft: '1px solid #415b5c',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        paddingLeft: '0.875rem',
        paddingRight: '0.875rem',
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: '#e2edec',
        display: 'flex',
        position: 'fixed',
        height: open ? '30%' : '40%',
        width: open ? '22.1%' : '32.1%',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        marginTop: '1.5rem',
        boxShadow: '2px 2px 6px #1a2424',
        zIndex: 1,
        bottom: '1.5rem',
        left: '1.35rem',
        transition: 'height 0.3s linear, width 0.3s linear',
    };

    return(
        <div style={sidebarStyle}>
        <div style={arrowStyle} onClick={() => setOpen(!open)}><BsArrowLeftShort /></div>
        <div className="inline-flex">
            <div style={logoStyle}><BsFillTrainFrontFill /></div>
            <h1 style={logoTitle} >MRT</h1>
        </div>
        <div className="flex-container">
        <div style={locationStyle}>
            {open ? (
                <>
                    Welcome to {loc}
                </>
            ) : (
                <div style={hashStyle} onClick={() => setOpen(!open)}><BsPinMapFill /></div>
            )}
        </div>
            <div style={borderStyle}>
                <div style={hashStyle} onClick={() => setOpen(!open)}><BsHash /></div>
                <input placeholder="UID" style={inputStyle}></input>
            </div>
            <div style={buttonStyle}>
                {open && (
                    <>
                        <button style={resetButtonStyle}>Reset</button>
                        <button style={submitButtonStyle}>Submit</button>
                    </>
                )}
            </div>
        </div>


        <div style={cardStyle} className="flex flex-col">
            <div>UID</div>
            <div>BAL</div>
            <div>FARE</div>
            <div>DISTANCE</div>
        </div>
    </div>
    )   
    
}

export default SideBar;