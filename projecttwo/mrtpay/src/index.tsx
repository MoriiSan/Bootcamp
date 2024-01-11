import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
} from "react-router-dom";

 
//pages
import App from './App';
import Login from './pages/Login';
import About from './pages/About';
import AdminPage from './pages/AdminPage';
import Users from './components/users';
import Stations from './components/stations';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<AdminPage />}>
        <Route path="users"  element={<Users />} />
        <Route path="stations" element={<Stations />} />
      </Route>
    </>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
