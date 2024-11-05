import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { FiX, FiMail, FiLock } from "react-icons/fi";
import bcrypt from "bcryptjs"; // Asegúrate de instalar bcryptjs
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!acceptTerms) {
      setErrorMessage("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      // Verifica si es un administrador
      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .select("id, email, password, first_name")
        .eq("email", email)
        .single();

      if (adminData && !adminError) {
        // Compara la contraseña ingresada con la hasheada en la base de datos
        const isMatch = await bcrypt.compare(password, adminData.password);
        if (isMatch) {
          localStorage.setItem("userId", adminData.id);
          onClose();
          navigate("/Cargando", { state: { actionType: "login", userType: "admin" } });
          return;
        }
      }

      // Verifica si es un usuario normal
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, email, password, first_name")
        .eq("email", email)
        .single();

      if (userData && !userError) {
        // Compara la contraseña ingresada con la hasheada en la base de datos
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
          localStorage.setItem("userId", userData.id);
          onClose();
          navigate("/Cargando", { state: { actionType: "login", userType: "user" } });
          return;
        }
      }

      setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-500">
      <div className="relative p-4 w-full max-w-md max-h-full animate-slow-fade-in">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-700">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">¡Inicia sesión para continuar...</h3>
            <button
              onClick={onClose}
              className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 animate-smooth-slide-down">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-3 pl-10 text-gray-700 bg-gray-100 rounded-lg border border-gray-400 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-3 pl-10 text-gray-700 bg-gray-100 rounded-lg border border-gray-400 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los <a href="/terminos" className="text-blue-600 hover:underline">términos y condiciones</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-[#EB6D1E] rounded-lg font-semibold transition-colors duration-300 hover:bg-[#B14501] focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Iniciar Sesión
              </button>
              <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                ¿Olvidaste tu contraseña?{" "}
                <a href="/recuperar" className="text-blue-700 hover:underline dark:text-blue-500">
                  Recuperar contraseña
                </a>
              </div>
              <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                ¿No tienes cuenta?{" "}
                <a href="/Registro" className="text-blue-700 hover:underline dark:text-blue-500">
                  Crear una cuenta
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
