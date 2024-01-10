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
import RootLayout from './components/rootLayout';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="adminpage" element={<AdminPage />} />
      <Route path="mainpage" element={<App />} />
      <Route path="about" element={<About />} />
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
