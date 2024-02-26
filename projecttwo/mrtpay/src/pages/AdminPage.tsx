import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div /* className="flex flex-col bg-gray-100 h-screen" */>
      <Navbar></Navbar>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;