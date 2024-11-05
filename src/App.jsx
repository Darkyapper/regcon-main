import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos'; // Importar AOS
import 'aos/dist/aos.css'; // Importar los estilos de AOS

import GuestLayout from './components/Layouts/GuestLayout';
import AuthenticatedLayout from './components/Layouts/AuthenticatedLayout';
import AdminLayout from './components/Layouts/AdminLayout';

import Landing from './pages/LandingPage'; 
import Login from './components/Modals/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserManual from './pages/UserManual';
import Demo from './pages/Demo';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolice';
import TermsAndConditions from './pages/TermsAndConditions';
import LocalInstallationGuide from './pages/LocalInstallationGuide';
import Price from './pages/Price';
import PasswordRecovery from './pages/PasswordRecovery';
import EventDetailPage from './pages/Users/EventDetailPage';
import LoadingLogin from './pages/LoadingLogin';
import TicketsDetailPage from './pages/Users/TicketsDetailsPage';

import UsersTable from './pages/Admin/UserTable';
import TicketsPage from './pages/Admin/TicketsPage';
import EventsTable from './pages/Admin/EventsTable';
import WorkgroupsTable from './pages/Admin/WorksgroupsTable';
import AdminsTable from './pages/Admin/AdminsTable';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true, // La animación se ejecuta solo una vez
    });
  }, []); // Este useEffect se ejecuta una vez al montar el componente

  return (
    <Router>
      <Routes>
        {/* Ruta de Loading para inicio o cierre de sesión */}
        <Route path="/Cargando" element={<LoadingLogin setIsAuthenticated={setIsAuthenticated} />} />

        {/* Rutas para usuarios no autenticados */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Landing />} /> {/* Página de inicio */}
          <Route path="/Iniciar Sesión" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Registro" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Recuperar Contraseña" element={<PasswordRecovery />} />
          <Route path="/Manual De Usuario" element={<UserManual />} />
          <Route path="/Solicitar Demo" element={<Demo />} />
          <Route path="/Descargar" element={<LocalInstallationGuide />} />
          <Route path="/Precio" element={<Price />} />
          <Route path="/Acerca de" element={<AboutUs />} />
          <Route path="/Contáctanos" element={<ContactUs />} />
          <Route path="/Política de Privacidad" element={<PrivacyPolicy />} />
          <Route path="/Términos y Condiciones" element={<TermsAndConditions />} />
        </Route>

        {/* Rutas para usuarios autenticados */}
        {isAuthenticated && (
          <Route element={<AuthenticatedLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/Inicio" element={<Home />} />
            <Route path="/Detalles de Evento/:eventId" element={<EventDetailPage />} />
            <Route path="/Mis Boletos" element={<TicketsDetailPage />} />
            <Route path="/Acerca de" element={<AboutUs />} />
            <Route path="/Contáctanos" element={<ContactUs />} />
            <Route path="/Política de Privacidad" element={<PrivacyPolicy />} />
            <Route path="/Términos y Condiciones" element={<TermsAndConditions />} />
          </Route>
        )}

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="Usuarios" element={<UsersTable />} />
          <Route path="Boletos" element={<TicketsPage />} />
          <Route path="Eventos" element={<EventsTable />} />
          <Route path="Grupos de trabajo" element={<WorkgroupsTable />} />
          <Route path="Administradores" element={<AdminsTable />} />
        </Route>

        {/* Redirección para rutas no definidas */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a Landing si no coincide */}
      </Routes>
    </Router>
  );
}

export default App;
