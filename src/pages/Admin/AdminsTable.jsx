import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaSearch, FaUser, FaEnvelope, FaPhone, FaPlus, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    description: '',
    password: '',
    picture: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase.from('admin').select('*');
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los administradores',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        setAdmins(data);
      }
    };
    fetchAdmins();
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
        const { error } = await supabase.from('admin').delete().eq('id', id);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar al administrador',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setAdmins(admins.filter((admin) => admin.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El administrador ha sido eliminado correctamente',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (JSON.stringify(selectedAdmin) === JSON.stringify(admins.find((a) => a.id === selectedAdmin.id))) {
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

    const { error } = await supabase
      .from('admin')
      .update({
        first_name: selectedAdmin.first_name,
        last_name: selectedAdmin.last_name,
        email: selectedAdmin.email,
        phone: selectedAdmin.phone,
        description: selectedAdmin.description,
        picture: selectedAdmin.picture,
      })
      .eq('id', selectedAdmin.id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar al administrador',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setIsModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Administrador actualizado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
      const updatedAdmins = await supabase.from('admin').select('*');
      setAdmins(updatedAdmins.data);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newAdmin.first_name || !newAdmin.last_name || !newAdmin.email || !newAdmin.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos obligatorios',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newAdmin.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un correo electrónico válido',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newAdmin.password, salt);

    const { error } = await supabase.from('admin').insert([
      {
        ...newAdmin,
        password: hashedPassword,
      },
    ]);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar al administrador',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setIsAddModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Administrador agregado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
      const updatedAdmins = await supabase.from('admin').select('*');
      setAdmins(updatedAdmins.data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    setNewAdmin({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      description: '',
      password: '',
      picture: '',
    });
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Administradores Registrados</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-2/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] shadow transition duration-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-3 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaPlus className="mr-2" />
          Agregar Administrador
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">ID</th>
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Apellido</th>
              <th className="py-4 px-6 text-left font-semibold">Email</th>
              <th className="py-4 px-6 text-left font-semibold">Teléfono</th>
              <th className="py-4 px-6 text-left font-semibold">Imagen</th>
              <th className="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, index) => (
              <tr
                key={admin.id}
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
              >
                <td className="py-4 px-6">{admin.id}</td>
                <td className="py-4 px-6">{admin.first_name}</td>
                <td className="py-4 px-6">{admin.last_name}</td>
                <td className="py-4 px-6">{admin.email}</td>
                <td className="py-4 px-6">{admin.phone || 'N/A'}</td>
                <td className="py-4 px-6">
                  {admin.picture ? (
                    <img src={admin.picture} alt="Admin" className="w-12 h-12 object-cover rounded-full" />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
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

      {/* Modal para editar administrador */}
      {isModalOpen && selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Editar Administrador
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <input
                    type="text"
                    value={selectedAdmin.first_name}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, first_name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Apellido</label>
                  <input
                    type="text"
                    value={selectedAdmin.last_name}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, last_name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={selectedAdmin.email}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, email: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={selectedAdmin.phone || ''}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, phone: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={selectedAdmin.description || ''}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Imagen (URL)</label>
                  <input
                    type="text"
                    value={selectedAdmin.picture || ''}
                    onChange={(e) =>
                      setSelectedAdmin({ ...selectedAdmin, picture: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
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
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para agregar administrador */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Agregar Administrador
            </h3>
            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <input
                    type="text"
                    value={newAdmin.first_name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, first_name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Apellido</label>
                  <input
                    type="text"
                    value={newAdmin.last_name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, last_name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={newAdmin.phone || ''}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, phone: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={newAdmin.description || ''}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Imagen (URL)</label>
                  <input
                    type="text"
                    value={newAdmin.picture || ''}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, picture: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Contraseña</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, password: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsTable;
