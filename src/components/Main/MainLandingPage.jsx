import React, { useState, useEffect } from 'react';
import './MainLandingPage.css';
import { Download, Globe, Mail, CreditCard, Import } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import exampleImg from '../../assets/images/regcon-src.png'

import { FiTrendingUp, FiBell, FiUserCheck, FiCalendar, FiCheckCircle, FiBarChart2, FiFileText, FiArrowDown, FiArrowLeft, FiArrowRight, FiUsers } from "react-icons/fi";
import { RiMegaphoneLine } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import Login from '../Modals/Login';

const Main = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);


  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true, // La animación solo se ejecuta una vez
    });
  }, []);


  // Llamada a la API para obtener las novedades
  /*useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/novedades"); // Cambiar la URL para el backend
        const data = await response.json();
        setNovedades(data);
      } catch (error) {
        console.error("Error al cargar las novedades:", error);
      }
    };
 
    fetchNovedades();
  }, []);*/

  // Datos de ejemplo (puedes sustituir estos datos con los que obtengas del backend más adelante)
  const novedades = [
    {
      fecha: "Octubre 15, 2023",
      titulo: "Actualización de Funcionalidades",
      descripcion: "Explora las nuevas herramientas que hemos implementado para mejorar tu experiencia.",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      fecha: "Septiembre 25, 2023",
      titulo: "Notificaciones Importantes",
      descripcion: "Mantente al día con los cambios más importantes y eventos futuros.",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      fecha: "Agosto 30, 2023",
      titulo: "Ofertas Exclusivas",
      descripcion: "Aprovecha beneficios especiales disponibles por tiempo limitado.",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      fecha: "Agosto 30, 2023",
      titulo: "Ofertas Exclusivas",
      descripcion: "Aprovecha beneficios especiales disponibles por tiempo limitado.",
      imagen: "https://via.placeholder.com/300x200",
    },
  ];



  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;

  // Función para avanzar al siguiente grupo de novedades
  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsToShow >= novedades.length ? 0 : prevIndex + itemsToShow
    );
  };

  // Función para retroceder al grupo anterior de novedades
  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - itemsToShow < 0 ? novedades.length - itemsToShow : prevIndex - itemsToShow
    );
  };



  // Función para mostrar el botón cuando el usuario llega al final de la página
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





  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);



  const handleSmoothScroll = (event) => {
    event.preventDefault(); // Evitar comportamiento por defecto
    const targetId = event.currentTarget.getAttribute('href'); // Obtener el id del destino
    const targetElement = document.querySelector(targetId); // Seleccionar el elemento destino

    targetElement.scrollIntoView({
      behavior: 'smooth', // Desplazamiento suave
    });
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

    <div data-aos="fade-up" className='w-full'>
      <section className="relative min-h-screen bg-white">
        {/* Contenido del banner */}
        <div className="relative relative-a px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 z-10 bg-spheres">
          {/* Esferas */}
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>
          <div className="sphere"></div>

          <img src={exampleImg} alt="RegCon" className="img-cs-hl mx-auto mb-8" />

          <h1 className="title-cs-hl mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-5xl">
            ¡Haz que cada segundo cuente!
          </h1>

          <p className="mb-8 normal-cs-p-hl font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48">
            Organice eventos de manera eficiente y sin complicaciones con RegCon. Somos una plataforma de gestión de eventos que simplifica el proceso de registro y gestión de eventos para que pueda centrarse en lo que realmente importa.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 lg:space-x-4">
            <a
              href="/Registro"
              className="descargar-cs-sec inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-white rounded-lg bg-gradient-to-br from-red-800 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 transition-transform transform hover:scale-105 md:hover:scale-110"
            >
              Comienza ahora
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>

            <a
              href="/Solicitar Demo"
              className="descargar-cs-sec inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-gray-600 rounded-lg border border-gray-600 hover:text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-400 transition-transform transform hover:scale-105 md:hover:scale-110"
            >
              Usar la Versión Web
            </a>
          </div>
        </div>
      </section>



      {/* Sección de Rectángulo */}
      <div className="w-full h-32 bg-[#EB6D1E] flex items-center justify-center text-center mt-0" data-aos="fade-up">
        <p className="title-cs-hl2">
          ¡Haz de tu evento una experiencia inolvidable!
        </p>
      </div>



      {/*Sección de Características */}
      {/* Sección de Características */}
      <section className="bg-white py-16" data-aos="fade-up">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <h2 className="title-cs-hl mb-8 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Conoce Nuestros Servicios</h2>

          <div className="font-grid-cs-hl1 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-left">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <FiCheckCircle className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Registro Instantáneo</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">RegCon facilita un proceso de registro rápido y eficiente para todos tus asistentes.</p>
              </div>
            </div>

            {/* Característica 2 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-right">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <FiUserCheck className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Validación de Asistencia</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">Escanea y valida la asistencia de tus clientes al instante con códigos QR.</p>
              </div>
            </div>

            {/* Característica 3 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-left">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <FiBarChart2 className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Análisis de Eventos</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">Obtén informes detallados sobre la asistencia y rendimiento de tu evento.</p>
              </div>
            </div>

            {/* Característica 4 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-right">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <FiUsers className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Gestión de Asistentes</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">Administra fácilmente los datos de todos tus asistentes.</p>
              </div>
            </div>

            {/* Característica 5 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-left">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <FiCalendar className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Programación de Eventos</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">Organiza y planifica tus eventos con facilidad.</p>
              </div>
            </div>

            {/* Característica 6 */}
            <div className="relative group bg-[#FFEDD5] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#EB6D1E] cursor-default" data-aos="flip-right">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <RiMegaphoneLine className="text-[#EB6D1E] w-12 h-12 mb-4 group-hover:text-white" />
                <h3 className="title-stylus-a-hl text-2xl font-bold text-[#EB6D1E] group-hover:text-white mb-4">Promoción de eventos</h3>
                <p className="descargar-cs-sec text-gray-700 group-hover:text-white text-center">Con RegCon Events, tienes tu propio espacio para promocionar tus eventos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Únete Y Descarga */}
      <section id='Descargar' className="descargar-cs-sec relative py-24 bg-center bg-cover bg-no-repeat bg-[url('/src/assets/images/Banner2.jpg')] bg-gray-800 bg-blend-multiply" data-aos="fade-up">
        <div className="px-4 mx-auto max-w-screen-xl text-center" data-aos="fade-up">
          {/* Título Principal y Descripción */}
          <h2 className="dwn-title-cs mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Únete a RegCon
          </h2>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Con RegCon, dile adiós a las largas colas en tus colas, y dale la bienvenida a una experiencia de registro rápida y eficiente. RegCon ofrece una plataforma fácil de usar para gestionar tus eventos de manera efectiva, haciendo de tu evento una experiencia inolvidable.
          </p>

          {/* Sección de Descarga */}
          <div className="p-5 rounded-lg shadow-lg bg-transparent max-w-md mx-auto" data-aos="fade-up">
            <p className="text-base sm:text-lg text-gray-300 mb-6 text-center">
              Elige cómo quieres acceder a nuestra plataforma. ¡Escoge la mejor opción!
            </p>

            {/* Opciones de Descarga */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Opción de Descarga Local */}
              <a
                href="/Descargar"
                className="descargar-cs-sec flex items-center justify-center px-4 py-3 border border-white text-white font-semibold rounded-md hover:bg-[#EB6D1E] transition-transform transform hover:scale-105"
              >
                <Download className="h-5 w-5 mr-2" />
                Descargar Local
              </a>

              {/* Opción de Acceso Online */}
              <a

                onClick={openLoginModal}

                href="https://toolregcon.vercel.app/"
                className="descargar-cs-sec flex items-center justify-center px-4 py-3 border border-white text-white font-semibold rounded-md hover:bg-gray-700 transition-transform transform hover:scale-105"
              >

                <Globe className="h-5 w-5 mr-2" />

                Plataforma Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="bg-white py-16" data-aos="fade-up">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="dwn-title-cs mb-4 text-3xl text-center font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl">Preguntas Frecuentes</h2>
          <div className="font-grid-cs-hl1 max-w-screen-md mx-auto py-6">
            {/* Pregunta 1 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFAQ(1)}
                className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#EB6D1E] hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <span>¿Qué es RegCon?</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${activeFAQ === 1 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeFAQ === 1 && (
                <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 slide-fade-down">
                  <p className="text-gray-600">RegCon es una herramienta de registro, validación y gestión para eventos, pensada para agilizar el proceso de registro y validación de asistencia.</p>
                </div>
              )}
            </div>

            {/* Pregunta 2 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFAQ(2)}
                className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#EB6D1E] hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <span>¿Qué tipo de eventos puedo gestionar con RegCon?</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${activeFAQ === 2 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeFAQ === 2 && (
                <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 slide-fade-down">
                  <p className="text-gray-600">RegCon está diseñado para todo tipo de eventos: convenciones, conferencias, exposiciones, festivales, y cualquier evento que requiera la gestión de registros y validación de asistencias.</p>
                </div>
              )}
            </div>

            {/* Pregunta 3 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFAQ(3)}
                className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#EB6D1E] hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <span>¿Es seguro el sistema de validación?</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${activeFAQ === 3 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeFAQ === 3 && (
                <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 slide-fade-down">
                  <p className="text-gray-600">Sí, utilizamos tecnología avanzada de validación de boletos mediante códigos QR y cifrado para garantizar que solo los asistentes registrados tengan acceso.</p>
                </div>
              )}
            </div>

            {/* Pregunta 4 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFAQ(4)}
                className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#EB6D1E] hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <span>¿Puedo obtener informes detallados sobre mis eventos?</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${activeFAQ === 4 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeFAQ === 4 && (
                <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 slide-fade-down">
                  <p className="text-gray-600">¡Claro! Puedes acceder a informes detallados sobre tus asistentes, la validación de boletos y mucho más, para mejorar la gestión de futuros eventos.</p>
                </div>
              )}
            </div>
            {/* Pregunta base
            <div className="mb-4">
              <button
                onClick={() => toggleFAQ(4)}
                className="flex justify-between items-center w-full p-5 text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#EB6D1E] hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <span>¿Puedo obtener informes detallados sobre mis eventos?</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${activeFAQ === 4 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeFAQ === 4 && (
                <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 slide-fade-down">
                  <p className="text-gray-600">¡Claro! Puedes acceder a informes detallados sobre la asistencia, la validación de boletos y mucho más, para mejorar la gestión de futuros eventos.</p>
                </div>
              )}
            </div>*/}
          </div>
        </div>
      </section>

      {/* Sección de Donación */}
      <section className="bg-white py-16">
        <div className="px-4 mx-auto max-w-screen-md text-center">
          <h2 className="dwn-title-cs mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800  md:text-3xl lg:text-4xl">Apóyanos</h2>
          <p className="text-lg text-gray-600 mb-8">
            Tu apoyo nos ayuda a mantener esta herramientaa accesible para todos además que nos impulsa a seguir desarrollando y mejorando nuestros servicios y productos.
          </p>

          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Campo de Correo Electrónico */}
            <div className="relative w-full md:w-1/2">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Mail className="w-5 h-5 text-gray-500" />
              </span>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full p-4 pl-10 rounded-md text-gray-700 bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EB6D1E]"
              />
            </div>

            {/* Botón de Donación con PayPal */}
            <button
              className="w-full md:w-auto flex items-center justify-center px-5 py-3 bg-[#EB6D1E] text-white font-semibold rounded-md hover:bg-[#B14501] focus:ring-2 focus:ring-[#EB6D1E] transition-transform transform hover:scale-105"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Donar con PayPal
            </button>
          </form>
        </div>
      </section>










      {/* Flecha flotante para volver arriba */}
      <div
        className={`fixed bottom-10 right-10 z-50 cursor-pointer p-3 rounded-full bg-[#EB6D1E] text-white shadow-lg transition-opacity ${showScroll ? 'opacity-100' : 'opacity-0'}`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div >
  );
};

export default Main;
