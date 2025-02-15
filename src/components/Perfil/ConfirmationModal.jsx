import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
        {/* Título del Modal */}
        <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">Confirmación</h2>
        {/* Mensaje */}
        <p className="text-sm text-gray-700 mb-6 text-center">{message}</p>
        {/* Botones */}
        <div className="flex justify-center space-x-4">
          {/* Botón Cancelar */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          {/* Botón Aceptar */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;