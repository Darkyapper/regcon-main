import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaSearch,
  FaBarcode,
  FaTag,
  FaUsers,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    code: '',
    name: '',
    category_id: null,
    workgroup_id: null,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from('tickets').select('*');
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los tickets',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        setTickets(data);
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async (code) => {
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
        const { error } = await supabase.from('tickets').delete().eq('code', code);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el ticket',
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setTickets(tickets.filter((ticket) => ticket.code !== code));
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El ticket ha sido eliminado correctamente',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('tickets')
      .update({
        name: selectedTicket.name,
        category_id: selectedTicket.category_id,
        workgroup_id: selectedTicket.workgroup_id,
      })
      .eq('code', selectedTicket.code);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el ticket',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setTickets(
        tickets.map((ticket) =>
          ticket.code === selectedTicket.code ? selectedTicket : ticket
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
    const { error } = await supabase.from('tickets').insert([newTicket]);
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el ticket',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      setTickets([...tickets, newTicket]);
      setIsAddModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Ticket agregado correctamente',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearchTerm = ticket.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? ticket.status?.toLowerCase() === filterStatus.toLowerCase() : true;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Tickets Registrados</h2>

      {/* Input de búsqueda, dropdown de filtro y botón de agregar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-4 w-3/4">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500 shadow"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] transition duration-500 shadow"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="sin usar">Sin usar</option>
            <option value="usado">Usado</option>
          </select>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-3 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaBarcode className="mr-2" />
          Agregar Ticket
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Código</th>
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Categoría</th>
              <th className="py-4 px-6 text-left font-semibold">Grupo de Trabajo</th>
              <th className="py-4 px-6 text-left font-semibold">Estado</th>
              <th className="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, index) => (
              <tr
                key={ticket.code}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition duration-150`}
              >
                <td className="py-4 px-6">{ticket.code}</td>
                <td className="py-4 px-6">{ticket.name}</td>
                <td className="py-4 px-6">{ticket.category_id || 'N/A'}</td>
                <td className="py-4 px-6">{ticket.workgroup_id || 'N/A'}</td>
                <td className="py-4 px-6">
                  <div
                    className={`px-2 py-1 rounded-lg text-center font-semibold ${
                      ticket.status?.toLowerCase() === 'sin usar'
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {ticket.status || 'N/A'}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="mr-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.code)}
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

      {/* Modal para editar y agregar ticket (ya incluido en tu código existente) */}
    </div>
  );
};

export default TicketsTable;
