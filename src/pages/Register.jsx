import React, { useState } from "react";
import { supabase } from "../services/supabaseClient"; 
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar } from "react-icons/fi";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBarHome from "../components/Navbar/NavbarLandingPage";

const Register = ({ setIsAuthenticated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const validatePassword = () => {
    const messages = [];
    if (password.length < 10 || password.length > 20) {
      messages.push("La contraseña debe tener entre 10 y 20 caracteres.");
    }
    if (!/[a-z]/.test(password)) {
      messages.push("La contraseña debe incluir al menos un carácter en minúscula.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      messages.push("La contraseña debe incluir al menos un carácter especial, como ! @ # ?");
    }
    return messages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessages = validatePassword();

    if (validationMessages.length > 0) {
      setErrorMessage(validationMessages.join(" "));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden. Por favor, verifica que ambas sean iguales.");
      return;
    }

    if (!isTermsAccepted) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10); // Hashing de la contraseña

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password: hashedPassword, // Almacenar la contraseña hasheada
      birthday: birthDate,
    };

    try {
      const { data, error } = await supabase.from("users").insert([userData]);

      if (error) {
        console.error("Error al registrar el usuario:", error);
        setErrorMessage(error.message);
      } else {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        navigate("/Cargando", { state: { actionType: "register" } });
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full mx-auto">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl text-center">
            Regístrate
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Ingresa tus datos para crear una cuenta
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white">
                Nombre
              </label>
              <div className="relative mt-1">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nombre"
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 dark:text-white">
                Apellido
              </label>
              <div className="relative mt-1">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Apellido"
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                Correo Electrónico
              </label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  placeholder="correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white">
                Número de Teléfono
              </label>
              <div className="relative mt-1">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <div className="relative mt-1">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  maxLength="20"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-900 dark:text-white">
                Fecha de Nacimiento
              </label>
              <div className="relative mt-1">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-900 dark:text-white">
                Confirmar Contraseña
              </label>
              {errorMessage && (
                <div className="mb-2 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}
              <div className="relative mt-1">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="confirm_password"
                  maxLength="20"
                  placeholder=""
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-[#EB6D1E] focus:border-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-[#EB6D1E] bg-gray-100 border-gray-300 rounded focus:ring-[#EB6D1E] dark:bg-gray-700 dark:border-gray-600"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Acepto los <a href="/Términos Y Condiciones" className="text-blue-600 hover:underline dark:text-blue-500">términos y condiciones</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-[#EB6D1E] hover:bg-[#B14501] focus:ring-4 focus:ring-[#d16819] font-medium rounded-lg text-lg py-3 mt-6 transition-transform transform hover:scale-105"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
