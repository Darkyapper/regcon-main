import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { supabase } from "../../services/supabaseClient";
import Footer from "../../components/Footer/Footer";
import NavbarHome from "../../components/Navbar/NavbarHome";

const EventDetailPage = () => {
    const { eventId } = useParams();
    console.log("Event ID:", eventId);
    const [eventData, setEventData] = useState(null);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [ticketCount, setTicketCount] = useState({});
    const [total, setTotal] = useState(0);

    const fetchEventData = async () => {
        const { data: eventData, error: eventError } = await supabase
            .from("events")
            .select("id, name, description, event_date, location, image, category_id")
            .eq("id", eventId)
            .single();

        if (eventError) {
            console.error("Error al cargar el evento:", eventError);
            return;
        }

        setEventData(eventData);

        if (eventData.category_id) {
            console.log("Category ID capturado:", eventData.category_id);
            const { data: ticketsData, error: ticketsError } = await supabase
                .from("ticketcategories")
                .select("id, name, price, description")
                .eq("id", eventData.category_id);

            if (ticketsError) {
                console.error("Error al cargar las categorías de boletos:", ticketsError);
            } else {
                setTicketCategories(ticketsData);
            }
        }
    };

    const calculateTotal = () => {
        if (ticketCategories.length > 0) {
            const totalAmount = ticketCategories.reduce((sum, ticket) => {
                return sum + (ticketCount[ticket.id] || 0) * ticket.price;
            }, 0);
            setTotal(totalAmount);
        }
    };

    const handleTicketChange = (ticketId, increment) => {
        setTicketCount((prevCount) => ({
            ...prevCount,
            [ticketId]: Math.max(0, (prevCount[ticketId] || 0) + increment)
        }));
    };

    useEffect(() => {
        fetchEventData();
    }, [eventId]);

    useEffect(() => {
        calculateTotal();
    }, [ticketCount, ticketCategories]);

    if (!eventData) return <div className="text-gray-800 text-center p-4">Cargando evento...</div>;

    return (
        <div >
            <div className="bg-white text-gray-800 p-8 min-h-screen" data-aos="fade-up">
                <h1 className="mb-4 text-3xl text-center font-extrabold tracking-tight leading-tight text-[#EB6D1E] md:text-3xl lg:text-4xl">{eventData.name}</h1>

                <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Descripción</h2>
                    <p>{eventData.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-300 space-y-6">
                        <h2 className="mb-4 text-2xl font-bold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Detalles</h2>

                        <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="text-[#EB6D1E]" />
                            <span className="text-lg font-semibold">Fecha:</span>
                        </div>
                        <p className="ml-8 text-lg">{new Date(eventData.event_date).toLocaleString()}</p>

                        <div className="flex items-center space-x-3 mt-4">
                            <FaMapMarkerAlt className="text-[#EB6D1E]" />
                            <span className="text-lg font-semibold">Ubicación:</span>
                        </div>
                        <p className="ml-8 text-lg">{eventData.location}</p>
                    </div>

                    <div className="space-y-8 flex justify-center" data-aos="flip-left">
                        <div className="shadow-2xl rounded-lg overflow-hidden w-2/3 md:w-1/2 lg:w-1/2">
                            <img
                                src={eventData.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                                alt="Evento Principal"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {ticketCategories.length > 0 ? (
                    <div className="text-left mt-12" >
                        <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Comprar Boletos:</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {ticketCategories.map((ticket) => (
                                    <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-2xl">
                                        <h3 className="text-xl font-bold">{ticket.name}</h3>
                                        <p className="text-lg font-semibold">${(ticket.price ? ticket.price.toFixed(2) : '0.00')}</p>
                                        <p className="text-sm">{ticket.description}</p>
                                        <div className="flex items-center mt-4">
                                            <button onClick={() => handleTicketChange(ticket.id, -1)} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-l">
                                                -
                                            </button>
                                            <div className="px-6 py-2 bg-gray-100 text-lg font-semibold text-center w-16">{ticketCount[ticket.id] || 0}</div>
                                            <button onClick={() => handleTicketChange(ticket.id, 1)} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-r">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-300 p-6 rounded-lg shadow-2xl" data-aos="flip-up">
                                <h3 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Resumen de compra:</h3>
                                <hr className="my-4" />
                                <p className="text-lg">Subtotal: ${total.toFixed(2)}</p>
                                <p className="text-lg">Comisión: $0.00</p>
                                <p className="text-lg">Total: <span className="font-bold">${total.toFixed(2)}</span></p>
                                <button className="w-full mt-4 bg-[#EB6D1E] text-white py-2 rounded font-bold">Seleccionar Boletos</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 text-center">
                        <p className="text-lg text-gray-600">No hay categorías de boletos disponibles para este evento.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;
