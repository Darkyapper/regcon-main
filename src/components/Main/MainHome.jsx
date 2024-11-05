import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { supabase } from "../../services/supabaseClient";
import 'swiper/css';
import 'swiper/css/navigation';
import './MainHome.css';

const MainHome = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const images = [
        "https://cdn.pixabay.com/photo/2018/01/15/21/50/concert-3084876_1280.jpg",
        "/src/assets/images/Banner3.jpg",
        "https://cdn.pixabay.com/photo/2019/05/18/21/15/hands-4212584_1280.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia la imagen cada 3 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const today = new Date();
            const upcomingDate = new Date();
            upcomingDate.setDate(today.getDate() + 3); // Obtener eventos para los próximos 3 días

            // Obtener eventos próximos
            const { data: upcomingData, error: upcomingError } = await supabase
                .from("events")
                .select("id, name, event_date, location, image")
                .gte("event_date", today.toISOString().split("T")[0])
                .lte("event_date", upcomingDate.toISOString().split("T")[0]);

            if (upcomingError) {
                console.error("Error al cargar eventos próximos:", upcomingError);
            } else {
                setUpcomingEvents(upcomingData);
            }

            // Obtener todos los eventos
            const { data: allData, error: allError } = await supabase
                .from("events")
                .select("id, name, event_date, location, image");

            if (allError) {
                console.error("Error al cargar todos los eventos:", allError);
            } else {
                setAllEvents(allData);
            }

            setLoading(false);
        };

        fetchEvents();
    }, []);

    const handleLoadMore = () => {
        setShowMore(true);
    };

    const goToSlide = (index) => setCurrentIndex(index);

    return (
        <div data-aos="fade-up">
            {/* Carrusel */}
            <div id="fade-carousel" className="relative w-full">
                <div className="relative h-56 overflow-hidden md:h-96">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                        >
                            <img
                                src={img}
                                className="block w-full h-full object-cover"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Indicadores del carrusel */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2">
                    {Array(images.length).fill().map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-1 ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"} rounded-sm`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
                <button
                    type="button"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white"
                    onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
                    onClick={() => goToSlide((currentIndex + 1) % images.length)}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </button>
            </div>

            <div className="bg-white min-h-screen px-4 py-8 max-w-7xl mx-auto" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">
                {/* Próximos Eventos */}
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Próximos Eventos</h2>
                <Swiper
                    direction="horizontal"
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    className="w-full"
                >
                    {upcomingEvents.map((event) => (
                        <SwiperSlide key={event.id}>
                            <div className="event-card">
                                <Link to={`/Detalles de Evento/${event.id}`} className="block relative"> {/* Cambio de <a> a <Link> */}
                                    <div className="event-image-container relative">
                                        <img
                                            className="event-image w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                                            src={event.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                                            alt={event.name}
                                        />
                                        <div className="event-info-overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                                            <h5 className="text-lg font-bold">{event.name}</h5>
                                            <p className="text-sm">{event.location}</p>
                                            <p className="text-sm">{new Date(event.event_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Todos los Eventos */}
                <div className="my-10">
                    <hr className="border-t-2 border-gray-300 my-4" />
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Todos los Eventos</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-4">
                    {loading ? (
                        <p>Cargando eventos...</p>
                    ) : (
                        allEvents.slice(0, showMore ? allEvents.length : 4).map((event) => (
                            <div key={event.id} className="event-card w-full h-full flex flex-col bg-white shadow-lg overflow-hidden">
                                <Link to={`/Detalles de Evento/${event.id}`} className="block relative"> {/* Cambio de <a> a <Link> */}
                                    <div className="event-image-container relative">
                                        <img
                                            className="event-image w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                                            src={event.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                                            alt={event.name}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center flex flex-col justify-center" style={{ height: '5rem' }}>
                                            <h5 className="text-sm font-bold truncate">{event.name}</h5>
                                            <p className="text-xs truncate">{event.location}</p>
                                            <p className="text-xs">{new Date(event.event_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

                {!showMore && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            className="w-100 md:w-auto flex items-center justify-center px-4 py-2 bg-[#EB6D1E] text-white font-semibold rounded-md hover:bg-[#B14501] focus:ring-2 focus:ring-[#EB6D1E] transition-transform transform hover:scale-100"
                        >
                            Cargar más
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainHome;
