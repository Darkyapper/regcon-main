import React from "react";
import NavBarHome from "../components/Navbar/NavbarLandingPage";
import Footer from "../components/Footer/Footer";

const PrivacyPolicy = () => {
    return (
        <div>
         
            <div className="bg-gray-50 text-gray-800">
                {/* Sección de Introducción */}
                <section className="bg-gray-100 py-12 text-center px-4">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl lg:text-5xl">
                        Política de Privacidad
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Tu privacidad es fundamental para nosotros. Aquí te explicamos cómo gestionamos tu información en RegCon.
                    </p>
                </section>

                {/* Detalles de la Política de Privacidad */}
                <section className="bg-white py-12">
                    <div className="max-w-screen-lg mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-center mb-8 text-gray-800">Detalles de la Política</h2>
                        <div className="space-y-6 text-gray-700">
                            <h3 className="text-xl font-bold text-gray-800">1. Información Recopilada</h3>
                            <ul className="list-disc list-inside">
                                <li>Datos personales proporcionados durante el registro.</li>
                                <li>Datos generados por la interacción con nuestros servicios.</li>
                                <li>Información anónima para mejorar la experiencia del usuario.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">2. Uso de los Datos</h3>
                            <ul className="list-disc list-inside">
                                <li>Procesamiento de registros y autenticación en eventos.</li>
                                <li>Mejoras en la seguridad de los servicios y soporte técnico.</li>
                                <li>Optimización de funcionalidades y experiencia de usuario.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">3. Seguridad y Protección</h3>
                            <ul className="list-disc list-inside">
                                <li>Implementación de cifrado en la transmisión de datos sensibles.</li>
                                <li>Respaldo regular de información para evitar pérdida de datos.</li>
                                <li>Acceso restringido basado en roles para proteger la información.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">4. Derechos del Usuario</h3>
                            <ul className="list-disc list-inside">
                                <li>Acceso y modificación de tus datos personales.</li>
                                <li>Solicitud de eliminación de tus datos bajo ciertas condiciones.</li>
                                <li>Derecho a restringir el procesamiento de tus datos personales.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">5. Retención de Datos</h3>
                            <ul className="list-disc list-inside">
                                <li>Retención de datos solo mientras sea necesario para el propósito inicial.</li>
                                <li>Eliminación de datos inactivos según políticas de retención.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">6. Cambios en la Política</h3>
                            <ul className="list-disc list-inside">
                                <li>Nos reservamos el derecho de actualizar esta política.</li>
                                <li>Notificación de cambios a los usuarios a través de la plataforma.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
       
        </div>
    );
};

export default PrivacyPolicy;
