import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import NavBarHome from "../components/Navbar/NavbarLandingPage";
import Footer from "../components/Footer/Footer";

const ContactUs = () => {
    return (
        <div>
            

            {/* Contenedor principal */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 min-h-screen flex flex-col justify-center p-0">
                {/* Sección de Introducción */}
                <section className="text-center py-12 px-4">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Si tienes alguna pregunta, comentario o simplemente quieres saludar, ¡nos encantaría saber de ti!
                    </p>
                </section>

                {/* Formulario de Contacto */}
                <section className="bg-white rounded-lg shadow-2xl p-5 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
                        Envíanos un mensaje
                    </h2>
                    <form className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="name">Nombre</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Tu nombre"
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="email">Correo Electrónico</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="correo@ejemplo.com"
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="message">Mensaje</label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full py-3 text-white bg-[#EB6D1E] rounded-lg text-lg font-bold hover:bg-[#B14501] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-transform transform hover:scale-105"
                            >
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                </section>

                {/* Información de Contacto */}
                <section className="py-12 text-center">
                    <div className="max-w-screen-md mx-auto">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                            Nuestra Información de Contacto
                        </h2>
                        <p className="text-gray-600 mb-8">
                            También puedes contactarnos a través de las siguientes opciones:
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
                            <div className="flex items-center">
                                <FiMail className="text-[#EB6D1E] w-6 h-6 mr-3" />
                                <p className="text-gray-700">contacto@regcon.com</p>
                            </div>
                            <div className="flex items-center">
                                <FiPhone className="text-[#EB6D1E] w-6 h-6 mr-3" />
                                <p className="text-gray-700">+1 (234) 567-890</p>
                            </div>
                            <div className="flex items-center">
                                <FiMapPin className="text-[#EB6D1E] w-6 h-6 mr-3" />
                                <p className="text-gray-700">1234 Calle Principal, Ciudad, País</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

          
        </div>
    );
};

export default ContactUs;
