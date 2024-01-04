import React, {useState}  from 'react';
import { BsArrows } from "react-icons/bs";

export default function Card() {
    const [open] = useState(true);

    const cardStyle: React.CSSProperties = {
        backgroundColor: '#e2edec',
        display: 'flex',
        position: 'fixed',
        height: '40%',
        width: '32.1%',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        marginTop: '1.5rem',
        boxShadow: '2px 2px 6px #1a2424',
        zIndex: 1,
        bottom: '1.5rem',
        left: '1.35rem',
    };

    const innerCard: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        margin: '',
        backgroundColor: '#ccd4d4',
        borderRadius: '0.5rem',
        flexGrow: 1,
    }

    const rotatedIconStyle: React.CSSProperties = {
        height: '40%',
        width: '32.1%',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(90deg)',
      };

    return(
        <div style={cardStyle} className="flex flex-col">
            <div className="flex flex-row ">
                <div className="basis-1/2">
                    <div>UID</div>
                </div>
                <div className="basis-1/2">
                    <div className="flex flex-col">
                        <div>BAL</div>
                        <div>FARE</div>
                    </div>
                </div>
            </div>
            <div style={innerCard}>
                <div>FROM</div>
                <div>TO</div>
            </div>



            {/* <div style={rotatedIconStyle}>
                <BsArrows />
            </div> */}
            
                {/* <div>DISTANCE</div> */}
        </div>
    )
}