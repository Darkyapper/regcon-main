import React, { useState } from "react";
import { FiMenu, FiLogOut, FiSearch, FiHome, FiFileText, FiFilter } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'swiper/css';


const categories = ["Música", "Cine", "Teatro", "Deportes", "Arte", "Tecnología", "Conferencias", "Exposiciones"];
const filters = ["Fecha", "Ubicación", "Popularidad"];

const NavbarHome = ({ showSecondaryNav = true, setIsAuthenticated }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const pagesWithSecondaryNav = ["/Inicio", "/Detalles de Evento", "/Mis Boletos"];
    const shouldShowSecondaryNav = pagesWithSecondaryNav.includes(location.pathname);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleFilterDropdown = () => {
        setFilterDropdownOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        navigate(option);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        navigate("/Cargando", { state: { actionType: "logout" } });
    };

   
    const [events, setEvents] = useState([]);
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
        <div data-aos="fade-down">  
            {/* Barra de Navegación Principal */}
            <nav className="w-full z-50 bg-gradient-to-b from-gray-300 shadow relative" >
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/Inicio" className="flex items-center space-x-3">
                        <img
                            src="/src/assets/images/LogoNegro.png"
                            className="h-6 sm:h-8"
                            alt="Logo RegCon"
                        />
                    </a>

                    <div className="flex-grow md:hidden">
                        <form className="relative">
                            <label htmlFor="mobile-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Buscar</label>
                            <div className="relative flex items-center">
                                <FiSearch className="absolute left-3 text-gray-500" />
                                <input
                                    type="search"
                                    id="mobile-search"
                                    className="w-[200px] sm:w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-400 focus:border-gray-400 ml-2"
                                    placeholder="Buscar un evento"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al cambiar el valor
                                />
                            </div>
                        </form>
                    </div>

                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-black rounded-lg md:hidden hover:bg-[#C65A1E] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-300"
                        aria-controls="navbar-cta"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Abrir menú</span>
                        <FiMenu className="w-5 h-5" />
                    </button>

                    <div
                        className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} md:max-h-full md:opacity-100 w-full md:flex md:items-center md:justify-between md:w-auto`}
                        id="navbar-cta"
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 md:flex-row md:mt-0 md:items-center">
                            <li className="hidden md:block max-w-md mx-auto w-full md:w-auto">
                                <form className="relative">
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Buscar</label>
                                    <div className="relative flex items-center">
                                        <FiSearch className="absolute left-3 text-gray-500" />
                                        <input
                                            type="search"
                                            id="default-search"
                                            className="w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-400 focus:border-gray-400"
                                            placeholder="Buscar un evento"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al cambiar el valor
                                        />
                                    </div>
                                </form>
                            </li>

                            <li onClick={() => handleOptionClick("/Inicio")}>
                                <a
                                    href="#"
                                    className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-md ${
                                        selectedOption === "/Inicio" ? "text-[#C65A1E]" : "text-gray-600 hover:text-[#C65A1E]"
                                    }`}
                                >
                                    <FiHome className={selectedOption === "/Inicio" ? "text-[#C65A1E]" : ""} />
                                    <span>Inicio</span>
                                </a>
                            </li>
                            <li onClick={() => handleOptionClick("/Mis Boletos")}>
                                <a
                                    href="#"
                                    className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-md ${
                                        selectedOption === "/Mis Boletos" ? "text-[#C65A1E]" : "text-gray-600 hover:text-[#C65A1E]"
                                    }`}
                                >
                                    <FiFileText className={selectedOption === "/Mis Boletos" ? "text-[#C65A1E]" : ""} />
                                    <span>Mis Boletos</span>
                                </a>
                            </li>

                            <li
                                onClick={handleLogout}
                                className="flex items-center space-x-2 py-2 px-4 text-gray-600 hover:bg-[#C65A1E] hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                            >
                                <FiLogOut />
                                <span>Cerrar Sesión</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Renderiza la sección de categorías y filtros solo en ciertas páginas 
            {showSecondaryNav && shouldShowSecondaryNav && (
                <div className="bg-gray-100 shadow-md py-2 px-4">
                    <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="bg-white hover:bg-gray-200 rounded-lg py-1 px-3 text-sm font-semibold"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <button
                                onClick={toggleFilterDropdown}
                                className="bg-white hover:bg-gray-200 rounded-lg py-1 px-3 text-sm font-semibold flex items-center"
                            >
                                Filtrar
                                <FiFilter className="ml-2" />
                            </button>
                            {filterDropdownOpen && (
                                <ul className="absolute right-0 w-48 bg-white shadow-lg rounded-lg mt-1 z-10">
                                    {filters.map((filter) => (
                                        <li
                                            key={filter}
                                            onClick={() => handleOptionClick(filter)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            {filter}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}*/}
            
            {/* Renderiza los eventos filtrados aquí */}
            <div>
                {filteredEvents.map(event => (
                    <div key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        {/* Otras propiedades del evento */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavbarHome;
