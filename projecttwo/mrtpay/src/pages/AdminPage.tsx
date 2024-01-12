import React from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';
import AddUser from '../components/uid/addUser';

const AdminPage = () => {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar></Navbar>
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
    </div>
  );
}

export default AdminPage;