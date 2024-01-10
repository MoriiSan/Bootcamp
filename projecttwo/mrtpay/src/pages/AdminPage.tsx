import React from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';
import SelectedRow from '../components/selectedRow';
import ListUsers from '../components/listUsers';

const AdminPage = () => {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar></Navbar>
        <SelectedRow></SelectedRow>
        <ListUsers></ListUsers>
    </div>
  );
}

export default AdminPage;