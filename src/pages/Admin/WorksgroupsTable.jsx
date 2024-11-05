import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const WorkgroupsTable = () => {
  const [workgroups, setWorkgroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkgroup, setSelectedWorkgroup] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWorkgroup, setNewWorkgroup] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchWorkgroups = async () => {
      const { data, error } = await supabase.from('workgroups').select('*');
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los grupos de trabajo',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        setWorkgroups(data);
      }
    };
    fetchWorkgroups();
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
        const { error } = await supabase.from('workgroups').delete().eq('id', id);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el grupo de trabajo',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setWorkgroups(workgroups.filter((workgroup) => workgroup.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El grupo de trabajo ha sido eliminado correctamente',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleEdit = (workgroup) => {
    setSelectedWorkgroup(workgroup);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (JSON.stringify(selectedWorkgroup) === JSON.stringify(workgroups.find((w) => w.id === selectedWorkgroup.id))) {
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
      .from('workgroups')
      .update({
        name: selectedWorkgroup.name,
        description: selectedWorkgroup.description,
      })
      .eq('id', selectedWorkgroup.id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el grupo de trabajo',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setIsModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Grupo de trabajo actualizado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
      const updatedWorkgroups = await supabase.from('workgroups').select('*');
      setWorkgroups(updatedWorkgroups.data);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newWorkgroup.name) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos obligatorios',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const { error } = await supabase.from('workgroups').insert([newWorkgroup]);
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el grupo de trabajo',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setIsAddModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Grupo de trabajo agregado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
      const updatedWorkgroups = await supabase.from('workgroups').select('*');
      setWorkgroups(updatedWorkgroups.data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkgroup(null);
  };

  const filteredWorkgroups = workgroups.filter((workgroup) =>
    workgroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (workgroup.description && workgroup.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Grupos de Trabajo Registrados</h2>

      {/* Input de búsqueda y botón de agregar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-2/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] shadow transition duration-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-3 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaPlus className="mr-2" />
          Agregar Grupo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">ID</th>
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Descripción</th>
              <th className="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkgroups.map((workgroup, index) => (
              <tr
                key={workgroup.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition duration-150`}
              >
                <td className="py-4 px-6">{workgroup.id}</td>
                <td className="py-4 px-6">{workgroup.name}</td>
                <td className="py-4 px-6">{workgroup.description || 'N/A'}</td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(workgroup)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(workgroup.id)}
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

      {/* Modal para editar grupo de trabajo */}
      {isModalOpen && selectedWorkgroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Editar Grupo de Trabajo
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <input
                    type="text"
                    value={selectedWorkgroup.name}
                    onChange={(e) =>
                      setSelectedWorkgroup({ ...selectedWorkgroup, name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={selectedWorkgroup.description || ''}
                    onChange={(e) =>
                      setSelectedWorkgroup({ ...selectedWorkgroup, description: e.target.value })
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

      {/* Modal para agregar grupo de trabajo */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Agregar Grupo de Trabajo
            </h3>
            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <input
                    type="text"
                    value={newWorkgroup.name}
                    onChange={(e) =>
                      setNewWorkgroup({ ...newWorkgroup, name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={newWorkgroup.description || ''}
                    onChange={(e) =>
                      setNewWorkgroup({ ...newWorkgroup, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500"
                  />
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

export default WorkgroupsTable;
