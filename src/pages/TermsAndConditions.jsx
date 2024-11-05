import React from "react";
import NavBarHome from "../components/Navbar/NavbarLandingPage";
import Footer from "../components/Footer/Footer";

const TermsAndConditions = () => {
    return (
        <div>
          
            <div className="bg-gray-50 text-gray-800">
                {/* Sección de Introducción */}
                <section className="bg-gray-100 py-12 text-center px-4">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl lg:text-5xl">
                        Términos y Condiciones
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Estos términos y condiciones regulan el uso de nuestra plataforma RegCon. Te pedimos que los leas atentamente.
                    </p>
                </section>

                {/* Detalles de Términos y Condiciones */}
                <section className="bg-white py-12">
                    <div className="max-w-screen-lg mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-center mb-8 text-gray-800">Detalles de los Términos</h2>
                        <div className="space-y-6 text-gray-700">
                            <h3 className="text-xl font-bold text-gray-800">1. Aceptación de los Términos</h3>
                            <ul className="list-disc list-inside">
                                <li>Al registrarse en RegCon, aceptas estos términos y condiciones en su totalidad.</li>
                                <li>Nos reservamos el derecho de modificar los términos en cualquier momento.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">2. Uso de la Plataforma</h3>
                            <ul className="list-disc list-inside">
                                <li>RegCon proporciona un servicio de gestión de eventos y registro de asistentes.</li>
                                <li>Está prohibido el uso de la plataforma para actividades no autorizadas o ilegales.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">3. Responsabilidad del Usuario</h3>
                            <ul className="list-disc list-inside">
                                <li>Los usuarios son responsables de la exactitud de los datos proporcionados.</li>
                                <li>Es responsabilidad del usuario mantener la confidencialidad de sus credenciales de acceso.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">4. Propiedad Intelectual</h3>
                            <ul className="list-disc list-inside">
                                <li>Todo el contenido, marca y diseño de RegCon están protegidos por derechos de propiedad intelectual.</li>
                                <li>Está prohibida la reproducción o distribución del contenido sin autorización.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">5. Limitación de Responsabilidad</h3>
                            <ul className="list-disc list-inside">
                                <li>RegCon no se hace responsable de pérdidas indirectas o daños resultantes del uso de la plataforma.</li>
                                <li>La plataforma se proporciona “tal cual” y no garantiza su disponibilidad ininterrumpida.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">6. Terminación de Cuenta</h3>
                            <ul className="list-disc list-inside">
                                <li>RegCon se reserva el derecho de suspender o terminar cuentas que violen estos términos.</li>
                                <li>El usuario puede solicitar la terminación de su cuenta en cualquier momento.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-800">7. Ley Aplicable</h3>
                            <ul className="list-disc list-inside">
                                <li>Estos términos se rigen por las leyes aplicables en la jurisdicción correspondiente.</li>
                                <li>Cualquier disputa será resuelta en los tribunales competentes de dicha jurisdicción.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
          
        </div>
    );
};

export default TermsAndConditions;
