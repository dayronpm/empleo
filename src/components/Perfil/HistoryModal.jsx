import React from "react";

const HistoryModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Historial de cambios</h2>
        <ul className="space-y-2">
          <li>15/10/2023: Se agregó una nueva experiencia laboral.</li>
          <li>10/10/2023: Se actualizó el correo electrónico.</li>
          <li>05/10/2023: Se eliminó un número de teléfono.</li>
        </ul>
         {/* Botón de eliminar cuenta */}
         
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;