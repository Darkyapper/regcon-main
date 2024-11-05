import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarDash from '../Sidebars/SidebarDash';
import { FaUsers, FaCalendarAlt, FaTicketAlt, FaUsersCog } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';

const AdminLayout = () => {
  const [stats, setStats] = useState({
    usuarios: 0,
    eventos: 0,
    gruposTrabajo: 0,
    boletos: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const location = useLocation();
  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: usuarios } = await supabase.from('users').select('*', { count: 'exact' });
        const { data: eventos } = await supabase.from('events').select('*', { count: 'exact' });
        const { data: gruposTrabajo } = await supabase.from('workgroups').select('*', { count: 'exact' });
        const { data: boletos } = await supabase.from('tickets').select('*', { count: 'exact' });

        setStats({
          usuarios: usuarios.length,
          eventos: eventos.length,
          gruposTrabajo: gruposTrabajo.length,
          boletos: boletos.length,
        });
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    const fetchRecentUsers = async () => {
      try {
        const { data: recentUsers } = await supabase
          .from('users')
          .select('*')
          .order('registration_date', { ascending: false })
          .limit(5);

        setRecentUsers(recentUsers);
      } catch (error) {
        console.error('Error al obtener usuarios recientes:', error);
      }
    };

    fetchStats();
    fetchRecentUsers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarDash />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {isDashboard && (
          <div>
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-black">Panel de Control</h1>
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg border border-gray-300 shadow flex items-center">
                  <FiCalendar className="text-gray-600 mr-2" />
                  <span className="text-sm font-medium">{new Date().toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </header>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-500 text-white rounded shadow-lg transform transition-transform hover:scale-105 flex items-center">
                <FaUsers className="text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">Total de Usuarios</h2>
                  <p className="text-2xl font-bold">{stats.usuarios}</p>
                </div>
              </div>
              <div className="p-4 bg-green-500 text-white rounded shadow-lg transform transition-transform hover:scale-105 flex items-center">
                <FaCalendarAlt className="text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">Total de Eventos</h2>
                  <p className="text-2xl font-bold">{stats.eventos}</p>
                </div>
              </div>
              <div className="p-4 bg-purple-500 text-white rounded shadow-lg transform transition-transform hover:scale-105 flex items-center">
                <FaUsersCog className="text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">Total de Grupos</h2>
                  <p className="text-2xl font-bold">{stats.gruposTrabajo}</p>
                </div>
              </div>
              <div className="p-4 bg-orange-500 text-white rounded shadow-lg transform transition-transform hover:scale-105 flex items-center">
                <FaTicketAlt className="text-4xl mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">Total de Boletos</h2>
                  <p className="text-2xl font-bold">{stats.boletos}</p>
                </div>
              </div>
            </div>

            {/* Tabla de usuarios recientes */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-black">Usuarios Registrados Recientemente</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md border">
                  <thead className="bg-[#EB6D1E] text-white">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold">Nombre</th>
                      <th className="py-4 px-6 text-left font-semibold">Apellido</th>
                      <th className="py-4 px-6 text-left font-semibold">Email</th>
                      <th className="py-4 px-6 text-left font-semibold">Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-4 px-6">{user.first_name}</td>
                        <td className="py-4 px-6">{user.last_name}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">{new Date(user.registration_date).toLocaleDateString('es-ES')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
