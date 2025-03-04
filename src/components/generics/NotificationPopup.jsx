// NotificationPopup.jsx
import React from "react";
import { useEffect } from "react";

const NotificationPopup = ({ isOpen, onClose, message, type }) => {
  // Depuración
  console.log("NotificationPopup:", { isOpen, message, type });
  
  // Definir colores según el tipo de mensaje
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  // Definir colores de texto según el tipo de mensaje
  const textColors = {
    success: "text-black",
    error: "text-white",
    info: "text-white",
  };

  const colorClass = colors[type] || colors.info;
  const textColorClass = textColors[type] || textColors.info;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000); // Cierra automáticamente después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-[400px] max-w-full ${colorClass}`}>
        {/* Mensaje */}
        <p className={`${textColorClass} text-lg mb-4`}>{message || "Operación completada"}</p>
        {/* Botón de aceptar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded transition-colors hover:bg-gray-800"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;