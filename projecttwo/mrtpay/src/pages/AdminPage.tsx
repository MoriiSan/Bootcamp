import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';
// import './AdminPage.css';

const AdminPage = () => {
  return (
    <div /* className="flex flex-col bg-gray-100 h-screen" */>
      <Navbar></Navbar>
      <div>
        <Outlet />
        {/* <div className="admin-welcome">
          <div className='welcome-text'>WELCOME TO</div>
          <div className='mrt-text'>MRT SYSTEM</div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminPage;