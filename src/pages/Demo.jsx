import React from "react";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";
import Swal from "sweetalert2";
import Footer from "../components/Footer/Footer";
import NavbarLandingPage from "../components/Navbar/NavbarLandingPage";

const Demo = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: '¡Solicitud Enviada!',
            text: 'Se ha enviado la información al correo que proporcionaste.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#EB6D1E',
        });
    };

    return (
        <div data-aos="fade-up">
         
            
            {/* Fondo con degradado */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center min-h-screen">
                <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-2xl max-w-md w-full mx-auto mt-0">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 mt-0 text-center">
                        Solicita una Demostración
                    </h2>
                    <p className="text-gray-600 text-lg text-center mb-8">
                        Completa la información para solicitar una demostración de nuestro producto
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre de Usuario */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-1">Nombre de Usuario</label>
                            <div className="relative mt-1">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder=""
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Nombre Completo */}
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-900 mb-1">Nombre Completo</label>
                            <div className="relative mt-1">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="fullname"
                                    placeholder=""
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Fecha de Nacimiento */}
                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-900 mb-1">Fecha de Nacimiento</label>
                            <div className="relative mt-1">
                                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="date"
                                    id="birthdate"
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Correo Electrónico</label>
                            <div className="relative mt-1">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder=""
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        <button
                            type="submit"
                            className="w-full py-3 text-white bg-[#EB6D1E] rounded-lg text-lg font-bold hover:bg-[#B14501] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-transform transform hover:scale-105"
                        >
                            Solicitar Demo
                        </button>
                    </form>
                </div>
            </div>

            
        </div>
    );
};

export default Demo;
