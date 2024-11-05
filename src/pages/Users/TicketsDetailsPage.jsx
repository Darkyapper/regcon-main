import React, { useState, useEffect, useRef } from "react";
import { FiX, FiCalendar, FiClock, FiTag, FiEye } from "react-icons/fi";
import { supabase } from "../../services/supabaseClient";
import Footer from "../../components/Footer/Footer";
import NavbarHome from "../../components/Navbar/NavbarHome";
import './TicketsDetailPage.css';
import QRCode from "react-qr-code"; // Importa QRCode desde react-qr-code

const TicketsDetailPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);

  // Obtén el ID del usuario desde el almacenamiento local
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("No se ha proporcionado un ID de usuario.");
      return;
    }
    console.log("User ID obtenido:", userId);

    const fetchTickets = async () => {
      console.log("Iniciando la consulta de boletos...");
      const { data, error } = await supabase
        .from("usertickets")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error al obtener los boletos:", error);
      } else {
        console.log("Datos obtenidos:", data);
        setTickets(data);
      }
    };

    fetchTickets();
  }, [userId]);

  const handleToggleModal = (ticketCode) => {
    console.log("Abriendo modal para el ticket con código:", ticketCode);
    const ticketDetails = tickets.find((ticket) => ticket.ticket_code === ticketCode);
    setSelectedTicket(ticketDetails);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log("Cerrando modal");
    setIsModalVisible(false);
    setTimeout(() => setSelectedTicket(null), 300);
  };

  return (
    <div data-aos="fade-up">
     
      <div className="min-h-screen bg-white p-6" >
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Mis Boletos</h2>

          {tickets.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No tienes boletos asociados.</p>
            </div>
          ) : (
            <div className="space-y-4" >
              {tickets.map((ticket) => (
                <div
                  key={ticket.ticket_code}
                  className="bg-white shadow-2xl rounded-tl-2xl rounded-br-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-transform transform hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
                  style={{
                    borderLeft: "8px dotted rgba(255, 255, 255, 0.4)",
                    borderRight: "8px dotted rgba(255, 255, 255, 0.4)"
                  }}
                >
                  <div className="flex-1 flex flex-col space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{ticket.event_name}</h3>
                    <div className="text-gray-700 text-sm">
                      <p>Boleto: {ticket.ticket_name}</p>
                      <p><FiCalendar className="inline mr-1 text-[#EB6D1E]" /> Fecha del Evento: <span className="font-semibold">{new Date(ticket.event_date).toLocaleString()}</span></p>
                      <p><FiClock className="inline mr-1 text-[#EB6D1E]" /> Registrado el: <span className="font-semibold">{new Date(ticket.registration_date).toLocaleString()}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                    <button
                      onClick={() => handleToggleModal(ticket.ticket_code)}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-gray-200 rounded-md text-gray-600 hover:bg-orange-100 transition"
                    >
                      <FiEye className="w-5 h-5 mr-1" />
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedTicket && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-500 ease-out ${isModalVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            style={{
              display: isModalVisible ? 'flex' : 'none',
              transform: isModalVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            <div
              ref={modalRef}
              className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen transition-all duration-500 transform scale-100"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors duration-300"
              >
                <FiX className="w-10 h-10" />
              </button>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{selectedTicket.event_name}</h3>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-gray-600"><FiTag className="inline mr-1 text-[#EB6D1E]" /> Boleto: <span className="text-gray-800">{selectedTicket.ticket_name}</span></p>
                  <p className="text-lg font-semibold text-gray-600"><FiCalendar className="inline mr-1 text-[#EB6D1E]" /> Fecha del Evento: <span className="text-gray-800">{new Date(selectedTicket.event_date).toLocaleString()}</span></p>
                </div>
                <div className="flex justify-center mb-6">
                  <QRCode
                    value={selectedTicket.ticket_code}
                    size={200}
                    level="H"
                    includeMargin
                    className="border border-gray-300 rounded-lg"
                  />
                </div>
                <p className="text-gray-500 text-sm">Escanea este código QR para acceder al evento</p>
              </div>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default TicketsDetailPage;
