// src/components/InfoModal.jsx
import React from 'react';

const InfoModal = ({ isOpen, onClose, data, fields = [] }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
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

        <h3 className="text-xl font-bold mb-4">Información Detallada</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ label, key, type = 'text' }) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              {type === 'textarea' ? (
                <p className="mt-1 p-2 w-full bg-gray-50 rounded-md min-h-[60px] whitespace-pre-wrap">
                  {data[key] || 'No especificado'}
                </p>
              ) : (
                <p className="mt-1 p-2 w-full bg-gray-50 rounded-md">
                  {data[key] || 'No especificado'}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;