import React, { useEffect, useState } from "react";
import { FaWindows, FaCheck } from "react-icons/fa";
import NavBarHome from "../components/Navbar/NavbarLandingPage";
import Footer from "../components/Footer/Footer";


const PriceCard = ({ title, price, description, features }) => {
    return (
        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.7)] p-10 text-center max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>

            {/* Precio dentro de la tarjeta */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6 inline-block mb-4">
                <span className="text-5xl font-extrabold text-gray-800">${price}</span>
                <span className="text-gray-500"> / pago único</span>
            </div>

            <p className="text-gray-600 mt-4">{description}</p>

            {/* Lista de Características */}
            <ul className="text-gray-600 mt-8 space-y-2 text-left mx-auto max-w-xs">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Botón de Compra */}
            <div className="mt-6 flex justify-center">
                <button className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-white rounded-lg bg-gradient-to-br from-red-800 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 transition-transform transform hover:scale-105 md:hover:scale-110">
                    Comprar Licencia
                </button>
            </div>
        </div>
    );
};

const Price = () => {
    const [priceData, setPriceData] = useState({
        title: "Licencia Completa",
        price: 199,
        description: "Acceso ilimitado sin tarifas mensuales o suscripciones",
        features: [
            "Acceso a todas las funciones",
            "Soporte completo",
            "Actualizaciones gratuitas",
            "Uso ilimitado de eventos y usuarios"
        ]
    });

    // Simulación de una llamada al backend para obtener los datos
    useEffect(() => {
        const fetchData = async () => {
            // Simulación de datos del backend
            const data = {
                title: "Licencia Completa",
                price: 199,
                description: "Acceso ilimitado sin tarifas mensuales o suscripciones",
                features: [
                    "Acceso a todas las funciones",
                    "Soporte completo",
                    "Actualizaciones gratuitas",
                    "Uso ilimitado de eventos y usuarios"
                ]
            };
            setPriceData(data);
        };

        fetchData();
    }, []);

    return (
        <div data-aos="fade-up">
          

            {/* Contenedor principal */}
            <div className="bg-gray-50 min-h-screen text-gray-800 flex items-center justify-center" >
                <section className="text-center px-8 py-12 max-w-screen-md mx-auto" >
                    <h1 className="text-5xl font-extrabold leading-tight mb-4 text-gray-900 mt-0">
                        Compra tu Licencia
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
                        Adquiere una licencia única para disfrutar de todas las funcionalidades de nuestra plataforma. Paga una sola vez y accede a soporte completo, actualizaciones y mucho más.
                    </p>

                    {/* Tarjeta de Precio con datos del backend */}
                    <PriceCard 
                        title={priceData.title} 
                        price={priceData.price} 
                        description={priceData.description} 
                        features={priceData.features} 
                    />
                </section>
            </div>

        
        </div>
    );
};

export default Price;
