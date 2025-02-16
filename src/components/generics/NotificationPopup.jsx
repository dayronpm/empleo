// NotificationPopup.jsx
import React from "react";

const NotificationPopup = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  // Definir colores según el tipo de mensaje
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const colorClass = colors[type] || colors.info;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-[400px] max-w-full ${colorClass}`}>
        {/* Mensaje */}
        <p className="text-white text-lg mb-4">{message}</p>
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