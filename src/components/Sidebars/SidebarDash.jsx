import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaTicketAlt,
  FaCalendarAlt,
  FaUsersCog,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';

const SidebarDash = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const handleLogout = () => {
    navigate('/Cargando', { state: { actionType: 'logout' } });
    setIsAuthenticated(false);
  };

  const navItems = [
    { path: '/admin', label: 'Panel Principal', icon: <FaTachometerAlt /> },
    { path: '/admin/Usuarios', label: 'Usuarios', icon: <FaUser /> },
    { path: '/admin/Boletos', label: 'Tickets', icon: <FaTicketAlt /> },
    { path: '/admin/Eventos', label: 'Eventos', icon: <FaCalendarAlt /> },
    { path: '/admin/Grupos de Trabajo', label: 'Grupos de Trabajo', icon: <FaUsersCog /> },
    { path: '/admin/Administradores', label: 'Administradores', icon: <FaUsers /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <img src="/src/assets/images/Logo.png" alt="Logo" className="h-8 mr-2" />
        <span className="text-xl font-bold"></span>
      </div>

      {/* Menú de navegación */}
      <ul className="mt-6 space-y-2 flex-1">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded transition-all duration-300 ${
                activePath === item.path
                  ? 'bg-[#EB6D1E] text-white'
                  : 'hover:bg-[#EB6D1E] hover:text-white'
              }`}
            >
              <span
                className={`mr-3 transition-colors duration-300 ${
                  activePath === item.path
                    ? 'text-white'
                    : 'text-[#EB6D1E] hover:text-white'
                }`}
              >
                {item.icon}
              </span>
              <span className="transition-colors duration-300">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Línea separadora */}
      <div className="border-t border-gray-600 mt-2 mb-2"></div>

      {/* Opción de Cerrar sesión */}
      <ul>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full rounded transition-all duration-300 hover:bg-red-600 hover:text-white"
          >
            <FaSignOutAlt className="mr-3 transition-colors duration-300 text-[#EB6D1E] hover:text-white" />
            <span className="transition-colors duration-300">Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};


export default SidebarDash;
