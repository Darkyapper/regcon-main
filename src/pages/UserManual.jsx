import React, { useState, useEffect } from "react";
import { FiUserCheck, FiClipboard, FiSend, FiMail, FiBarChart2, FiSettings, FiEdit3, FiShoppingCart, FiCreditCard, FiCalendar, FiCheckCircle } from "react-icons/fi";
import NavBarHome from "../components/Navbar/NavbarLandingPage";
import Footer from "../components/Footer/Footer";

const UserManual = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollEnd = () => {
        // Obtener la posición actual de scroll y la altura de la ventana y del documento
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Si el usuario está cerca del final de la página, mostramos el botón
        if (scrollTop + windowHeight >= docHeight - 500) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };

    // Función para desplazarse hacia arriba de forma suave
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Agregar un event listener para el scroll
    useEffect(() => {
        window.addEventListener("scroll", checkScrollEnd);
        return () => {
            window.removeEventListener("scroll", checkScrollEnd);
        };
    }, []);
    return (
        <div data-aos="fade-up">
        
            <div className="bg-orange-50 text-gray-800">
                {/* Sección de Introducción */}
                <section className="bg-orange-100 py-12 text-center px-4">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800  md:text-4xl lg:text-5xl">
                        ¿Qué es RegCon?
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        RegCon es un software de registro y gestión de eventos que permite a los organizadores optimizar los tiempos de registro, validación de boletos y administración de asistentes, haciendo los eventos más eficientes y seguros.
                    </p>
                </section>

                {/* Sección de Tutorial para Organizadores */}
                <section className="bg-white py-12" >
                    <div className="max-w-screen-lg px-4 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800  md:text-4xl">
                            Cómo Usar RegCon (Organizadores)
                        </h2>
                        <p className="text-gray-600 text-lg mb-10">Sigue estos pasos para maximizar tu experiencia como organizador en RegCon:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative group bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiUserCheck className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        1. Crea tu Cuenta
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Regístrate con tus datos básicos para acceder al panel y gestionar tus eventos.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiEdit3 className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        2. Configura tu Evento
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Define los detalles de tu evento, como nombre, fecha y lugar, desde el panel de organizador.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiSettings className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        3. Configura los Boletos
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Configura precios y genera boletos QR para una validación rápida y segura el día del evento.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiBarChart2 className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        4. Analiza los Resultados
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Accede a informes detallados de asistencia y otros datos para optimizar futuros eventos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Tutorial para Compradores */}
                <section className="bg-orange-50 py-12">
                    <div className="max-w-screen-lg px-4 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl">
                            Cómo Comprar o Acceder a un Evento
                        </h2>
                        <p className="text-gray-600 text-lg mb-10">Sigue estos pasos para comprar tu entrada o acceder a un evento en RegCon:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative group bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiShoppingCart className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        1. Selecciona el Evento
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Explora eventos disponibles y elige el que deseas asistir.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiCreditCard className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        2. Compra tu Entrada
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Realiza el pago de tu entrada de manera rápida y segura.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiCalendar className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        3. Recibe tu Boleto
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Guarda tu boleto con código QR para el día del evento.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-pointer">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <FiCheckCircle className="text-[#EB6D1E] w-10 h-10 mb-4 group-hover:text-white" />
                                    <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                        4. Accede al Evento
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-white text-center">
                                        Presenta tu boleto QR para escanear y disfruta del evento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mensaje Final */}
                <section className="bg-orange-100 py-8 text-center">
                    <h3 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-800  md:text-4xl lg:text-4xl">
                        ¡Es todo!
                    </h3>
                    <p className="text-gray-600">Ya tienes todo lo necesario para usar RegCon de la mejor manera.</p>
                </section>

                {/* Dudas */}
                <section className="bg-white py-8 text-center">
                    <div className="max-w-md md:max-w-xl mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">¿Tienes alguna duda?</h2>
                        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                            Envíanos un correo con tus preguntas y te responderemos lo antes posible.
                        </p>

                        <div className="flex justify-center items-center space-x-0 max-w-lg mx-auto">
                            {/* Input con ícono de correo dentro */}
                            <div className="relative flex-grow">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    className="py-2 md:py-3 pl-10 pr-4 w-full text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 focus:border-[#EB6D1E]"
                                />
                            </div>

                            {/* Botón de envío con solo ícono */}
                            <button
                                className="bg-[#EB6D1E] text-white font-semibold py-3 md:py-3 px-4 rounded-r-lg hover:bg-orange-600 transition duration-200 flex items-center justify-center"
                            >
                                <FiSend className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>
                 {/* Flecha para Subir */}
                 <div
                    className={`fixed bottom-10 right-10 z-50 cursor-pointer p-3 rounded-full bg-[#EB6D1E] text-white shadow-lg transition-opacity ${
                        showScroll ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={scrollToTop}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            </div>
         

        </div>
    );
};

export default UserManual;
