import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaCheckCircle, FaSearch, FaUser, FaEnvelope, FaPhone, FaPlus, FaLock } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import './UserTable.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los usuarios',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el usuario',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado correctamente',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOriginalUser({ ...user });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birthday: '',
      password: '',
    });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser.first_name || !selectedUser.last_name || !selectedUser.email || (isAddMode && !selectedUser.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos obligatorios deben ser completados',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(selectedUser.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un correo electrónico válido',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (!isAddMode && JSON.stringify(selectedUser) === JSON.stringify(originalUser)) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se hizo ningún cambio en los datos',
        timer: 3000,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
      return;
    }

    let payload = {
      first_name: selectedUser.first_name,
      last_name: selectedUser.last_name,
      email: selectedUser.email,
      phone: selectedUser.phone,
      birthday: selectedUser.birthday,
    };

    if (isAddMode) {
      // Hashear la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(selectedUser.password, salt);
      payload = { ...payload, password: hashedPassword }; // Agregar la contraseña hasheada al payload
    }

    const { error } = isAddMode
      ? await supabase.from('users').insert([payload])
      : await supabase.from('users').update(payload).eq('id', selectedUser.id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el usuario',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setIsModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: `Usuario ${isAddMode ? 'agregado' : 'actualizado'} correctamente`,
        timer: 3000,
        showConfirmButton: false,
      });
      const { data } = await supabase.from('users').select('*');
      setUsers(data); // Actualizar la lista de usuarios
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Usuarios Registrados</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-2/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500 shadow"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddUser}
          className="px-4 py-3 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaPlus className="mr-2" />
          Agregar Usuario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Apellido</th>
              <th className="py-4 px-6 text-left font-semibold">Email</th>
              <th className="py-4 px-6 text-left font-semibold">Teléfono</th>
              <th className="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
              >
                <td className="py-4 px-6">{user.first_name}</td>
                <td className="py-4 px-6">{user.last_name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.phone || 'N/A'}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="mr-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              {isAddMode ? 'Agregar Usuario' : 'Editar Usuario'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={selectedUser.first_name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Apellido</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={selectedUser.last_name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Teléfono</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={selectedUser.phone || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Fecha de Nacimiento</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={selectedUser.birthday || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, birthday: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    />
                  </div>
                </div>
                {isAddMode && (
                  <div className="md:col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Contraseña</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        value={selectedUser.password || ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                        className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  {isAddMode ? 'Agregar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
