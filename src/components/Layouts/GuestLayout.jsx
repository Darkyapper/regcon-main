import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Asegúrate de importar Outlet
import NavbarLandingPage from '../Navbar/NavbarLandingPage';
import Footer from '../Footer/Footer';

const GuestLayout = () => {
  const location = useLocation();

 
  return (
    <div>
      <NavbarLandingPage />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
