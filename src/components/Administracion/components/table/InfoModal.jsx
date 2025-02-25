// src/components/InfoModal.jsx
import React from 'react';

const InfoModal = ({ isOpen, onClose, selectedRow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-4">Información de la Persona</h3>
        <div className="space-y-2">
          {Object.entries(selectedRow).map(([key, value]) => (
            <div key={key}>
              <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default InfoModal;