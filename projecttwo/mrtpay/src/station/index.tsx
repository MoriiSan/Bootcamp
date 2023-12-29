import React, { useState } from 'react';
import Navigation from '../../src/components/Navigation';
import {useLocation, useParams} from 'react-router-dom';
// import {stations} from '../../src/services/stations';

const Station = () => {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const stationId = searchParams.get('station_id');
    // const matchedStation = stations.find((station)=>station.id == Number(stationId))

    return (
        <div>
            <Navigation />
            <h1 className="text-3xl font-bold underline">
              {/* Welcome to station {matchedStation?.name}! */}
            </h1>
        </div>
    )
}
 
export default Station;