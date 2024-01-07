import './navbar.css'
import { BsTrainFront } from 'react-icons/bs';

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="logo-layout">
                    <BsTrainFront size={30}></BsTrainFront>
                    <div className="logo-name"> MRT</div>     
                </div>
                <div className="options">
                    <div className="cards">Cards</div>
                    <div className="stations">Stations</div>
                </div>
                <div className="logout">Logout</div>
            </div>
        </div>
      );
    }

export default Navbar;