import React from "react";
import { FiFacebook, FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      {/* SVG de la curva en la parte superior */}
      <div className="relative">
        <svg
          viewBox="0 0 0 120"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#B14501"
            d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,90.7C672,75,768,85,864,112C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <footer className="bg-[#B14501] text-white py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección de Información */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Sobre RegCon</h2>
            <ul className="text-gray-100">
              <li className="mb-2">
                <Link to="/Acerca de" className="hover:text-white hover:border-b hover:border-white pb-1 transition-all duration-200">Acerca de Nosotros</Link>
              </li>
            </ul>
          </div>

          {/* Sección de Soporte */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Soporte</h2>
            <ul className="text-gray-100">
              <li className="mb-2">
                <Link to="/Contáctanos" className="hover:text-white hover:border-b hover:border-white pb-1 transition-all duration-200">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Sección Legal */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
            <ul className="text-gray-100">
              <li className="mb-2">
                <Link to="/Política de Privacidad" className="hover:text-white hover:border-b hover:border-white pb-1 transition-all duration-200">Política de Privacidad</Link>
              </li>
              <li className="mb-2">
                <Link to="/Términos y Condiciones" className="hover:text-white hover:border-b hover:border-white pb-1 transition-all duration-200">Términos y Condiciones</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior del Footer */}
        <div className="container mx-auto mt-8 border-t border-gray-300 pt-8 flex flex-col items-center">
          <p className="text-sm text-gray-100 mb-4">&copy; 2024 RegCon™. Todos los derechos reservados.</p>
          
          {/* Redes Sociales */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-100 hover:text-white transition-all duration-200">
              <FiFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-100 hover:text-white transition-all duration-200">
              <FiTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-100 hover:text-white transition-all duration-200">
              <FiInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-100 hover:text-white transition-all duration-200">
              <FiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
