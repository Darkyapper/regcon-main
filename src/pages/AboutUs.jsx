import React from "react";
import { FiGithub, FiFacebook, FiInstagram, FiTwitter, FiClipboard, FiCheckCircle, FiActivity, FiUsers, FiAward, FiTarget } from "react-icons/fi";


const teamMembers = [
    {
        name: "David Chay",
        role: "Líder de Desarrollo",
        image: "https://via.placeholder.com/150",
        facebook: "#",
        instagram: "#",
        twitter: "#",
        github: "#",
    },
    {
        name: "Yahir Ordoñez",
        role: "Diseñador UI/UX",
        image: "https://via.placeholder.com/150",
        facebook: "#",
        instagram: "#",
        twitter: "#",
        github: "#",
    },
    {
        name: "Carlos López",
        role: "Ingeniero de Backend",
        image: "https://via.placeholder.com/150",
        facebook: "#",
        instagram: "#",
        twitter: "#",
        github: "#",
    },
];

const AboutUs = () => {
    return (
        <div>
          
            <div className="bg-orange-50 text-gray-800">
                {/* Sección de Introducción */}
                <section className="bg-orange-100 py-12 text-center px-4">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl lg:text-5xl">
                        Sobre Nosotros
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        RegCon es una solución innovadora desarrollada para simplificar y optimizar el registro y la administración de eventos, 
                        permitiendo a los organizadores ofrecer una experiencia de calidad sin largas filas y esperas.
                    </p>
                </section>

                {/* Misión, Visión y Valores */}
                <section className="bg-white py-12">
                    <div className="max-w-screen-lg px-4 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl">
                            Nuestra Misión y Visión
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <div className="group bg-gray-100 p-6 rounded-lg shadow-md hover:bg-[#EB6D1E] hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
                                <FiTarget className="text-[#EB6D1E] group-hover:text-white w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                    Misión
                                </h3>
                                <p className="text-gray-700 group-hover:text-white text-center">
                                    Simplificar el proceso de registro en eventos y convenciones, reduciendo las largas esperas y optimizando la gestión para todos los asistentes.
                                </p>
                            </div>
                            <div className="group bg-gray-100 p-6 rounded-lg shadow-md hover:bg-[#EB6D1E] hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
                                <FiAward className="text-[#EB6D1E] group-hover:text-white w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                    Visión
                                </h3>
                                <p className="text-gray-700 group-hover:text-white text-center">
                                    Ser la herramienta líder en la administración y optimización de eventos a nivel nacional e internacional, reconocida por su eficiencia y confiabilidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Funcionalidades Clave */}
                <section className="bg-orange-50 py-12">
                    <div className="max-w-screen-lg px-4 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl">
                            Funcionalidades de RegCon
                        </h2>
                        <p className="text-gray-600 text-lg mb-10">RegCon ofrece herramientas clave para simplificar y automatizar la gestión de eventos:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-[#EB6D1E] hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
                                <FiClipboard className="text-[#EB6D1E] group-hover:text-white w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                    Registro de Eventos
                                </h3>
                                <p className="text-gray-700 group-hover:text-white text-center">
                                    Creación y configuración de eventos con información detallada de asistentes y actividades.
                                </p>
                            </div>
                            <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-[#EB6D1E] hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
                                <FiCheckCircle className="text-[#EB6D1E] group-hover:text-white w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                    Validación de Boletos
                                </h3>
                                <p className="text-gray-700 group-hover:text-white text-center">
                                    Validación de boletos mediante códigos QR, asegurando rapidez y seguridad en la entrada.
                                </p>
                            </div>
                            <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-[#EB6D1E] hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
                                <FiActivity className="text-[#EB6D1E] group-hover:text-white w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold tracking-tight leading-none text-[#EB6D1E] group-hover:text-white">
                                    Generación de Informes
                                </h3>
                                <p className="text-gray-700 group-hover:text-white text-center">
                                    Análisis detallado y generación de informes de asistencia, ventas y otras métricas importantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipo de Desarrollo */}
                <section className="bg-white py-12">
                    <div className="max-w-screen-lg px-4 mx-auto text-center">
                        <h2 className="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl">
                            Nuestro Equipo
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                                    <div className="flex flex-col items-center">
                                        <img className="w-24 h-24 mb-4 rounded-full shadow-md" src={member.image} alt={`${member.name}`} />
                                        <h5 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h5>
                                        <span className="text-sm text-gray-500 mb-4">{member.role}</span>
                                        <div className="flex space-x-4 mt-4">
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
                                                <FiGithub className="w-6 h-6" />
                                            </a>
                                            <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                                                <FiFacebook className="w-6 h-6" />
                                            </a>
                                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-white">
                                                <FiInstagram className="w-6 h-6" />
                                            </a>
                                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 dark:text-gray-300 dark:hover:text-white">
                                                <FiTwitter className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
          
        </div>
    );
};

export default AboutUs;
