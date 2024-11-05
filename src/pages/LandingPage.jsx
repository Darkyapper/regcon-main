import React, { useState } from "react";
import 'flowbite/dist/flowbite.min.css';  // Importar los estilos de Flowbite
import 'flowbite';  // Importar la funcionalidad JS de Flowbite
import Main from "../components/Main/MainLandingPage";
import Footer from "../components/Footer/Footer";
import Login from "../components/Modals/Login"; // Asegúrate de importar tu componente de Login

const Landing = ({ setIsAuthenticated }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      {/* Botón o evento que abre el modal de inicio de sesión */}
      <Main onOpenLogin={openLoginModal} />
      {isLoginModalOpen && (
        <Login
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          setIsAuthenticated={setIsAuthenticated} // Pasa la función para actualizar el estado
        />
      )}
     
    </div>
  );
};

export default Landing;
