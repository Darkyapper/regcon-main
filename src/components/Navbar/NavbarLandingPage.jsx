import React, { useState, useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";
import Login from "../Modals/Login";
import AOS from 'aos';
import 'aos/dist/aos.css';

const NavbarLandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const checkScrollTop = () => {
    setShowScroll(window.pageYOffset > 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);
  

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full z-10 bg-gradient-to-b from-gray-300" data-aos="fade-down">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img src="/src/assets/images/LogoNegro.png" className="h-8" alt="Logo RegCon" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black"></span>
          </a>

          {/* Right section with buttons */}
          <div className="flex md:order-2 space-x-3">
            <button
              type="button"
              className="text-black border border-gray-400  rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#EB6D1E] hover:text-white transition-colors duration-300"
              onClick={openLoginModal}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-black rounded-lg md:hidden hover:bg-[#C65A1E] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-300"
              aria-controls="navbar-cta"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* Menú de navegación */}
          <div
            className={`${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 md:opacity-100 md:max-h-full"}
              overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out md:flex items-center justify-between w-full md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 md:flex-row md:mt-0">
              <li>
                <a href="/" className="block py-2 px-3 md:p-2 text-gray-600 transition-all duration-600 hover:bg-[#C65A1E] hover:text-white rounded-md">
                  Inicio
                </a>
              </li>
              <li>
                <a href="Manual De Usuario" className="block py-2 px-3 md:p-2 text-gray-600 transition-all duration-600 hover:bg-[#C65A1E] hover:text-white rounded-md">
                  ¿Cómo funciona?
                </a>
              </li>
              <li>
                <a href="/Precio" className="block py-2 px-3 md:p-2 text-gray-600 transition-all duration-600 hover:bg-[#C65A1E] hover:text-white rounded-md">
                  Precio
                </a>
              </li>
              <li>
                <a
                  href="/Descargar"
                  className="block py-2 px-3 md:p-2 text-gray-600 transition-all duration-600 hover:bg-[#C65A1E] hover:text-white rounded-md"
                >
                  Descargar
                  <FiArrowDown className="inline-block ml-2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal de Login */}
      {isLoginOpen && (
        <Login isOpen={isLoginOpen} onClose={closeLoginModal} />
      )}
    </div>
  );
};

export default NavbarLandingPage;
