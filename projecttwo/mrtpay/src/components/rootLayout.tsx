// rootLayout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="RootLayout">
      <header>
        <nav>
          <h1>ROOTLAYOUT</h1>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/mainpage">Main Page</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
