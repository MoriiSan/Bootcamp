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
 
//components
import Card from './components/card';

//pages
import App from './App';
import Login from './pages/Login';
import About from './pages/About';
import RootLayout from './components/rootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
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
