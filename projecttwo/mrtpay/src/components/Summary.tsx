import React from 'react';
import './summary.css';

const summary = () => {
    return(
        <div className='container'>
            <div className='text'>UID</div>
            <div className='text'>Balance</div>
            <div className='text'>Fare</div>
            <div className='text'>Total </div>
        </div>
    )
}

export default summary;