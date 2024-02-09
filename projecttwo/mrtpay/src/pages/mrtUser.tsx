import React from 'react';
import './mrtUser.css';
import SideBar from '../components/sideBar';
import Card from '../components/card';
import MrtMap from '../components/mrtMap';

const MrtUser = () => {

    return (
        <main className="mrt-user">
            {/* <SideBar></SideBar> */}
            {/* <Card></Card> */}


            <div className="mrt-map">
                <MrtMap/>
            </div>


        </main>
    );
}

export default MrtUser;

