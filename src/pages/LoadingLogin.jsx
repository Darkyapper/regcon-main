import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './LoadingLogin.css';

const Loading = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const actionType = location.state?.actionType || "login";
  const userType = location.state?.userType || "user";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (actionType === "login") {
        setIsAuthenticated(true);
        if (userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/Inicio");
        }
      } else if (actionType === "logout") {
        setIsAuthenticated(false);
        navigate("/");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [actionType, userType, navigate, setIsAuthenticated]);

  return (
    <div className="loading-screen">
      <div className="lds-circle">
        <div>
          <img src="/src/assets/images/LogoApp.png" alt="App Icon" className="loading-icon" />
        </div>
      </div>
      <h2 className="text-xl font-bold leading-tight mb-4 text-gray-600 mt-0">
        {actionType === "login"
          ? "Iniciando Sesión..."
          : "Cerrando Sesión..."}
      </h2>
    </div>
  );
};

export default Loading;
