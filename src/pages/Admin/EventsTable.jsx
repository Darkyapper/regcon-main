import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaSearch,
  FaCalendar,
  FaMapMarkerAlt,
  FaTag,
  FaUsers,
  FaFileImage,
  FaPlus,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [originalEvent, setOriginalEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    event_date: '',
    location: '',
    description: '',
    category_id: null,
    workgroup_id: null,
    image: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los eventos',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        setEvents(data);
      }
    };
    fetchEvents();
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
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el evento',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setEvents(events.filter((event) => event.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El evento ha sido eliminado correctamente',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOriginalEvent({ ...event });
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (JSON.stringify(selectedEvent) === JSON.stringify(originalEvent)) {
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
      .from('events')
      .update({
        name: selectedEvent.name,
        event_date: selectedEvent.event_date,
        location: selectedEvent.location,
        description: selectedEvent.description,
        category_id: selectedEvent.category_id,
        workgroup_id: selectedEvent.workgroup_id,
        image: selectedEvent.image,
      })
      .eq('id', selectedEvent.id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el evento',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
      setIsModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Cambios guardados correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newEvent.name || !newEvent.event_date || !newEvent.location) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos obligatorios deben ser completados',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const { error } = await supabase.from('events').insert([newEvent]);
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el evento',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setEvents([...events, newEvent]);
      setIsAddModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Evento agregado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Eventos Registrados</h2>

     
       {/* Input de búsqueda y botón de agregar */}
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
          <FaTag className="mr-2" />
          Agregar Evento
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">ID</th>
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Fecha</th>
              <th className="py-4 px-6 text-left font-semibold">Ubicación</th>
              <th className="py-4 px-6 text-left font-semibold">Categoría</th>
              <th className="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr
                key={event.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition duration-150`}
              >
                <td className="py-4 px-6">{event.id}</td>
                <td className="py-4 px-6">{event.name}</td>
                <td className="py-4 px-6">{event.event_date}</td>
                <td className="py-4 px-6">{event.location}</td>
                <td className="py-4 px-6">{event.category_id || 'N/A'}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleEdit(event)}
                    className="mr-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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

      {/* Modal para editar evento */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Editar Evento
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <div className="relative">
                    <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={selectedEvent.name}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, name: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Fecha</label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={selectedEvent.event_date}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, event_date: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Ubicación</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={selectedEvent.location}
                      onChange={(e) =>
                        setSelectedEvent({ ...selectedEvent, location: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Categoría</label>
                  <input
                    type="number"
                    value={selectedEvent.category_id || ''}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, category_id: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Grupo de Trabajo</label>
                  <input
                    type="number"
                    value={selectedEvent.workgroup_id || ''}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, workgroup_id: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={selectedEvent.description || ''}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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

      {/* Modal para agregar evento */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl transform animate-modal-bounce">
            <h3 className="text-2xl font-bold mb-4 text-black border-b-2 border-orange-400 pb-2">
              Agregar Evento
            </h3>
            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Nombre</label>
                  <div className="relative">
                    <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Fecha</label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={newEvent.event_date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, event_date: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Ubicación</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Categoría</label>
                  <input
                    type="number"
                    value={newEvent.category_id || ''}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category_id: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Grupo de Trabajo</label>
                  <input
                    type="number"
                    value={newEvent.workgroup_id || ''}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, workgroup_id: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Descripción</label>
                  <textarea
                    value={newEvent.description || ''}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-[#EB6D1E] focus:border-[#EB6D1E] focus:transition-all focus:duration-300"
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

export default EventsTable;



