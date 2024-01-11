import './navbar.css'
import { BsTrainFront } from 'react-icons/bs';
import {useAuth} from '../middlewares/authentication';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isStationHovered, setIsStationHovered] = useState(false);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);

    const cardStyle = {
        color: !isCardHovered ? 'black' : '#FBC034',
        
    };
    const stationStyle = {
        color: !isStationHovered ? 'black' : '#FBC034',
        
    };
    
    const {logout} = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    return (
        <div>
            <div className="navbar">
                <div className="logo-layout">
                    <BsTrainFront size={30}></BsTrainFront>
                    <div className="logo-name"> MRT</div>     
                </div>
                    <div className="options">
                        <div className="cards"
                                style={cardStyle}
                                onMouseEnter={() => setIsCardHovered(true)} 
                                onMouseLeave={() => setIsCardHovered(false)}
                                ><NavLink to="users">Cards</NavLink>                               
                                </div>
                        <div className="stations"
                                style={stationStyle}
                                onMouseEnter={() => setIsStationHovered(true)} 
                                onMouseLeave={() => setIsStationHovered(false)}
                                ><NavLink to="stations">Stations</NavLink>
                                </div>
                    </div>
                <div className="logout"
                        onMouseEnter={() => setIsLogoutHovered(true)} 
                        onMouseLeave={() => setIsLogoutHovered(false)}
                        onClick={handleLogout} >Logout</div>
            </div>
        </div>
      );
    }

export default Navbar;