import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarHome from '../Navbar/NavbarHome';
import Footer from '../Footer/Footer';

const AuthenticatedLayout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div>
      <NavbarHome setIsAuthenticated={setIsAuthenticated} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
